const ListTodo = (props) => {
    const { tasks, deleteTask, editTask, toogleComplete } = props;
    // const handleGetID = (id) => {
    //     return id;
    // }
    const handleDelete = (id) => {
        deleteTask(id);
    }

    const handleEdit = (id, priority) =>{
        editTask(id, priority);
    }
    //console.log(tasks);
    // const arr_task = props;
    // const listItem = arr_task.map(
    //     item =>
    //         <li key={item.id}>{ item.name}</li>
    // );
    return (
        <>
            <ul className="list-result">
                {
                    tasks.map((item) => {
                        return (
                            <li key={item.id}  className={item.complete ? 'completed' : ''}>
                                <input type="checkbox" name="checkComplete" checked={item.complete} onChange={() => toogleComplete(item.id)} />
                                <span className={`task-name ${item.priority}`}>
                                    {item.name}
                                </span>
                                <div className="control">
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button onClick={() => handleEdit(item.id, item.priority)}>Edit</button>
                                </div>
                            </li>
                            // The key needs to go on the outermost returned element.
                        )
                    })
                }
            </ul>
            
        </>
    )
}

export default ListTodo;