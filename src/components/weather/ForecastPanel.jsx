import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import "dayjs/locale/vi";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale("vi");
dayjs.extend(customParseFormat);

const ForecastPanel = ({forecast}) => {

	const [forecastData, setForecastData] = useState([]);

	const bgWeather = {
		"clear": "#FAC775",
		"clouds": "#B5D4F4",
		"rain": "#85B7EB",
	}
	
	const desWeather = {
		"clear": "Nắng",
		"clouds": "Ít mây",
		"rain": "Có mưa",
	}

	useEffect(() => {
		if(forecast){
			const dataFilter = forecast.filter((item) => item.dt_txt.includes('12:00:00'));
			console.log(dataFilter);
			setForecastData(dataFilter);
		}
	}, [forecast]);
	
	return (
		<div className="panel">
			<div className="panel__title">Dự báo 5 ngày</div>
			<div className="forecast">
				{
					forecastData.map((item) => {
						const weatherMain = item.weather[0].main.toLowerCase();
						return(
							<div key={item.dt} className="forecast__item">
								<div className="forecast__dot" style={{background: bgWeather[weatherMain]}} />
								<div className="forecast__day">
									{
										dayjs(item.dt_txt).format('dddd')
									}
								</div>
								<div className="forecast__desc">{desWeather[weatherMain]}</div>
								<div className="forecast__temps">{Math.round(item.main.temp_max)}° <span>/ {Math.round(item.main.temp_min)}°</span></div>
							</div>
						)
					})
				}
				{/* <div className="forecast__item">
					<div className="forecast__dot" style={{ background: "#FAC775" }} />
					<div className="forecast__day">Hôm nay</div>
					<div className="forecast__desc">Nắng</div>
					<div className="forecast__temps">34° <span>/ 26°</span></div>
				</div>
				<div className="forecast__item">
					<div className="forecast__dot" style={{ background: "#B5D4F4" }} />
					<div className="forecast__day">Thứ Bảy</div>
					<div className="forecast__desc">Ít mây</div>
					<div className="forecast__temps">33° <span>/ 25°</span></div>
				</div>
				<div className="forecast__item">
					<div className="forecast__dot" style={{ background: "#85B7EB" }} />
					<div className="forecast__day">Chủ Nhật</div>
					<div className="forecast__desc">Có mưa</div>
					<div className="forecast__temps">29° <span>/ 24°</span></div>
				</div>
				<div className="forecast__item">
					<div className="forecast__dot" style={{ background: "#FAC775" }} />
					<div className="forecast__day">Thứ Hai</div>
					<div className="forecast__desc">Nắng</div>
					<div className="forecast__temps">35° <span>/ 27°</span></div>
				</div>
				<div className="forecast__item">
					<div className="forecast__dot" style={{ background: "#B5D4F4" }} />
					<div className="forecast__day">Thứ Ba</div>
					<div className="forecast__desc">Ít mây</div>
					<div className="forecast__temps">32° <span>/ 25°</span></div>
				</div> */}
			</div>
		</div>
	)
}

export default ForecastPanel;