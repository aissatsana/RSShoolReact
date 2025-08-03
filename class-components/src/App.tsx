import './App.css';
import { Route, Routes } from 'react-router-dom';

import { About } from './components/About';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
