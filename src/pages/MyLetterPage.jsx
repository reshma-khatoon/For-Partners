import { useEffect, useMemo, useState } from 'react';
import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import PageTransition from '../components/PageTransition';

export default function MyLetterPage() {
  const letter = useMemo(
    () => `My love,\n\nI don't know if these words can explain everything I feel. Sometimes love is not just in the big moments — it is in the quiet ones, the small gestures, the way I think of you when I miss you, and the way my heart feels a little softer when I know you are mine.\n\nI want you to know that you are loved in ways that are gentle, deep, and true. You are more than the hard days or the quiet moments. You are the warmth I want to come back to, the person I choose again and again, and the one I want to keep learning about for a very long time.\n\nIf life ever feels heavy, come back here. I will always be somewhere in these words, reminding you that you're loved.\n\nWith all my heart,\nYour girl ❤️`,
    [],
  );
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(letter.slice(0, index + 1));
      index += 1;
      if (index >= letter.length) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [letter]);

  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="bubu-dudu-love 9.gif" mood="letter" size="medium" />
          <div className="page-copy">
            <h2>From my heart to yours...</h2>
          </div>

          <div className={`typewriter ${text.length >= letter.length ? '' : 'cursor'}`}>{text}</div>

          <div className="quote-block">
            <p>If life ever feels heavy, come back here.</p>
          </div>

          <div className="page-copy" style={{ marginTop: '26px' }}>
            <h2>I'll always be somewhere in these words, reminding you that you're loved. ❤️</h2>
          </div>

          <div className="button-row">
            <CuteButton to="/when-you-need-me" label="Next →" />
            <CuteButton to="/love-meter" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
