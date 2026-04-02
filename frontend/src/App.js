import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Toaster } from "./components/ui/toaster";

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Hackathons = lazy(() => import("./components/Hackathons"));
const Certificates = lazy(() => import("./components/Certificates"));
const Volunteer = lazy(() => import("./components/Volunteer"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <a href="#about" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <Hackathons />
      </Suspense>
      <Suspense fallback={null}>
        <Certificates />
      </Suspense>
      <Suspense fallback={null}>
        <Volunteer />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;