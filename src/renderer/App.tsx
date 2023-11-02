import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Teams from './src/pages/Teams';
import TeamOverview from './src/pages/TeamOverview';
import UserOverview from './src/pages/UserOverview';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Teams />} />
      </Routes>
      <Routes>
        <Route path="/team/:teamId" element={<TeamOverview />} />
      </Routes>
      <Routes>
        <Route path="/user/:useId" element={<UserOverview />} />
      </Routes>
    </Router>
  );
}
