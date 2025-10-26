import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certificates from "./components/Certificates";
import Volunteer from "./components/Volunteer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certificates />
      <Volunteer />
    
      <Contact />
      <Footer />
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