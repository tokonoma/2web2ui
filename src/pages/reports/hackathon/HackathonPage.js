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
  { content: 'Opens', key: 'open' },
  { content: 'Deliverability-Inbox', key: 'inbox' },
  { content: 'Deliverability-Spam', key: 'spam' },
];

export const HackathonPage = ({ getHackathonData, data = [] }) => {
  const [mapPoints, setMapPoints] = useState([]);
  const [selectedTabIndex, tabs] = useTabs(TABS, 0);
  const [time, setTime] = useState(null);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [copyOfData, setCopyOfData] = useState([]);

  let sliderSlices = {};

  useEffect(() => {
    getHackathonData(TABS[selectedTabIndex].key);
  }, [getHackathonData, selectedTabIndex]);

  useEffect(() => {
    if (data.length > 0) {
      setCopyOfData(data);
      // HACKATHON 2019!!!!
      let timeoutId = setTimeout(() => ({}));
      while (timeoutId > 0) {
        clearTimeout(timeoutId);
        timeoutId--;
      }

      setTime(moment(data[0].eventTime));
      setStartTime(
        moment(data[0].eventTime)
          .startOf('days')
          .unix(),
      );
      setEndTime(
        moment(data[data.length - 1].eventTime)
          .startOf('days')
          .unix(),
      );
      setMapPoints([]);
    }
  }, [data]);

  useEffect(() => {
    const startMappingDataPoints = lastTime => {
      const addMapPoint = () => {
        const useThisLastTimeHere = lastTime.toDate();
        const end = moment(useThisLastTimeHere);
        end.add(1, 'hours');
        const start = moment(useThisLastTimeHere);
        start.subtract(6, 'hours');

        var i = 0;
        let newMapPoints = Object.assign([], mapPoints);
        while (i < newMapPoints.length) {
          if (moment(newMapPoints[i].eventTime).isBefore(start)) {
            newMapPoints.shift();
          } else {
            break;
          }
          i++;
        }

        while (i < copyOfData.length) {
          if (moment(copyOfData[i].eventTime).isBefore(end)) {
            newMapPoints.push(copyOfData.shift());
          } else {
            break;
          }
          i++;
        }

        setMapPoints(newMapPoints);
        setTime(end);
      };
      setTimeout(() => {
        requestAnimationFrame(addMapPoint);
      }, DISPLAY_TIME);
    };

    if (time && time.unix() < endTime) {
      startMappingDataPoints(time);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  if (data.length > 0 && endTime && startTime) {
    const numOfDays = moment.unix(endTime).diff(moment.unix(startTime), 'days');
    sliderSlices = [...Array(numOfDays)].reduce((sliderTicks, tick, i) => {
      const tickTime = moment
        .unix(startTime)
        .add(i, 'day')
        .startOf('days')
        .format('YYYY-MM-DD');
      sliderTicks[(100 / numOfDays) * i] = tickTime;
      return sliderTicks;
    }, {});
    sliderSlices[100] = moment.unix(endTime).format('YYYY-MM-DD');
  }

  const apiKey = { key: '' };

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
  const currentTimeOnSlider = time ? ((time.unix() - startTime) / (endTime - startTime)) * 100 : 0;
  const fromTime = moment(time ? time : 0).subtract(6, 'hours');
  const toTime = moment(time ? time : 0);

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
      <strong>
        Currently viewing: {fromTime.format('YYYY-MM-DD HH:mm')} -{' '}
        {toTime.format('YYYY-MM-DD HH:mm')}
      </strong>
      <Slider disabled min={0} max={100} ticks={sliderSlices} value={currentTimeOnSlider} />
    </Page>
  );
};

const mapStateToProps = state => ({
  data: state.hackathon.hacks,
});

export default connect(mapStateToProps, { getHackathonData })(HackathonPage);
