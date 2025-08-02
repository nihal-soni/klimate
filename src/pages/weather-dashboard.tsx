import WeatherSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";

const WeatherDashboard = () => {

  const { coordinate, error: locationError, getLocation, isloading: locationLoading } = useGeolocation();
  
  const weatherQuery =  useWeatherQuery(coordinate);
  const forecastQuery = useForecastQuery(coordinate)
  const locationQuery = useReverseGeocodeQuery(coordinate);


  const handleRefresh = () => {
    getLocation();
    if (coordinate) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>LOcation error</AlertTitle>
        <AlertDescription>
          <p>
            {locationError}
          </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-3 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinate) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>LOcation Required</AlertTitle>
        <AlertDescription>
          <p>
            PLease enable location access to see your local weather
          </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-3 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>error</AlertTitle>
        <AlertDescription>
          <p>
            failed to fetch weather data , pleases try again
          </p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <MapPin className="mr-3 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  return (
    <div>
      {/* { favorite cities} */}
      <div className="flex item-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          my location
        </h1>
        <Button
          variant={'outline'}
          size={"icon"}
          onClick={handleRefresh}
          disabled= {weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : "" }`} />
        </Button>
      </div>
    </div>
  )
}

export default WeatherDashboard