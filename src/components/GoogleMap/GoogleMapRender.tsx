import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import  {Config } from "../../../src/shared/Config";


interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const libraries: ("places")[] = ["places"];

const GoogleMapRender: React.FC<GoogleMapProps> = ({ latitude, longitude, address }) => {
  const mapLatitude = latitude || 40.7128;
  const mapLongitude = longitude || -74.0060;

  const hasValidCoordinates = typeof mapLatitude === 'number' && typeof mapLongitude === 'number';
  const center = hasValidCoordinates ? { lat: mapLatitude, lng: mapLongitude } : undefined;

  const mapRef = useRef<google.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: Config.GoogleMapKey || "",
    libraries: libraries,
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setIsMapLoaded(true);

    if (center) {
      map.setCenter(center);
    }
  };

  const onUnmount = () => {
    mapRef.current = null;
    setIsMapLoaded(false);
  };

  if (loadError) {
    return (
      <div className="w-full flex items-center flex-col mb-3">
        <div className="w-full py-4">
        </div>
        <div className="w-full px-5 md:px-8 py-4 text-center text-red-500">
          "Error loading map. Please try again later."
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center flex-col ">
      
      {isLoaded && hasValidCoordinates ? (
        <div className="w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
          >
            {center && (
              <Marker
                position={center}
                title={`Click to open in Google Maps`}
                animation={window.google?.maps?.Animation?.DROP}
                onClick={() => {
                  if (mapLatitude && mapLongitude) {
                    window.open(`https://www.google.com/maps?q=${mapLatitude},${mapLongitude}`, "_blank");
                  }
                }}
              />
            )}
          </GoogleMap>
        </div>
      ) : !hasValidCoordinates ? (
        <div className="w-full px-5 md:px-8 py-4 text-center">
          <div className="bg-gray-100 h-auto p-6 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">("No location data available")</p>
          </div>
        </div>
      ) : (
        <div className="w-full px-5 md:px-8 py-4 text-center">
          <div className="animate-pulse bg-gray-200 h-[400px] rounded-xl flex items-center justify-center">
            <p className="text-gray-500">("Loading map...")</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapRender;
