import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./routeMap.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import "leaflet/dist/leaflet.css";

function routeMap() {
    //leaflet map markers
    //London geocode: [51.507351, -0.127758]
/*    const markers = [
        {
            geocode: [51.507351, -0.127758],
            popUp: "start location"
        },
        {
            geocode: [51.5131, -0.1387],
            popUp: "destination"
        }
    ];

    const customIcon = new Icon({
        iconUrl: location,
        iconSize: [38, 38] 
    })

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class= "cluster-icon">${cluster.getChildCount()}</div>`,
            className: 'custom-marker-cluster',
            iconSize: point(33,33, true)
        });
    };
*/

    const position = [51.507351, -0.127758];
    return (
        <div className="routeMap">
            <MapContainer center={[51.507351, -0.127758]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LeafletRoutingMachine/>
                </MapContainer>
        </div>
    );

};

export default routeMap;