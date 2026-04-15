import { WiDaySunny, WiRain, WiCloudy, WiThunderstorm } from "react-icons/wi";
import useCurrentTime from "../../hooks/useCurrentTime";

const WeatherIcon = ({ condition }) => {
	const icons = {
		sunny: <WiDaySunny size={100} color="#FAC775" />,
		clear: <WiDaySunny size={100} color="#FAC775" />,
		rain: <WiRain size={72} color="#85B7EB" />,
		clouds: <WiCloudy size={72} color="#B5D4F4" />,
		thunderstorm: <WiThunderstorm size={72} color="#888780" />,
	};

	return icons[condition] ?? <WiDaySunny size={72} color="#FAC775" />;
};

const WeatherMain = ({data}) => { // Đổi tên cho đồng bộ với file
	const today = useCurrentTime();
	if(!data) return <div className="main-card">Thời tiết đang được cập nhật</div>

	const { name, main, weather, wind, clouds } = data;
	
	//console.log(data);
	return (
		<div className="main-card">
			<div className="main-card__city-row">
				<div>
					<div className="main-card__city-name">{name}</div>
					<div className="main-card__city-date">{today.format('dddd, DD/MM/YYYY')}</div>
				</div>
			</div>

			<div className="main-card__icon-wrap">
				<WeatherIcon condition={weather?.[0]?.main?.toLowerCase()} />
			</div>

			<div className="main-card__temp-row">
				<div className="main-card__temp">{Math.round(main?.temp)}</div>
				<div className="main-card__temp-unit">°C</div>
			</div>
			<div className="main-card__desc">{weather?.[0]?.description}</div>

			<div className="main-card__detail-row">
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">{main?.humidity}%</div>
					<div className="main-card__detail-lbl">Độ ẩm</div>
				</div>
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">{wind?.speed} km/h</div>
					<div className="main-card__detail-lbl">Gió</div>
				</div>
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">{clouds?.all}%</div>
					<div className="main-card__detail-lbl">Mây</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherMain;