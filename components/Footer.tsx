import { formatDate } from '@fullcalendar/react';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { SavingsApi } from '../interfaces/SavingsApi';

const Footer = ({
  savings,
}: {
  savings: SavingsApi[] | DocumentData;
}): JSX.Element => {
  return (
    <div>
      <h2>貯金回数：{savings.length}</h2>
      <h2>
        合計：¥
        {savings
          .map((saving: SavingsApi) => Number(saving.title))
          .reduce((sum: number, element: number) => sum + element, 0)}
        円
      </h2>
      <ul>
        {savings.map((saving: SavingsApi) => (
          <li key={saving.id}>
            <b>
              {formatDate(saving.start, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                locale: 'ja',
              })}
            </b>
            <i> ¥{saving.title}円</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
