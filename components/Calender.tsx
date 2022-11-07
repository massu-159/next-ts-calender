import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId, INITIAL_EVENTS } from '../utils/event-utils';
import { useCallback, useState } from 'react';

const Calender = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  // 貯金データの初期表示
  const handleEvents = useCallback((events: EventApi[]) => {
    setCurrentEvents(events);
  }, []);

  // 貯金額の作成処理
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const insertMoney: string | undefined =
      prompt('貯金した金額を入力')?.trim();
    if (insertMoney !== undefined) {
      const savings = Number(insertMoney);
      if (!Number.isNaN(savings)) {
        const calenderApi = selectInfo.view.calendar;
        calenderApi.unselect();
        if (savings !== 0) {
          calenderApi.addEvent({
            id: createEventId(),
            title: String(savings),
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        }
      } else {
        window.alert('数字(半角)で金額を入力してください。');
      }
    }
  }, []);

  // 貯金額の削除処理
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm(`貯金額：¥${clickInfo.event.title}円を削除しますか？`)) {
      clickInfo.event.remove();
    }
  }, []);

  const renderEventContent = (eventContent: EventContentArg): JSX.Element => (
    <>
      <i>¥ {eventContent.event.title}円</i>
    </>
  );

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={jaLocale}
        initialEvents={INITIAL_EVENTS}
        businessHours={true}
        eventsSet={handleEvents}
        selectable={true}
        select={handleDateSelect}
        editable={true}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
      <button>表示</button>
    </>
  );
};

export default Calender;
