import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { ToastProvider } from "./contexts/ToastContext";
import NavBar from "./components/NavBar";
import Waves from "./components/reactbits/Waves";

function App() {
  return (
    <MovieProvider>
      <ToastProvider>
        <div className="app-container">
          <Waves 
            lineColor="rgba(100, 108, 255, 0.15)" 
            backgroundColor="#0a0a0a"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
          />
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </MovieProvider>
  );
}

export default App;
