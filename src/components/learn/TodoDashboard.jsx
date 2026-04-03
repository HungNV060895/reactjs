const TodoDashboard = (props) => {
    const { totalTask, totalComplete, totalIncomplete } = props;

    return (
        <ul className="todo-dashboard">
            <li className="todo-dashboard__item	todo-dashboard__item--primary">
                <div className="todo-dashboard__item-ttl">Tổng task</div>
                <div className="todo-dashboard__item-num">{totalTask}</div>
            </li>
            <li className="todo-dashboard__item	todo-dashboard__item--primary">
                <div className="todo-dashboard__item-ttl">Sắp hết hạn</div>
                <div className="todo-dashboard__item-num">4</div>
            </li>
            <li className="todo-dashboard__item todo-dashboard__item--secondary">
                <div className="todo-dashboard__item-ttl">Quá hạn</div>
                <div className="todo-dashboard__item-num">3</div>
            </li>
        </ul>
    )
}

export default TodoDashboard;