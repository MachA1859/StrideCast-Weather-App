import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Days';

function stepsKmCal() {

    return (
        <div className="stepsKmCal">
            <div className="stepsKmCal">
                <h1>Steps</h1>
                <img src="../../components/Days_images/shoe.png" alt="Ideal Running Time"/> //steps bar
                <h2>Km</h2>
                <img src="../../components/Days_images/shoe.png" alt="Ideal Running Time"/> //km bar
                <h2>Calorie goal</h2>
                <img src="../../components/Days_images/shoe.png" alt="Ideal Running Time"/> //cal bar
            </div>
        </div>
  
    );
}

export default stepsKmCal;