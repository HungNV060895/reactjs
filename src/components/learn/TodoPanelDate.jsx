import useCurrentTime from "../../hooks/useCurrentTime";

const TodoPanelDate = () => {
	const today = useCurrentTime();

	return (
		<div className="todo-panel date-panel">
			<div className="date-panel__label">Ngày hôm nay</div>
			<div className="date-panel__big">{today.format('DD')}<br />tháng {today.format('M')}</div>
			<div className="date-panel__sub">{today.format('dddd')}, {today.format('YYYY')}</div>
		</div>
	)
}

export default TodoPanelDate;