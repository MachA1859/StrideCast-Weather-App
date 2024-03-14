import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home_Page from './Pages/0Home_Page';
import Temp from './Pages/1Temp';
import Humidity from './Pages/3Humidity';
import AQI from './Pages/4AQI';
import Wind_Speed from './Pages/5Wind_Speed';
import UV from './Pages/6UV';
import Day from './Pages/7Day';
import No_Page from './Pages/No_Page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home_Page />} />
          <Route path='/temperature' element = {<Temp />} />
          <Route path='/humidity' element = {<Humidity />} />
          <Route path='/aqi' element = {<AQI />} />
          <Route path='/windspeed' element = {<Wind_Speed />} />
          <Route path='/uv' element = {<UV />} />
          <Route path='/day' element = {<Day />} />
          <Route path='*' element = {<No_Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
