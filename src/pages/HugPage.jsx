import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import HeartAnimation from '../components/HeartAnimation';
import PageTransition from '../components/PageTransition';

export default function HugPage() {
  const navigate = useNavigate();
  const [hugged, setHugged] = useState(false);

  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="dudu-bubu-hug 3.gif" mood="hugging" size="large" />
          <div className="page-copy">
            <h2>Come here...</h2>
            <p>If you were standing in front of me right now...</p>
            <p>I probably wouldn't say much.</p>
            <h2>I'd just hug you.</h2>
            {!hugged ? (
              <div className="button-row">
                <button type="button" className="cute-button" onClick={() => setHugged(true)}>
                  Give me a hug 🫂
                </button>
              </div>
            ) : (
              <>
                <HeartAnimation active />
                <div className="quote-block">
                  <p>Consider this the hug I'm sending you through this screen. ❤️</p>
                </div>
              </>
            )}
            <div className="button-row">
              <CuteButton to="/bad-days" label="Next →" variant="secondary" />
              <CuteButton to="/ready" label="Back" variant="ghost" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
