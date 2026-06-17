import { location } from "@/data/destinations";
import { getWeather } from "@/service/Home/get-weather";

export async function getAllWeather() {
  return Promise.all(
    location.map(async (province) => {
      if (province.lat === null || province.lon === null) {
        return {
          ...province,
          weather: null,
        };
      }

      const weather = await getWeather(province.lat, province.lon);
      console.log(province.name, weather);
      return {
        ...province,
        weather: weather.current,
      };
    }),
  );
}
