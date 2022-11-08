import { EventApi, formatDate } from '@fullcalendar/react';
import React from 'react';

const Footer = ({
  currentEvents,
}: {
  currentEvents: EventApi[];
}): JSX.Element => {
  return (
    <div>
      <h2>貯金回数：{currentEvents.length}</h2>
      <h2>
        合計：¥
        {currentEvents
          .map((event: EventApi) => Number(event.title))
          .reduce((sum: number, element: number) => sum + element, 0)}
        円
      </h2>
      <ul>
        {currentEvents.map((event: EventApi) => (
          <li key={event.id}>
            <b>
              {formatDate(event.start!, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                locale: 'ja',
              })}
            </b>
            <i> ¥{event.title}円</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
