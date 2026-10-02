import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ReadyPage from './pages/ReadyPage';
import HugPage from './pages/HugPage';
import BadDaysPage from './pages/BadDaysPage';
import ThingsToKnowPage from './pages/ThingsToKnowPage';
import MemoriesPage from './pages/MemoriesPage';
import DescribeYouPage from './pages/DescribeYouPage';
import LoveMeterPage from './pages/LoveMeterPage';
import MyLetterPage from './pages/MyLetterPage';
import WhenYouNeedMePage from './pages/WhenYouNeedMePage';
import FinalSurprisePage from './pages/FinalSurprisePage';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ready" element={<ReadyPage />} />
        <Route path="/hug" element={<HugPage />} />
        <Route path="/bad-days" element={<BadDaysPage />} />
        <Route path="/things-to-know" element={<ThingsToKnowPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/describe-you" element={<DescribeYouPage />} />
        <Route path="/love-meter" element={<LoveMeterPage />} />
        <Route path="/my-letter" element={<MyLetterPage />} />
        <Route path="/when-you-need-me" element={<WhenYouNeedMePage />} />
        <Route path="/final-surprise" element={<FinalSurprisePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
