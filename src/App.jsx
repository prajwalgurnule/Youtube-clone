import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Gaming from './pages/Gaming';
import SavedVideos from './pages/SavedVideos';
import LikedVideos from './pages/LikedVideos';
import VideoDetail from './pages/VideoDetail';
import Settings from './pages/Settings';
import ReportHistory from './pages/ReportHistory';
import Feedback from './pages/Feedback';
import Help from './pages/Help';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen dark:bg-[#0f0f0f] dark:text-white">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-1">
            <Sidebar sidebarOpen={sidebarOpen} />
            <main className="flex-1 p-4 overflow-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/saved" element={<SavedVideos />} />
                <Route path="/liked" element={<LikedVideos />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/report" element={<ReportHistory />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;