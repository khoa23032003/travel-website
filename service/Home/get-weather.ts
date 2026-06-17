export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`,
    { next: { revalidate: 1800 } },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}
