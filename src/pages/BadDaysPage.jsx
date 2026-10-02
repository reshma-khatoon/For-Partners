import CuteButton from '../components/CuteButton';
import DuduBubu from '../components/DuduBubu';
import LoveCard from '../components/LoveCard';
import PageTransition from '../components/PageTransition';

const cards = [
  {
    emoji: '🥺',
    title: 'When you\'re sad',
    text: 'You don\'t have to pretend you\'re okay all the time. It\'s okay to have bad days. Please be gentle with yourself.',
  },
  {
    emoji: '🫂',
    title: 'When you feel alone',
    text: 'Even when I\'m not physically beside you, I hope you remember that you\'re never alone in my heart.',
  },
  {
    emoji: '🤍',
    title: 'When you doubt yourself',
    text: 'Please don\'t forget how capable and special you are. I believe in you, even on the days when you don\'t believe in yourself.',
  },
  {
    emoji: '🥹',
    title: 'When you miss me',
    text: 'Close your eyes and imagine me giving you the biggest hug.',
  },
  {
    emoji: '❤️',
    title: 'When you need love',
    text: 'Come back here whenever you need a reminder: you are loved. So, so much.',
  },
];

export default function BadDaysPage() {
  return (
    <PageTransition>
      <div className="page">
        <div className="page-inner">
          <DuduBubu gif="bear-love 4.gif" mood="comforting" size="medium" />
          <div className="page-copy">
            <h2>For the days when everything feels too much...</h2>
          </div>

          <div className="bad-days-grid">
            {cards.map((card) => (
              <LoveCard key={card.title} emoji={card.emoji} title={card.title} text={card.text} />
            ))}
          </div>

          <div className="button-row">
            <CuteButton to="/things-to-know" label="Next →" />
            <CuteButton to="/hug" label="Back" variant="ghost" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
