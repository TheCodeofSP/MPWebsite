import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Informations from "../pages/Informations.jsx";
import Process from "../pages/Process.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import Legal from "../pages/Legal.jsx";
import Privacy from "../pages/Privacy.jsx";
import NotFound from "../pages/NotFound.jsx";

import FloatingBubble from "../components/FloatingBubble.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/process" element={<Process />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/confidentialite" element={<Privacy />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingBubble to="/contact" label="Contact" />
    </BrowserRouter>
  );
}

export default AppRouter;
