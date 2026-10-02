import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import MemoryCard from '../components/MemoryCard';
import PageTransition from '../components/PageTransition';
import SharedMemoryDiary from '../components/SharedMemoryDiary';

const photos = [
  { image: '/images/memories/m6.jpeg', caption: 'one of my favourite moments' },
  { image: '/images/memories/me5.jpeg', caption: 'you + me ❤️' },
  { image: '/images/memories/memo3.jpeg', caption: 'this memory...' },
  { image: '/images/memories/memor2.jpeg', caption: 'my happy place' },
  { image: '/images/memories/memory.jpeg', caption: 'I would choose this moment again.' },
  { image: '/images/memories/meomrr8.jpeg', caption: 'little things, big love' },
  { image: '/images/memories/memoryy7.jpeg', caption: 'our softest chapter' },
  { image: '/images/mem4.jpeg', caption: 'home is you' },
];

export default function MemoriesPage() {
  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="bubu-miss-6.gif" mood="missing" size="medium" />
          <div className="page-copy">
            <h2>A little collection of us ❤️</h2>
          </div>

          <div className="memory-grid">
            {photos.map((photo) => (
              <MemoryCard key={photo.caption} image={photo.image} caption={photo.caption} />
            ))}
          </div>

          <SharedMemoryDiary />

          <div className="button-row">
            <CuteButton to="/describe-you" label="Next →" />
            <CuteButton to="/things-to-know" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
