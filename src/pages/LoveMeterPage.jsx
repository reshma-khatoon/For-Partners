import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import LoveMeter from '../components/LoveMeter';
import PageTransition from '../components/PageTransition';

export default function LoveMeterPage() {
  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="bubu-dudu-8.gif" mood="full" size="medium" />
          <div className="page-copy">
            <h2>The meter is full... just like my heart. ❤️</h2>
          </div>

          <LoveMeter />

          <div className="button-row">
            <CuteButton to="/my-letter" label="Next →" />
            <CuteButton to="/describe-you" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
