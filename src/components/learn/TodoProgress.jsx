const TodoProgress = (props) => {
    const { totalTask, totalComplete, totalIncomplete } = props;

    const percentage = totalTask > 0 ? Math.round((totalComplete / totalTask) * 100) : 0;

    return (
        <div className="todo-panel todo-progress">
            <h3 className="panel-label todo-form__ttl">Tiến độ</h3>
            <div className="todo-progress__stats">
                <div>
                    <div className="todo-progress__label">Hoàn thành</div>
                    <div className="todo-progress__label"><strong>{totalComplete} / {totalTask}</strong> task</div>
                </div>
                <div className="todo-progress__percent">{percentage}%</div>
            </div>
            <div className="todo-progress__track">
                <div className="todo-progress__fill" style={{width: `${percentage}%`}}></div>
            </div>
            <div className="todo-progress__sub">
                <div className="todo-progress__sub-item">
                    <div className="todo-progress__dot" style={{ backgroundColor: '#D85A30' }}></div>
                    <span>Hoàn thành: <strong>{totalComplete}</strong></span>
                </div>
                <div className="todo-progress__sub-item">
                    <div className="todo-progress__dot" style={{ backgroundColor: '#D3D1C7' }}></div>
                    <span>Chưa xong: <strong>{totalIncomplete}</strong></span>
                </div>
            </div>
        </div>
    );
}

export default TodoProgress;