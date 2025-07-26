import './App.css';
import { Route, Routes } from 'react-router-dom';

import { About } from './components/About';
import { Home } from './components/Home';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
