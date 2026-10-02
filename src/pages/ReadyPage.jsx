import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import PageTransition from '../components/PageTransition';

export default function ReadyPage() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);

  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="dudu-bubu shy 2.gif" mood="shy" size="medium" className={hovering ? 'reactive' : ''} />
          <div className="page-copy">
            <h2>Before you continue...</h2>
            <p>Promise me you'll read everything with your heart?</p>
            <div className="button-row">
              <CuteButton label="YES ❤️" onClick={() => navigate('/hug')} />
              <CuteButton label="YESSSS 🥹" variant="secondary" onClick={() => navigate('/hug')} />
            </div>
            <div className="quote-block" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              <p>I knew you'd say yes. 🥺</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
