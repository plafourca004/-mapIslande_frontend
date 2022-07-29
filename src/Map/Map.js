import './Map.css';
import { MapContainer, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react';
import MarkerPoint from './MarkerPoint/MarkerPoint.js'
import TimeRangeSlider from './TimeRangeSlider/TimeRangeSlider';
import TagList from './TagList/TagList.js';

function Map() {

  const START = "2022-01-01"
  const END = "2022-06-01"

  const [markers, setMarkers] = useState([])
  const [tags, setTags] = useState([])
  const [range, setRange] = useState([new Date(START).getTime(),new Date(END).getTime()])
  const [categoriesActivees, setCategoriesActivees] = useState([])

  const maxBounds = [
    [69.89, -32.58],
    [59.89, -4.58]
  ]

  useEffect(() => {
    fetch("http://localhost:3001/api/v2/points")
    .then(res => res.json())
    .then((res) => setMarkers(res))

    fetch("http://localhost:3001/api/v2/tags")
    .then(res => res.json())
    .then((res) => {
      setTags(res)
      setCategoriesActivees(res)
    })
  }, [])

  const dateRangeChanged = (rangeReceived) => {
    setRange(rangeReceived)
  }

  const checkedChanged = (checked) => {
    setCategoriesActivees(checked)
    console.log(checked)
  }

  const markersComponents = markers.map((marker, key) => {
    if(new Date(marker.date).getTime() > range[0] && new Date(marker.date).getTime() < range[1]) {
      if(categoriesActivees.includes(marker.tag) || tags.length === 0) {
        return <MarkerPoint key={marker.id} lat={marker.lat} lng={marker.lng} date={marker.date} notes={marker.notes} link={marker.link} />
      }
    }  
    return null
  })


  return (
    <div>
      <TimeRangeSlider min={START} max={END} dateRangeChanged={dateRangeChanged} />
      <TagList tags={tags} checkedChanged={checkedChanged} />
      <MapContainer center={[64.89, -18.58]} zoom={7} scrollWheelZoom={true} minZoom={6} maxBounds={maxBounds} id="map">
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          
          {markersComponents}
      </MapContainer>
    </div>
  );
}

export default Map;
