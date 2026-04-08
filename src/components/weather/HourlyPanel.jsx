import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import "dayjs/locale/vi";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale("vi");
dayjs.extend(customParseFormat);

const HourlyPanel = ({data}) => {
	const [hourlyData, setHourlyData] = useState([]);

	useEffect(() => {
		if(data){
			// Lấy 5 múi giờ tiếp theo (tương đương 24h tới)
			// API đã tự động trả về từ mốc thời gian gần nhất sắp tới
			const dataFilter = data.slice(0, 5);
			setHourlyData(dataFilter);
			console.log(dataFilter);
		}
	}, [data]);

	// Hàm lấy URL icon từ OpenWeatherMap
	const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

	return (
		<div className="panel">
			<div className="panel__title">Theo giờ</div>
			<div className="hourly">
				{hourlyData.map((item, index) => {
					const isNow = index === 0;
					return (
						<div key={item.dt} className={`hourly__item ${isNow ? 'hourly__item--active' : ''}`}>
							<div className="hourly__time">
								{isNow ? 'Bây giờ' : dayjs(item.dt * 1000).format('HH:mm')}
							</div>
							<img 
								src={getIconUrl(item.weather[0].icon)} 
								alt={item.weather[0].description} 
								width={40}
							/>
							<div className="hourly__temp">{Math.round(item.main.temp)}°</div>
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default HourlyPanel;