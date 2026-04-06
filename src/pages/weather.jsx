import { useEffect, useState } from "react";

import SearchBar from "../components/weather/WeatherSearch";
import MainCard from "../components/weather/WeatherMain";
import HourlyPanel from "../components/weather/HourlyPanel";
import ForecastPanel from "../components/weather/ForecastPanel";
import StatCard from "../components/weather/StatCard";
import { fetchWeather } from "../services/api.service";

const Weather = () => {
	const [city, setCity] = useState("Ha Noi");
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		const fetchAPI = async () => {
			setLoading(true);
			const data = await fetchWeather(city);
			setWeatherData(data);
		}
		setLoading(false);
		fetchAPI();
	},[city]);
	
	return (
		<div className="wrapper">
			<section className="sec-weather">
				<div className="inner">
					<div className="weather">

						{/* Search */}
						<SearchBar onSearch={setCity} />

						{/* Top */}
						<div className="weather__top">

							{/* Main card */}
							<MainCard data={weatherData} />

							{/* Right col */}
							<div className="right-col">

								{/* Hourly panel */}
								<HourlyPanel hours={weatherData?.hourly} />

								{/* Forecast panel */}
								<ForecastPanel forecast={weatherData?.forecast} />

							</div>
						</div>

						{/* Bottom stats */}
						<div className="weather__bottom">
							<StatCard label="Áp suất" value="1012" icon="pressure" />
							<StatCard label="Độ ẩm" value="78%" icon="humidity"/>
							<StatCard label="Chỉ số UV" value="UV 8" icon="humidity"/>
							<StatCard label="Tốc độ gió" value="12 km/h" icon="wind"/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Weather;