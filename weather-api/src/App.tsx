import { Routes, Route } from "react-router-dom";
import CurrentWeather from "./components/CurrentWeather";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-black text-white min-h-screen">
        <Routes>
          <Route path="/current" element={<CurrentWeather />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
