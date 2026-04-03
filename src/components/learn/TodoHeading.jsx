import useCurrentTime from "../../hooks/useCurrentTime";

const TodoHeading = () =>{
    const today = useCurrentTime();
    return (
        <div className="todo-heading">
            <div className="todo-heading__left">
                <p className="todo-heading__greeting">Xin chào, hôm nay là</p>
                <p className="todo-heading__date">
                    {today.format('dddd, DD/MM/YYYY')}
                </p>
            </div>
            <div className="todo-heading__right">VH</div>
        </div>
    )
}

export default TodoHeading;