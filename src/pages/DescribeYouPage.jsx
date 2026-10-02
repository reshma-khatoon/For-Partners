import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import PageTransition from '../components/PageTransition';

const descriptions = [
  { title: 'If you were a sunset...', text: 'I\'d stop everything just to admire you.' },
  { title: 'If you were a song...', text: 'You\'d be the one I\'d never skip.' },
  { title: 'If you were a book...', text: 'I\'d read every chapter over and over.' },
  { title: 'If you were a place...', text: 'You\'d feel like home.' },
  { title: 'If you were the night sky...', text: 'I\'d still find you among every star.' },
  { title: 'If you were a flower...', text: 'I\'d choose you every time.' },
];

export default function DescribeYouPage() {
  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="bubu-blush 7.gif" mood="blushing" size="medium" />
          <div className="page-copy">
            <h2>If I had to describe you...</h2>
          </div>

          <div className="compare-grid">
            {descriptions.map((item) => (
              <article key={item.title} className="compare-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="button-row">
            <CuteButton to="/love-meter" label="Next →" />
            <CuteButton to="/memories" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
