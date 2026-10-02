import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import PageTransition from '../components/PageTransition';

export default function WhenYouNeedMePage() {
  const starPositions = [
    { left: '14%', top: '18%' },
    { left: '26%', top: '28%' },
    { left: '52%', top: '15%' },
    { left: '68%', top: '22%' },
    { left: '82%', top: '30%' },
    { left: '22%', top: '64%' },
    { left: '74%', top: '62%' },
  ];

  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <div className="night-panel">
            <div className="stars" aria-hidden="true">
              {starPositions.map((star, index) => (
                <span key={index} className="star" style={{ left: star.left, top: star.top }} />
              ))}
            </div>
            <div className="moon" aria-hidden="true" />
            <div className="page-copy" style={{ color: '#fff' }}>
              <h2 style={{ color: '#fff' }}>If you're reading this late at night...</h2>
            </div>
            <div className="page-copy" style={{ color: '#fbeef8' }}>
              <p>Take a deep breath.</p>
              <p>Put your worries down for a moment.</p>
              <p>You don't have to solve everything tonight.</p>
              <p>You're doing better than you think.</p>
              <p>And somewhere in this world, there's a girl who loves you very, very much. ❤️</p>
            </div>
          </div>

          <div style={{ marginTop: '26px' }}>
            <DuduBubu gif="dudu-bubu sleep 10.gif" mood="sleeping" size="medium" />
          </div>

          <div className="button-row">
            <CuteButton to="/final-surprise" label="Next →" />
            <CuteButton to="/my-letter" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
