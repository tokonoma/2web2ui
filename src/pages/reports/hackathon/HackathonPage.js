import React, { useEffect, useState } from 'react';
import { Page, Slider } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';
import { subHours, addHours, subDays, startOfDay, differenceInHours, format } from 'date-fns';

const DISPLAY_TIME = 500;
const END_DATE = startOfDay(new Date());
const START_DATE = subDays(END_DATE, 7);
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

export const HackathonPage = props => {
  let [mapPoints, setMapPoints] = useState([]);

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
        return d.time <= addHours(lastTime, 1) && d.time > subHours(lastTime, 6);
      });
      console.log(newMapPoints);
      setMapPoints(newMapPoints);
    };
    setTimeout(() => {
      requestAnimationFrame(addMapPoint);
    }, DISPLAY_TIME);
  };

  useEffect(() => {
    const lastTime = mapPoints.length ? mapPoints.slice(-1)[0].time : addHours(START_DATE, 6);
    console.log(lastTime);
    startMappingDataPoints(serverGeneratedData, lastTime);
  }, [mapPoints]);

  const apiKey = { key: '' };

  const startDate = START_DATE;
  const endDate = END_DATE;
  const heatMapData = {
    positions: mapPoints,
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
  const currentTime = heatMapData.positions.length && heatMapData.positions.slice(-1)[0].time;

  return (
    <Page
      empty={{
        show: false,
        title: 'Hackathon Stuff',
        image: Users,
      }}
      title="Whiz Bang Pow"
    >
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

export default HackathonPage;
