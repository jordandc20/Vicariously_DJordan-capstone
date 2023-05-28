
import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

// <Marker
//   position={{ lat: 18.52043, lng: 73.856743 }}
//   icon={"https://developers.google.com/maps/documentation/
//   javascript/examples/full/images/beachflag.png"}
//  />
// const customMarker = {
//   path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
//   fillColor: "red",
//   fillOpacity: 2,
//   strokeWeight: 1,
//   rotation: 0,
//   scale: 1,
// };

// https://stackoverflow.com/a/62416781/21944334




function GoogleMapComponent({ locations }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const key = process.env.REACT_APP_GOOGLE_API
  const [map, setMap] = React.useState(null)

  


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  let lats=[]
  let lngs =[]
  const markers = locations.map((marker, index) => {
    if (marker.google_map_url) {
      let regexp = /!8m2!3d([0-9.]*)!4d([0-9.]*)!16s/g
      const coordinates = [...marker.google_map_url.matchAll(regexp)]
      // setLats([...lats, Number(coordinates[0][1])])
      // setLngs([...lngs, Number(coordinates[0][2])])
lats.push( Number(coordinates[0][1]))
lngs.push( Number(coordinates[0][2]))
      const position = { lat: Number(coordinates[0][1]), lng: Number(coordinates[0][2]) }
      return (<MarkerF
        key={index}
        onClick={() => handleActiveMarker(index)}
        position={position}
      >
         {activeMarker === index ? (
            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
              <div>{marker.location_name}</div>
            </InfoWindowF>
          ) : null}
      </MarkerF>)
    } else { return null }
  })

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const center = {
    lat: (lats.reduce((a, b) => a + b, 0)/ lats.length),
    lng: (lngs.reduce((a, b) => a + b, 0)/ lngs.length)
  };


  if (!isLoaded) { return <div>Loading ...</div>; }


  return isLoaded ? (
    <GoogleMap
      // mapContainerStyle={containerStyle}
      
      mapContainerStyle={{ width: "50vw", height: "50vh" }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers}
      
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapComponent)