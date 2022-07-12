import { Marker, Popup } from 'react-leaflet';
import './MarkerPoint.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function MarkerPoint(props) {


  const latlng = [props.lat, props.lng]


  return (
    <Marker position={latlng} id="marker">
        <Popup maxWidth="100%">
          <h1>{props.date}</h1>
          <Zoom>
            <img src={"http://localhost:3001/api/v1/image/" + props.filename} alt="sick pic" className="marker-picture" />
          </Zoom>
          <p>{props.notes}</p>
        </Popup>
    </Marker>
  );
}

export default MarkerPoint;
