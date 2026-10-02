import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import HeartAnimation from '../components/HeartAnimation';
import PageTransition from '../components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="page hero-section">
        <HeartAnimation active />
        <div className="page-inner">
          <DuduBubu gif="bubu- page 1.gif" mood="cute" size="large" />
          <div className="page-copy">
            <h1>Hey you... ❤️</h1>
            <p className="lead">I made something for you.</p>
            <p>It's just a tiny little piece of my heart… so please open it. 🥺</p>
            <div className="button-row">
              <CuteButton to="/ready" label="Open it, baby →" />
              <CuteButton to="/memories" label="Create a memory 💕" variant="ghost" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
