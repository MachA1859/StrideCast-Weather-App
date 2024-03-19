import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/home';
import PrecipitationPage from './pages/precipitation/precipitation';
import HumidityPage from './pages/humidity/humidity';
import AQIPage from './pages/AQI/AQI';
import Header from './components/header/header';

import { extractWeather, fetchByCity } from './functions/weather'
import { useGlobalState } from './stores/weatherState';
import TemperaturePage from "./pages/Temp/Temperature";
import WindSpeedPage from "./pages/Wind/WindSpeed";
import UVPage from "./pages/UV/UV";
import DayPage from "./pages/Days/Days";

function No_Page() {
  return null;
}

function App() {
  const [state, dispatch] = useGlobalState()

  // init block to retrieve the data
  useEffect(() => {
    async function init() {
      const json = await fetchByCity("London")
      dispatch({isLoading: false, json})
    }
    init()
  }, [])

  // update the weather when state.json changes
  useEffect(() => {
    setBackground(extractWeather(state.json))
  }, [state.json])

  function setBackground(weather) {
    console.log(weather)

    // decide which background to use
    const app = document.getElementsByClassName('App')[0];
    let backgroundImg;

    if (weather.main === "Clear") {
      backgroundImg = "./backgrounds/clearsky.png"
    }
    else if (weather.main === "Rain") {
      backgroundImg = "./backgrounds/rainyDay.png"
    }
    else if (weather.main === "Snow") {
      backgroundImg = "./backgrounds/Snow.png"
    }
    else if (weather.main === "Clouds") {
      backgroundImg = "./backgrounds/cloudySky.png"
    }

    // set background
    app.style.backgroundImage = "url(\"" + backgroundImg + "\")"
  }

  return (
    <div className="App">
      <Header/>

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/temperature" element={<TemperaturePage/>}/>
          <Route path="/precipitation" element={<PrecipitationPage/>}/>
          <Route path="/humidity" element={<HumidityPage/>}/>
          <Route path="/AQI" element={<AQIPage/>}/>
          <Route path="/wind" element={<WindSpeedPage/>}/>
          <Route path="/uv" element={<UVPage/>}/>
          <Route path="/Day" element={<DayPage/>}/>
          <Route path='*' element={<No_Page/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
