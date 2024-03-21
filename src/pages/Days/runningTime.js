import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Days';

function runningTime() {

    return (
        <div className="runningTime">
            <div className="runningTime">
                <img src="../../components/Days_images/shoe.png" alt="Ideal Running Time"/>
                <h1>IDEAL RUNNING TIME</h1>
                <h2>graphLine</h2>
                <h2>times</h2>
            </div>
        </div>
  
    );
}

export default runningTime;