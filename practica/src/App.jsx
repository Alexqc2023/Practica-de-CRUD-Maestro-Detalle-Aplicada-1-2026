import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import People from './pages/People';
import PersonDetails from './pages/PersonDetails';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personas" element={<People />} />
        <Route path="/personas/:id" element={<PersonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;