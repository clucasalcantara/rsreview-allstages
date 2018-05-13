import React from 'react'
// Map Component from Google's
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapComponent = withScriptjs(withGoogleMap((props) => {
  const { restaurants, filters, showDetails } = props
  const { cuisine, neighborhood } = filters
  let mapMarkers = restaurants

  if (cuisine !== 'all') {
    mapMarkers = mapMarkers.filter(restaurant => restaurant.cuisine_type === cuisine)
  }
 
  if (neighborhood !== 'all') {
    mapMarkers = mapMarkers.filter(restaurant => restaurant.neighborhood === neighborhood)
  }
  
  return (
    <GoogleMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      defaultZoom={12}
      defaultCenter={{ lat: 40.713829, lng: -73.989667 }}
    >
      {mapMarkers && mapMarkers.length > 0 &&
        mapMarkers.map(restaurant => (
          <Marker
            key={restaurant.name}
            position={{ lat: restaurant.latlng.lat, lng: restaurant.latlng.lng }}
            onClick={ () => onMarkerClick(restaurant, showDetails) }
            title={restaurant.name} />
        ))
      }
    </GoogleMap>
  )
}))

const onMarkerClick = (restaurant, callback) => {
  callback(restaurant)
}

export default MapComponent