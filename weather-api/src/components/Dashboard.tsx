import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "@/services/dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThermometerSun } from "lucide-react";
import { InputWithButton } from "@/components/shared/InputWithButton";
import { Skeleton } from "@/components/ui/skeleton";
import GenericTable from "@/components/GenericTable";
import ErrorDialog from "./shared/ErrorDialog";
import WeatherCard, { WeatherData } from "./WeatherCard";

const Dashboard = () => {
  const [city, setCity] = useState("New York");
  const [showError, setShowError] = useState(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["current", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: false,
  });

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <ErrorDialog
        isOpen={showError}
        onClose={setShowError}
        message={errorMessage}
      />
    );
  }

  const headers = ["Metric", "Value"];
  const weatherData = data
    ? [
        ["Wind Speed", `${data.current.wind_speed} km/h`],
        ["Wind Direction", data.current.wind_dir],
        ["Pressure", `${data.current.pressure} hPa`],
        ["Precipitation", `${data.current.precip} mm`],
        ["Humidity", `${data.current.humidity} %`],
        ["Cloud Cover", `${data.current.cloudcover} %`],
        ["Feels Like", `${data.current.feelslike} °C`],
        ["UV Index", `${data.current.uv_index}`],
        ["Visibility", `${data.current.visibility} km`],
      ]
    : [];

  return (
    <>
      {/* Dashboard Container */}
      <div className="mt-6 max-w-5xl w-full bg-purple-950 border border-purple-800 shadow-lg rounded-s p-6 mx-auto flex items-center gap-6">
        {/* Avatar */}
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-purple-800 flex items-center justify-center w-12 h-12">
            <ThermometerSun className="w-8 h-8 text-orange-300" />
          </AvatarFallback>
        </Avatar>

        {/* Input with Button */}
        <div className="flex-1 text-orange-300">
          <InputWithButton
            btnText="Fetch Weather"
            placeholderText="Enter city name..."
            onSubmit={() => refetch()}
            onChange={setCity}
          />
        </div>
      </div>

      {/* Skeleton Loader */}
      {isLoading && <Skeleton className="h-40 w-full mt-6 bg-purple-800" />}

      {/* Weather Card */}
      {data && (
        <div className="mt-8 flex justify-center">
          <WeatherCard data={data as WeatherData} />
        </div>
      )}

      {/* Weather Metrics Table */}
      {data && (
        <div className="mt-8 max-w-5xl w-full mx-auto p-6 bg-purple-900 border border-purple-800 shadow-lg rounded-s">
          <h2 className="text-2xl font-semibold text-orange-300 mb-4 text-center">
            Weather Data
          </h2>
          <GenericTable headers={headers} data={weatherData} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
