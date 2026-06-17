import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllWeather } from "@/service/Home/get-all-weather";
import { weatherIcons } from "@/service/Home/weather-icons";

export default async function WeatherCarousel() {
  const weatherData = await getAllWeather();

  const validWeatherData = weatherData?.filter((item) => item.weather) || [];

  if (validWeatherData.length === 0) return null;

  return (
    <div className="flex flex-col w-full container mx-auto mt-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-gray-100 gap-4 mb-8">
        <div className="space-y-1">
          <h2 className="font-black text-2xl md:text-3xl tracking-tight text-brand-medium">
            Thời tiết các tỉnh thành
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Cập nhật trạng thái thời tiết thời gian thực tại các điểm đến
          </p>
        </div>

        <button className="group flex items-center gap-2 font-bold text-base md:text-lg text-accent-orange hover:text-orange-600 transition-colors duration-300 bg-orange-50 hover:bg-orange-100/70 px-4 py-2.5 rounded-full shadow-sm shadow-orange-500/5 active:scale-95">
          Xem bản đồ chi tiết
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>

      <div className="relative w-full px-4 sm:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 ">
            {validWeatherData.map((item) => {
              const weather = item.weather!;
              const Icon =
                weatherIcons[weather.weather_code as keyof typeof weatherIcons];

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <div className="relative overflow-hidden h-full rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-white to-blue-50/30 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex flex-col justify-between h-full space-y-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-bold text-accent-orange tracking-tight line-clamp-2">
                            {item.name}
                          </h3>
                          {Icon && (
                            <div className="flex-shrink-0 text-blue-500 p-3 bg-blue-50/80 rounded-2xl border border-blue-100/50 shadow-inner">
                              <Icon size={38} strokeWidth={2.2} />
                            </div>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-gray-900 tracking-tighter">
                            {Math.round(weather.temperature_2m)}
                          </span>
                          <span className="text-2xl font-bold text-blue-500">
                            °C
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 bg-gray-50/80 px-3 py-2 rounded-xl">
                            <span className="text-base">💧</span>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-medium uppercase">
                                Độ ẩm
                              </span>
                              <span className="text-xs font-bold text-gray-700">
                                {weather.relative_humidity_2m}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50/80 px-3 py-2 rounded-xl">
                            <span className="text-base">💨</span>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-medium uppercase">
                                Sức gió
                              </span>
                              <span className="text-xs font-bold text-gray-700">
                                {Math.round(weather.wind_speed_10m)} km/h
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[11px] text-gray-400 font-medium pt-1">
                          <span>Mã: {weather.weather_code}</span>
                          <span className="font-mono bg-gray-100/70 px-2 py-0.5 rounded-md">
                            Cập nhật: {weather.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
