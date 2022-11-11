import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import { useCallback, useState, useEffect } from 'react';
import Footer from './Footer';
import db from '../utils/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { SavingsApi } from '../interfaces/SavingsApi';

const Calender = (): JSX.Element => {
  const [savings, setSavings] = useState<SavingsApi[] | DocumentData>([]);

  useEffect(() => {
    // DBからデータを取得
    const savingsData = collection(db, 'amountOfSavings');
    void getDocs(savingsData).then((snapShot) => {
      setSavings(snapShot.docs.map((doc) => ({ ...doc.data() })));

      // リアルタイムでデータを取得
      void onSnapshot(savingsData, (saving) => {
        setSavings(saving.docs.map((doc) => ({ ...doc.data() })));
      });
    });
  }, []);

  // 貯金額の登録処理
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const insertMoney: string | undefined =
      prompt('貯金した金額を入力')?.trim();
    // OKボタン押下した際、未入力なら登録しない
    if (insertMoney === undefined) return;

    const savingsPlice = Number(insertMoney);
    if (Number.isNaN(savingsPlice)) {
      // NaNでないことをチェック
      window.alert('数字(半角)で金額を入力してください。');
    } else {
      const calenderApi = selectInfo.view.calendar;
      calenderApi.unselect();
      // 0を入力の場合、登録しない
      if (savingsPlice === 0) return;

      const savingsDoc = {
        id: uuidv4(),
        title: String(savingsPlice),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      // DBに追加
      try {
        void addDoc(collection(db, 'amountOfSavings'), savingsDoc);
        console.log('success add Doc');
        console.log(savingsDoc);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // 貯金額の削除処理
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    console.log(clickInfo.event.id);
    if (window.confirm(`貯金額：¥${clickInfo.event.title}円を削除しますか？`)) {
      try {
        // DBにあるデータを削除
        void deleteDoc(doc(db, 'amountOfSavings', clickInfo.event.id));
        // カレンダーからも削除
        clickInfo.event.remove();
        console.log('removed');
      } catch (err) {
        console.log(err);
      }
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
        businessHours={true}
        events={savings}
        selectable={true}
        select={handleDateSelect}
        editable={true}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
      <Footer savings={savings}></Footer>
    </>
  );
};

export default Calender;
