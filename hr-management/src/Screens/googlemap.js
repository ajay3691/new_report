import React from "react";
import { GoogleMap, useLoadScript,MarkerF } from "@react-google-maps/api";
function Googlemap() {
  //   const [map, setMap] = React.useState(null)

  //   const onLoad = React.useCallback(function callback(map) {
  //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     map.fitBounds(bounds);

  //     setMap(map)
  //   }, [])

  //   const onUnmount = React.useCallback(function callback(map) {
  //     setMap(null)
  //   }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDotYCgWt4dfYvTFtQAeWoOTnL-rT4i298",
  });
  return isLoaded ? (
    <div style={{height:"100vh"}} className="pt-10 pb-10">
      <GoogleMap
        mapContainerStyle={{ height: "100%" }}
        center={{lat: 12.96397, lng: 77.74874}}
        zoom={10}
      >
        <MarkerF
        position={{lat: 12.96397, lng: 77.74874}}
        />
            
      </GoogleMap>
    </div>
  ) : (
    <div></div>
  );
}
export default Googlemap;
