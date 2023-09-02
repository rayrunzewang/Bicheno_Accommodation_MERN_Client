import React from "react";
import Header from "./components/Header/Header";
import FloatingBox from "./components/FloatingBox/FloatingBox";
import Footer from "./components/Footer/Footer";

import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <FloatingBox />
      <Footer />
    </div>
  );
}

export default App;
