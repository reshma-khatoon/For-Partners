import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import PageTransition from '../components/PageTransition';

const notes = [
  'You don\'t always have to be strong.',
  'You don\'t have to hide your feelings from me.',
  'You are allowed to rest.',
  'You are allowed to have bad days.',
  'You deserve happiness.',
  'You deserve to be loved gently.',
];

export default function ThingsToKnowPage() {
  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="dudu-bubu-5.gif" mood="sitting" size="medium" />
          <div className="page-copy">
            <h2>Things I want you to know</h2>
          </div>

          <div className="quote-block">
            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <div className="page-copy" style={{ marginTop: '26px' }}>
            <h2>And you'll always have a safe place with me. 🫂❤️</h2>
          </div>

          <div className="button-row">
            <CuteButton to="/memories" label="Next →" />
            <CuteButton to="/bad-days" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
