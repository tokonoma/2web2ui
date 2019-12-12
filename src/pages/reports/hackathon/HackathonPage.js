import React, { useEffect, useState } from 'react';
import { Page, Slider, Tabs } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import GoogleMapReact from 'google-map-react';
import { getHackathonData, getHackathonDataPartDeux } from 'src/actions/hackathon';
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
const CAMPAIGN_IDS = [
  'p1368: c899446: t1263502: DoorDash Giftcards 12 / 09 1st email | Batc',
  'p1368: c915151: t1285463: DD x Stride OEP 2019 All Dx',
  'p1368: c48773: t1225645: Order Confirmation | Trigger | Cx | HQ Oth',
  'p1368: c48773: t1232045: Order Confirmation | Trigger | Cx | HQ Oth',
  'p1368: c872264: t1225459:20191128_ToS_CCPA_Workflow',
  'p1368: c899427: t1263470: DashPass Upsell Reminder - Promo | Trigge',
  'p1368: c899428: t1263471: DashPass Upsell Reminder - No Promo | Tri',
  'p1368: c861014: t1209396: Order Confirmation | Trigger | Cx | HQ Ot',
  'p1368: c911330: t1280202:20191204_Android_Force_Upgrade',
];

export const HackathonPage = ({
  getHackathonData,
  getHackathonDataPartDeux,
  data = [],
  dataDeux = { inbox: 0, spam: 0 },
}) => {
  const [mapPoints, setMapPoints] = useState([]);
  const [selectedTabIndex, tabs] = useTabs(TABS, 0);
  const [time, setTime] = useState(null);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [copyOfData, setCopyOfData] = useState([]);

  let sliderSlices = {};

  useEffect(() => {
    getHackathonDataPartDeux();
    getHackathonData(TABS[selectedTabIndex].key);
  }, [getHackathonData, getHackathonDataPartDeux, selectedTabIndex]);

  useEffect(() => {
    if (data.length > 0) {
      setCopyOfData(Object.assign([], data));
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
    } else if (time && endTime) {
      setCopyOfData(Object.assign([], data));
      setTime(moment(data[0].eventTime));
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
  const vol = dataDeux.inbox + dataDeux.spam;

  return (
    <Page
      empty={{
        show: false,
        title: 'Hackathon Stuff',
        image: Users,
      }}
      title="Whiz Bang Pow"
    >
      <div>
        <strong>
          {'Total Messages: '}
          {data.length}
        </strong>
      </div>
      <strong>
        {'Campaign Inbox: '}
        {vol ? ((dataDeux.inbox / vol) * 100).toFixed(2) + '%' : 'N/A'}
        {', Sample Volume: '}
        {vol}
      </strong>

      <Tabs selected={selectedTabIndex} connectBelow={true} tabs={tabs} />
      <div style={{ height: '75vh', width: '100%' }}>
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
        {'Currently viewing: '}
        {fromTime.format('YYYY-MM-DD HH:mm')} - {toTime.format('YYYY-MM-DD HH:mm')}
      </strong>
      <Slider disabled min={0} max={100} ticks={sliderSlices} value={currentTimeOnSlider} />
    </Page>
  );
};

const mapStateToProps = state => ({
  data: state.hackathon.hacks,
  dataDeux: state.hackathon.hacksDeux,
});

export default connect(mapStateToProps, { getHackathonData, getHackathonDataPartDeux })(
  HackathonPage,
);