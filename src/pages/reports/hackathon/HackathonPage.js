import React, { useEffect, useState } from 'react';
import { Page, Slider, Tabs } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';
import { subHours, addHours, subDays, startOfDay, differenceInHours, format, isBefore, isAfter } from 'date-fns';
import { getHackathonData } from 'src/actions/hackathon';
import connect from 'react-redux/es/connect/connect';
import useTabs from '../../../hooks/useTabs/useTabs';

const DISPLAY_TIME = 500;
const END_DATE = startOfDay(new Date());
const START_DATE = subDays(END_DATE, 4);
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function generateTwentyDataPoints(lastTime) {
  const lat = getRandomArbitrary(26, 48);
  const lng = getRandomArbitrary(-124, -67);
  return [...Array(5)].map(() => {
    return { lat, lng, time: lastTime };
  });
}
function generateListOfDataFromMockServer() {
  let serverData = [];
  let currTime = START_DATE;

  while (currTime <= END_DATE) {
    const lastTime = currTime;
    serverData = [...serverData, ...generateTwentyDataPoints(lastTime)];
    currTime = addHours(currTime, 1);
  }

  return serverData;
}
const serverGeneratedData = generateListOfDataFromMockServer();

const TABS = [
  { content: 'Delivery', key: 'delivery' },
  { content: 'Opens', key: 'opens' },
  { content: 'Clicks', key: 'clicks' },
  { content: 'Deliverability-Inbox', key: 'd12-inbox' },
  { content: 'Deliverability-Spam', key: 'd12-spam' },
];

export const HackathonPage = ({ getHackathonData, data=[] }) => {
  const [mapPoints, setMapPoints] = useState([]);
  const [selectedTabIndex, tabs] = useTabs(TABS, 0);
  useEffect(() => {
    getHackathonData();
  }, [getHackathonData, selectedTabIndex]);

  useEffect(() => {
    if (data.length>0) {
      setMapPoints([]);
    }
  }, [data]);

  const sliderSlices = [...Array(7)].reduce((sliderTicks, tick, i) => {
    const chunks = differenceInHours(END_DATE, START_DATE) / 7;
    const curr = addHours(START_DATE, chunks * i);
    sliderTicks[Number(curr) - Number(START_DATE)] = format(curr, 'YYYY-MM-DD');
    return sliderTicks;
  }, {});
  sliderSlices[Number(END_DATE) - Number(START_DATE)] = format(END_DATE, 'YYYY-MM-DD');

  const startMappingDataPoints = (allTheData = [], lastTime) => {
    const addMapPoint = () => {
      const newMapPoints = allTheData.filter(d => {
         //console.log(addHours(lastTime, 24));
         console.log(isBefore(d.eventTime, addHours(lastTime, 1)) && isAfter(d.eventTime, subHours(lastTime, 6)));
        return  new Date(d.eventTime) >= subHours(lastTime, 6) && new Date(d.eventTime) < addHours(lastTime, 1);
      });
      console.log(newMapPoints);
      setMapPoints(newMapPoints);
    };
    setTimeout(() => {
      requestAnimationFrame(addMapPoint);
    }, DISPLAY_TIME);
  };

  useEffect(() => {
    if(data.length>0) {
      const lastTime = mapPoints.length ? mapPoints.slice(-1)[0].eventTime : addHours(data[0].eventTime, 6);
      console.log('lastTime', lastTime, data);
      startMappingDataPoints(data, lastTime);
    }
  }, [mapPoints, data]);

  const apiKey = { key: '' };

  const startDate = START_DATE;
  const endDate = END_DATE;
  const heatMapData = {
    positions: mapPoints.map(({longitude, latitude, eventTime}) => {return {lng: longitude, lat: latitude, eventTime}}),
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
        max={Number(endDate) - Number(START_DATE)}
        ticks={sliderSlices}
        value={Number(currentTime || startDate) - Number(START_DATE)}
      />
    </Page>
  );
};

const mapStateToProps = state => ({
  data: state.hackathon.hacks,
});

export default connect(mapStateToProps, { getHackathonData })(HackathonPage);
