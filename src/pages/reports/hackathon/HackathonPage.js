import React, { useEffect, useState } from 'react';
import { Page, Slider, Tabs } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';
import { getHackathonData } from 'src/actions/hackathon';
import connect from 'react-redux/es/connect/connect';
import useTabs from '../../../hooks/useTabs/useTabs';
import moment from 'moment';

const DISPLAY_TIME = 500;

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
  const [time, setTime] = useState(null);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  let sliderSlices = [];

  useEffect(() => {
    getHackathonData();
  }, [getHackathonData, selectedTabIndex]);

  useEffect(() => {
    if (data.length > 0) {
      setTime(moment(data[0].eventTime));
      setStartTime((moment(data[0].eventTime)).unix());
      setEndTime((moment(data.slice(-1)[0].eventTime)).unix());
      setMapPoints([]);
    }
  }, [data]);

  const startMappingDataPoints = (lastTime) => {
    const addMapPoint = () => {
      const end = moment((lastTime).add(6, 'hours').toDate());
      const start = moment((lastTime).subtract(6, 'hours').toDate());
      const newMapPoints = data.filter(d => {
        return (moment(d.eventTime).isBetween(start, end));
      });
      setMapPoints(newMapPoints);
      const newTime =  moment((lastTime).add(6, 'hours').toDate());
      setTime(newTime);
    };
    setTimeout(() => {
      requestAnimationFrame(addMapPoint);
    }, DISPLAY_TIME);
  };

  useEffect(() => {
    if(time && time.unix() < endTime) {
      //console.log('time', time.unix(), endTime, time.unix() < endTime);
      //const lastTime = mapPoints.length ? mapPoints.slice(-1)[0].eventTime : addHours(startDate, 6);
      startMappingDataPoints(time);
    }
  }, [time, endTime]);

  if (data.length > 0 && endTime && startTime) {

    const numOfDays = moment.unix(endTime).diff(moment.unix(startTime), 'days');
    sliderSlices = [...Array(numOfDays)].reduce((sliderTicks, tick, i) => {
      const tickTime = moment.unix(startTime).add(i, 'day').format('YYYY-MM-DD');
      sliderTicks[100/numOfDays*i] = tickTime;
      return sliderTicks;
    }, {});
    sliderSlices[100] = moment.unix(endTime).format('YYYY-MM-DD');
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
        min={0}
        max={100}
        ticks={sliderSlices}
        value={time? ((time.unix()-startTime)/(endTime-startTime)*100): 0}
      />
    </Page>
  );
};

const mapStateToProps = state => ({
  data: state.hackathon.hacks,
});

export default connect(mapStateToProps, { getHackathonData })(HackathonPage);
