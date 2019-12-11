import React, { useEffect, useState } from 'react';
import { Page } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';

export const HackathonPage = props => {
  let [mapPoints, setMapPoints] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const lat = 50 + Math.random() * 10;
      const lng = 30 + Math.random() * 10;
      const newMapPoints = [...mapPoints, { lat, lng }];
      if (mapPoints.length < 10) {
        setMapPoints(newMapPoints);
      }
    }, 100);
  }, [mapPoints]);

  const apiKey = { key: '' };

  const heatMapData = {
    positions: mapPoints,
    options: {
      radius: 10,
      opacity: 0.6,
    },
  };
  const center = {
    lat: 59.95,
    lng: 30.33,
  };
  const zoom = 1;
  console.log(mapPoints);
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
          onChildMouseEnter={props => console.log(props)}
          onChildMouseLeave={() => {}}
        ></GoogleMapReact>
      </div>
    </Page>
  );
};

export default HackathonPage;
