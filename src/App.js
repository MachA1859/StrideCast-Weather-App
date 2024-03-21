import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import HomePage from './pages/home/home';
import PrecipitationPage from './pages/precipitation/precipitation';
import HumidityPage from './pages/humidity/humidity';
import AQIPage from './pages/AQI/AQI';
import TemperaturePage from "./pages/Temp/Temperature";
import WindSpeedPage from "./pages/Wind/WindSpeed";
import UVPage from "./pages/UV/UV";
import DayPage from "./pages/Days/Days";

import { extractWeather, fetchByCity } from './functions/weather';
import { useGlobalState } from './stores/weatherState';

function NoPage() {
  return null;
}

function App() {
  const [state, dispatch] = useGlobalState();
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    async function init() {
      const json = await fetchByCity("London");
      dispatch({ isLoading: false, json });
    }
    init();
  }, []);

  useEffect(() => {
    setBackground(extractWeather(state.json));
  }, [state.json]);

  function setBackground(weather) {
    if (weather && weather.length > 0) {
      const currentWeather = weather[0];
      if (currentWeather && currentWeather.weatherConditions && currentWeather.weatherConditions.main) {
        let backgroundImg;
        switch (currentWeather.weatherConditions.main) {
          case "Clear":
            backgroundImg = "./backgrounds/clearsky.png";
            break;
          case "Rain":
            backgroundImg = "./backgrounds/rainyDay.png";
            break;
          case "Snow":
            backgroundImg = "./backgrounds/Snow.png";
            break;
          case "Clouds":
            backgroundImg = "./backgrounds/cloudySky.png";
            break;
          default:
            backgroundImg = null;
        }
        setBackgroundImg(backgroundImg);
      }
    }
  }

  return (
      <div className="App" style={{backgroundImage: `url(${backgroundImg})`}}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/temperature" element={<TemperaturePage />} />
            <Route path="/precipitation" element={<PrecipitationPage />} />
            <Route path="/humidity" element={<HumidityPage />} />
            <Route path="/AQI" element={<AQIPage />} />
            <Route path="/wind" element={<WindSpeedPage />} />
            <Route path="/uv" element={<UVPage />} />
            <Route path="/Day" element={<DayPage />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;



