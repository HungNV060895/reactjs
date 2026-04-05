const ForecastPanel = () => {
    return (
        <div className="panel">
            <div className="panel__title">Dự báo 5 ngày</div>
            <div className="forecast">
                <div className="forecast__item">
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
                </div>
            </div>
        </div>
    )
}

export default ForecastPanel;