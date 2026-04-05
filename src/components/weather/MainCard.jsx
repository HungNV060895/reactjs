import { WiDaySunny, WiRain, WiCloudy, WiThunderstorm } from "react-icons/wi";


const WeatherIcon = ({ condition }) => {
	const icons = {
		sunny: <WiDaySunny size={100} color="#FAC775" />,
		rainy: <WiRain size={72} color="#85B7EB" />,
		cloudy: <WiCloudy size={72} color="#B5D4F4" />,
		thunderstorm: <WiThunderstorm size={72} color="#888780" />,
	};

	return icons[condition] ?? <WiDaySunny size={72} color="#FAC775" />;
};

const MainCard = () => {
	return (
		<div className="main-card">
			<div className="main-card__city-row">
				<div>
					<div className="main-card__city-name">Hồ Chí Minh</div>
					<div className="main-card__city-date">Thứ Sáu, 03/04/2026</div>
				</div>
			</div>

			<div className="main-card__icon-wrap">
				<WeatherIcon condition="sunny" />
			</div>

			<div className="main-card__temp-row">
				<div className="main-card__temp">34</div>
				<div className="main-card__temp-unit">°C</div>
			</div>
			<div className="main-card__desc">Nắng, ít mây</div>

			<div className="main-card__detail-row">
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">78%</div>
					<div className="main-card__detail-lbl">Độ ẩm</div>
				</div>
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">12 km/h</div>
					<div className="main-card__detail-lbl">Gió</div>
				</div>
				<div className="main-card__detail-item">
					<div className="main-card__detail-val">10%</div>
					<div className="main-card__detail-lbl">Mưa</div>
				</div>
			</div>
		</div>
	)
}

export default MainCard;