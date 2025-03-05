import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_icons: string[];
    weather_descriptions: string[];
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <Card className="max-w-3xl mx-auto bg-purple-950 rounded-xs shadow-2xl border-0 text-white p-6">
      <CardHeader>
        <div className="flex items-center gap-6">
          {/* Weather Icon */}
          <img
            src={data.current.weather_icons[0]}
            alt={data.current.weather_descriptions[0]}
            className="w-16 h-16 rounded-full border-2 border-pink-500 shadow-md"
          />
          <div>
            <CardTitle className="text-2xl font-extrabold text-orange-400">
              {data.location.name}, {data.location.country}
            </CardTitle>
            <p className="text-lg font-semibold text-pink-400">
              {data.current.temperature}°C
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg">
          <span className="font-bold text-orange-400">Region:</span> {data.location.region}
        </p>
        <p className="text-lg">
          <span className="font-bold text-orange-400">Observation Time:</span> {data.current.observation_time}
        </p>
        <p className="text-lg">
          <span className="font-bold text-orange-400">Weather:</span> {data.current.weather_descriptions.join(", ")}
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
