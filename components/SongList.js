import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

function SongList() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      {playlist?.tracks.items.map((track, idx) => (
        <Song key={track.track.id} order={idx} track={track} />
      ))}
    </div>
  );
}

export default SongList;
