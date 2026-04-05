import { useState } from "react";

import SearchBar from "../components/weather/SearchBar";
import MainCard from "../components/weather/MainCard";
import HourlyPanel from "../components/weather/HourlyPanel";
import ForecastPanel from "../components/weather/ForecastPanel";
import StatCard from "../components/weather/StatCard";

const Weather = () => {
	const [city, setCity] = useState("Hồ Chí Minh");
	const [weatherData, setWeatherData] = useState(null);

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