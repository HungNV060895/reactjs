const HourlyPanel = () => {
    return (
        <div className="panel">
            <div className="panel__title">Theo giờ</div>
            <div className="hourly">
                <div className="hourly__item">
                    <div className="hourly__time">08:00</div>
                    <svg className="hourly__icon" width="20" height="20" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="6" fill="#FAC775" />
                    </svg>
                    <div className="hourly__temp">31°</div>
                </div>
                <div className="hourly__item hourly__item--active">
                    <div className="hourly__time">11:00</div>
                    <svg className="hourly__icon" width="20" height="20" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="6" fill="#FAC775" />
                    </svg>
                    <div className="hourly__temp">34°</div>
                </div>
                <div className="hourly__item">
                    <div className="hourly__time">14:00</div>
                    <svg className="hourly__icon" width="22" height="14" viewBox="0 0 22 14">
                        <ellipse cx="11" cy="9" rx="10" ry="5" fill="#B5D4F4" />
                        <circle cx="8" cy="7" r="5" fill="#B5D4F4" />
                        <circle cx="14" cy="6" r="4" fill="#B5D4F4" />
                    </svg>
                    <div className="hourly__temp">32°</div>
                </div>
                <div className="hourly__item">
                    <div className="hourly__time">17:00</div>
                    <svg className="hourly__icon" width="22" height="18" viewBox="0 0 22 18">
                        <ellipse cx="11" cy="9" rx="10" ry="5" fill="#85B7EB" />
                        <circle cx="8" cy="7" r="5" fill="#85B7EB" />
                        <line x1="7" y1="14" x2="6" y2="18" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="11" y1="14" x2="10" y2="18" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="15" y1="14" x2="14" y2="18" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <div className="hourly__temp">28°</div>
                </div>
                <div className="hourly__item">
                    <div className="hourly__time">20:00</div>
                    <svg className="hourly__icon" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M15 10a5 5 0 01-7.5 4.33A5 5 0 1015 10z" fill="#B5D4F4" />
                    </svg>
                    <div className="hourly__temp">26°</div>
                </div>
            </div>
        </div>
    )
}

export default HourlyPanel;