import { useEffect, useState } from "react";

import SearchBar from "../components/weather/WeatherSearch";
import MainCard from "../components/weather/WeatherMain";
import HourlyPanel from "../components/weather/HourlyPanel";
import ForecastPanel from "../components/weather/ForecastPanel";
import StatCard from "../components/weather/StatCard";
import { fetchWeather, fetchWeather2} from "../services/api.service";

const Weather = () => {
	const [city, setCity] = useState("Ha Noi");
	const [weatherData, setWeatherData] = useState(null);
	const [weatherData2, setWeatherData2] = useState(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		const fetchAPI = async () => {
			setLoading(true);
			try {
				// Gọi song song 2 API để tối ưu performance
				const [current, forecast] = await Promise.all([
					fetchWeather(city),
					fetchWeather2(city)
				]);
				setWeatherData(current);
				setWeatherData2(forecast);
			} catch (error) {
				console.error("Failed to fetch weather:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchAPI();
	},[city]);


	//console.log(weatherData2?.list);
	return (
		<div className="wrapper">
			<section className="sec-weather">
				<div className="inner">
					<div className="weather">

						{loading && <div className="weather__loading">Đang tải dữ liệu...</div>}

						{/* Search */}
						<SearchBar onSearch={setCity} />

						{/* Top */}
						<div className="weather__top">

							{/* Main card */}
							<MainCard data={weatherData} />

							{/* Right col */}
							<div className="right-col">

								{/* Hourly panel */}
								<HourlyPanel data={weatherData2?.list} />

								{/* Forecast panel */}
								<ForecastPanel forecast={weatherData2?.list} />

							</div>
						</div>

						{/* Bottom stats */}
						<div className="weather__bottom">
							<StatCard label="Áp suất" value={weatherData?.main?.pressure} icon="pressure" />
							<StatCard label="Độ ẩm" value={weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : '--'} icon="humidity"/>
							<StatCard label="Chỉ số UV" value="UV 8" icon="humidity"/>
							<StatCard label="Tốc độ gió" value={weatherData?.wind?.speed ? `${weatherData.wind.speed} km/h` : '--'} icon="wind"/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Weather;