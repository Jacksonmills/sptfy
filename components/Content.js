import { ChevronDoubleDownIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import SongList from './SongList';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Content() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something went wrang!', err));
  }, [spotifyApi, playlistId]);
  console.log(playlist);

  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
      <header className='absolute top-6 right-4'>
        <div
          className='flex items-center rounded-full space-x-3 bg-black opacity-90 hover:opacity-80 cursor-pointer p-1 pr-4'
          onClick={() => signOut()}
        >
          <img
            className='w-10 h-10 rounded-full'
            src={session?.user.image}
            alt=''
          />
          <h2>{session?.user.name}</h2>
          <ChevronDoubleDownIcon className='w-5 h-5' />
        </div>
      </header>
      <div
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className='h-44 w-44 shadow-2xl'
          src={playlist?.images?.[0]?.url}
          alt=''
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
        </div>
      </div>
      <div>
        <SongList />
      </div>
    </div>
  );
}

export default Content;
