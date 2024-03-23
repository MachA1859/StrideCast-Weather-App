import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = (weatherData) => {
    const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: [L.latLng(51.505, -0.09), L.latLng(53.4809, -2.2374)],
        }).addTo(map);
    },[]);
    return null;
};

export default  LeafletRoutingMachine;