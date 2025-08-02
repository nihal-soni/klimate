import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
    coordinate: Coordinates | null
    error: string | null;
    isloading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinate: null,
        error: null,
        isloading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isloading: true, error: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinate: null,
                error: "Geolocation is not supported by your browser",
                isloading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinate: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isloading: false,
            });
        }, (error) => {
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permisssion is denied. please enable location permission"
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable"
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request error occurred"
                    break;

                default:
                    errorMessage = "An unknown error occurred"
            }

            setLocationData({
                coordinate: null,
                error: errorMessage,
                isloading: false
            });
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    };


    useEffect(() => {
        getLocation()
    }, []);

    return {
        ...locationData,
        getLocation

    }
}