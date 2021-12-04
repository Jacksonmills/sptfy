import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import { getSession } from 'next-auth/react';
import Player from '../components/Player';

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>SPTFY</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex'>
        <Sidebar />
        <Content />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
