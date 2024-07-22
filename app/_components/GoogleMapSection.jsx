import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { list } from 'postcss';
import MarkerItem from './MarkerItem';


const containerStyle = {
    width: '100%',
    height: '75vh',
    borderRadius:10,
  };
  
function GoogleMapSection({coordinates, listing}) {
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })

    useEffect(() => {
        coordinates&&setCenter(coordinates)
    }, [coordinates])



    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    {listing.map((item,index) => (
        <MarkerItem key={index} item={item}/>
    ))}

      
    </GoogleMap>
)
}

export default GoogleMapSection