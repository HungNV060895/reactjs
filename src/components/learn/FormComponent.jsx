import { useRef } from "react";
import { useEffect, useState } from "react";
import { DatePicker, Space } from 'antd';

const FormToto = (props) => {

	const [valueInput, setValueInput] = useState("");
	const [valueDate, setValueDate] = useState("");
	const [taskPriority, setTaskPriority] = useState('low');

	const { addNewTodo, updateTodo, taskEdited} = props;
	
	const inputRef = useRef(null);

	const handleClick = () => {
		const trimmed = valueInput.trim();
		const trimmedPriority = taskPriority;
		if (!trimmed) {
			return;
		}

		if (taskEdited) {
			updateTodo(taskEdited.id, trimmed, trimmedPriority);
		} else {
			addNewTodo(trimmed, trimmedPriority);
		}

		setValueInput('');
	}

	const hadleOnchange = (name) => {
		setValueInput(name);
	}

	const handleDate = (date, dateString) => {
		setValueDate(date);
	}



	const hadleOnSelect = (priority) => {
		setTaskPriority(priority);
		//console.log(priority);
	}

	useEffect(() => {
		if (taskEdited) {
			inputRef.current.focus();
			setValueInput(taskEdited.name);
			setTaskPriority(taskEdited.priority);
		}
	}, [taskEdited]);
	return (
		<>
			<h3 className="task-ttl">{taskEdited ? "Sửa Task" : "Thêm mới Task"}</h3>
			<div className="todo-form">
				<div className="todo-date">
					<Space vertical>
						<DatePicker className="form-control" onChange={(date, dateString) => handleDate(date, dateString)} value={valueDate} />
					</Space>
				</div>
				<select name="priority" className="priority-task form-control" id="" onChange={(event) => hadleOnSelect(event.target.value)} value={taskPriority}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<input type="text" className="input-task" placeholder="Enter your task" ref={inputRef} onChange={(event) => hadleOnchange(event.target.value)}
					value={valueInput}
				/> {/* event.target.value == name */}
			   {
					taskEdited ? <button className="btn-add" onClick={handleClick}>Update</button> : <button onClick={handleClick}>Add</button>
			   }
			</div>
		</>
	)
}


export default FormToto;