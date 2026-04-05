const ICON_MAP = {
    pressure: 
    <svg width="18" height="18" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="4" fill="none" stroke="#185FA5" strokeWidth="1.5" />
        <line x1="10" y1="2" x2="10" y2="5" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="15" x2="10" y2="18" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="10" x2="5" y2="10" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="15" y1="10" x2="18" y2="10" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    humidity: 
    <svg width="18" height="18" viewBox="0 0 20 20">
        <path d="M10 2C10 2 5 8 5 12a5 5 0 0010 0C15 8 10 2 10 2z" fill="none" stroke="#3B6D11" strokeWidth="1.5" />
    </svg>,
    uv: 
    <svg width="18" height="18" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="3" fill="#854F0B" />
        <path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.5 3.5l2 2M14.5 14.5l2 2M16.5 3.5l-2 2M5.5 14.5l-2 2" stroke="#854F0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    wind: 
    <svg width="18" height="18" viewBox="0 0 20 20">
        <path d="M3 10 Q10 4 17 10" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 14 Q10 8 17 14" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
};

const BG_MAP = {
    pressure: "#E6F1FB",
    humidity: "#EAF3DE",
    uv: "#FAEEDA",
    wind: "#E6F1FB",
};

const StartCard = ({label, value, icon}) => {
    return(
        <div className="stat-card">
            <div className="stat-card__icon" style={{ background: BG_MAP[icon] }}>
                {ICON_MAP[icon]}
            </div>
            <div className="stat-card__val">{value}</div>
            <div className="stat-card__lbl">{label}</div>
        </div>
    );
}

export default StartCard;