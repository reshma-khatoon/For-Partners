import { useState } from 'react';
import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import HeartAnimation from '../components/HeartAnimation';
import PageTransition from '../components/PageTransition';

export default function FinalSurprisePage() {
  const [opened, setOpened] = useState(false);

  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          {!opened ? (
            <>
              <div className="page-copy">
                <h2>One last thing...</h2>
              </div>
              <DuduBubu gif="dudu-bubu gift 11.gif" mood="gift" size="medium" />
              <div className="button-row">
                <button type="button" className="cute-button" onClick={() => setOpened(true)}>
                  Open my heart ❤️
                </button>
              </div>
            </>
          ) : (
            <>
              <HeartAnimation active />
              <DuduBubu gif="bubu-dudu-sseeyall 12.gif" mood="making up" size="large" />
              <div className="page-copy">
                <p>No matter how bad your day gets...</p>
                <p>No matter how upset you are...</p>
                <p>No matter how many little fights we have...</p>
                <h2>Please never forget how much you mean to me.</h2>
                <p>I'm sorry for the moments when I hurt you.</p>
                <p>I'm still learning.</p>
                <p>But one thing I never want you to doubt...</p>
                <h2>I LOVE YOU. ❤️</h2>
                <p>So please don't stay angry with your girl for too long. 🥺</p>
                <h2>Come back to me. 🫂❤️</h2>
                <p style={{ fontWeight: 800 }}>Always yours.</p>
              </div>
            </>
          )}

          <div className="button-row">
            <CuteButton to="/" label="← Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
