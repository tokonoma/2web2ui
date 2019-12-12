import React, { useEffect, useState } from 'react';
import { Page, Slider, Tabs } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';
import { subHours, addHours, subDays, startOfDay, differenceInHours, format } from 'date-fns';
import { getHackathonData } from 'src/actions/hackathon';
import connect from 'react-redux/es/connect/connect';
import useTabs from '../../../hooks/useTabs/useTabs';

const DISPLAY_TIME = 500;
const END_DATE = startOfDay(new Date());
const START_DATE = subDays(END_DATE, 4);

const TABS = [
  { content: 'Delivery', key: 'delivery' },
  { content: 'Opens', key: 'opens' },
  { content: 'Clicks', key: 'clicks' },
  { content: 'Deliverability-Inbox', key: 'd12-inbox' },
  { content: 'Deliverability-Spam', key: 'd12-spam' },
];

export const HackathonPage = ({ getHackathonData, data = [] }) => {
  const [mapPoints, setMapPoints] = useState([]);
  const [selectedTabIndex, tabs] = useTabs(TABS, 0);
  let startDate = START_DATE;
  let endDate = END_DATE;
  let sliderSlices = [];

  useEffect(() => {
    getHackathonData();
  }, [getHackathonData, selectedTabIndex]);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data);

      setMapPoints([]);
    }
  }, [data]);

  const startMappingDataPoints = (allTheData = [], lastTime) => {
    const addMapPoint = () => {
      const newMapPoints = allTheData.filter(d => {
        return (
          new Date(d.eventTime) >= subHours(lastTime, 6) &&
          new Date(d.eventTime) < addHours(lastTime, 1)
        );
      });
      setMapPoints(newMapPoints);
    };
    setTimeout(() => {
      requestAnimationFrame(addMapPoint);
    }, DISPLAY_TIME);
  };

  useEffect(() => {
    if (data.length > 0) {
      const lastTime = mapPoints.length ? mapPoints.slice(-1)[0].eventTime : addHours(startDate, 6);
      startMappingDataPoints(data, lastTime);
    }
  }, [mapPoints, data, startDate]);

  if (data.length > 0) {
    startDate = new Date(data[0].eventTime);
    endDate = new Date(data.slice(-1)[0].eventTime);

    sliderSlices = [...Array(7)].reduce((sliderTicks, tick, i) => {
      const chunks = differenceInHours(endDate, startDate) / 7;
      const curr = addHours(startDate, chunks * i);
      sliderTicks[Number(curr) - Number(startDate)] = format(curr, 'YYYY-MM-DD');
      return sliderTicks;
    }, {});
    sliderSlices[Number(endDate) - Number(startDate)] = format(endDate, 'YYYY-MM-DD');
  }

  const apiKey = { key: '' };

  const heatMapData = {
    positions: mapPoints.map(({ longitude, latitude, eventTime }) => {
      return { lng: longitude, lat: latitude, eventTime };
    }),
    options: {
      radius: 10,
      opacity: 0.6,
    },
  };
  const center = {
    lat: 39.82821,
    lng: -98.579527,
  };
  const zoom = 1;
  const currentTime = heatMapData.positions.length && heatMapData.positions.slice(-1)[0].eventTime;

  return (
    <Page
      empty={{
        show: false,
        title: 'Hackathon Stuff',
        image: Users,
      }}
      title="Whiz Bang Pow"
    >
      <Tabs selected={selectedTabIndex} connectBelow={true} tabs={tabs} />
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={apiKey}
          heatmapLibrary={true}
          heatmap={heatMapData}
          center={center}
          zoom={zoom}
          onChildClick={props => console.log(props)}
          onChildMouseEnter={props => console.log(props)}
          onChildMouseLeave={() => {}}
        ></GoogleMapReact>
      </div>
      <Slider
        disabled
        min={0}
        max={Number(endDate) - Number(startDate)}
        ticks={sliderSlices}
        value={Number(new Date(currentTime || startDate)) - Number(startDate)}
      />
    </Page>
  );
};

const mapStateToProps = state => ({
  data: state.hackathon.hacks,
});

export default connect(mapStateToProps, { getHackathonData })(HackathonPage);
