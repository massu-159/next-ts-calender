import { EventInput } from '@fullcalendar/react';

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // 今日の日付をYYYY-MM-DD形式にする
export const createEventId = (): string => String(eventGuid++);
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: '1000',
    start: todayStr,
  },
];
