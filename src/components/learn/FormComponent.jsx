import { useRef } from "react";
import { useEffect, useState } from "react";
import { DatePicker, Space, notification } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { APP_CONFIG } from "../../constants/APP_CONFIG";

dayjs.extend(customParseFormat);

const FormToto = (props) => {

	const [valueInput, setValueInput] = useState("");
	const [valueDate, setValueDate] = useState(null);
	const [taskPriority, setTaskPriority] = useState('low');

	const { addNewTodo, updateTodo, taskEdited} = props;
	
	const inputRef = useRef(null);

	const handleClick = () => {
		const trimmed = valueInput.trim();
		const trimmedPriority = taskPriority;
		const formattedDate = valueDate ? valueDate.format(APP_CONFIG.DATE_FORMAT) : "";
		if (!trimmed) {
			return;
		}

		if (taskEdited) {
			updateTodo(taskEdited.id, trimmed, trimmedPriority, formattedDate);
			notification.success({
				message: 'Cập nhật thành công',
				description: `Task "${trimmed}" đã được cập nhật thông tin mới.`,
			});
		} else {
			addNewTodo(trimmed, trimmedPriority, formattedDate);
			notification.success({
				message: 'Thêm mới thành công',
				description: `Task "${trimmed}" đã được thêm vào danh sách công việc.`,
			});
		}

		setValueInput('');
		setValueDate(null);
	}

	const hadleOnchange = (name) => {
		setValueInput(name);
	}

	const handleDate = (date) => {
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
			setValueDate(taskEdited.date ? dayjs(taskEdited.date, APP_CONFIG.DATE_FORMAT) : null);
			setTaskPriority(taskEdited.priority);
		}
	}, [taskEdited]);
	return (
		<>
			<h3 className="task-ttl">{taskEdited ? "Sửa Task" : "Thêm mới Task"}</h3>
			<div className="todo-form">
				<div className="todo-date">
					<Space direction="vertical">
						<DatePicker format={APP_CONFIG.DATE_FORMAT} className="form-control" onChange={(date) => handleDate(date)} value={valueDate} />
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