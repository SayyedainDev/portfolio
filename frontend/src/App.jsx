import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import { identity, navigation } from './data/portfolio';
import CaseStudy from './pages/CaseStudy';
import Home from './pages/Home';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout identity={identity} navigation={navigation}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}
