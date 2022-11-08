import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Calender from '../components/Calender';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Saving Schedule</title>
        <meta
          name='description'
          content='ズボラな私もこれなら続けられる。カレンダーに貯金額を入力するだけ！'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Calender></Calender>
    </div>
  );
};

export default Home;
