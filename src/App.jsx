import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from './pages/about';
import Careers from './pages/careers';
import Ideas from './pages/ideas';
import Services from './pages/services';
import Work from './pages/work';

function App() {
  return (
    <Router>
      <div className="transition duration-300 ease-in-out">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About id="about"/>} />
          <Route path="/careers" element={<Careers id="careers"/>} />
          <Route path="/ideas" element={<Ideas id="ideas"/>} />
          <Route path="/services" element={<Services id="services"/>} />
          <Route path="/work" element={<Work id="work"/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
