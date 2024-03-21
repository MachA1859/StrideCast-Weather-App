import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Days';

function hourlyForecast() {

    return (
        <div className="hourlyForecast">
            <div className="hourlyForecast">
                <img src="Days_images/shoe.png" alt="Ideal Running Time"/>
                <h1>timeColumn</h1>
                <h2>weatherIconColumn</h2>
                <h2>timesColumn</h2>
            </div>
        </div>
  
    );
}

export default hourlyForecast;