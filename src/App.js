import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import MediaDetailsPage from './pages/MediaDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Overview/>} />
        <Route  path="/overview" element={<Overview/>} />
        <Route  path={`/details/:userId`} element={<MediaDetailsPage/>} />
        <Route  path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
