
import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};





function GoogleMapComponent() {
  const key = process.env.REACT_APP_GOOGLE_API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const [map, setMap] = React.useState(null)

  const position = {
    lat: 37.772,
    lng: -122.214
  }
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (!isLoaded) { return <div>Loading ...</div>; }


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <MarkerF position={center} />
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapComponent)