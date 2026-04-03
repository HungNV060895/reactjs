import dayjs from 'dayjs';
import { Tag, Flex } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { APP_CONFIG } from "../../constants/APP_CONFIG";

dayjs.extend(customParseFormat);

const ListTodo = (props) => {
	const { tasks, deleteTask, editTask, toogleComplete } = props;
	// const handleGetID = (id) => {
	//     return id;
	// }
	const handleDelete = (id) => {
		deleteTask(id);
	}

	const getExpDate = (date) => {
		if (!date) return null;

		// Đưa về đầu ngày để so sánh chính xác chỉ số ngày chênh lệch
		const today = dayjs().startOf('day');
		const targetDate = dayjs(date, APP_CONFIG.DATE_FORMAT).startOf('day');
		const diff = targetDate.diff(today, "day");

		if (diff < 0) {
			return {
				tag: <Tag color="error">Hết hạn</Tag>,
				className: 'expired'
			};
		} else if (diff === 0) {
			return {tag: <Tag color="warning">Hạn hôm nay</Tag>, className: 'issue-today'};
		} else if (diff <= 2) {
			return {tag: <Tag color="processing">Sắp hết hạn</Tag>, className: 'upcoming'};
		} else {
			return {tag: <Tag color="success">Còn {diff} ngày</Tag>, className: 'normal'};
		}
	}

	const handleEdit = (id, priority, date) => {
		editTask(id, priority, date);
	}
	return (
		<>
			<ul className="todo-result">
				{
					tasks.map((item) => {
						const status = getExpDate(item.date);
						return (
							<li key={item.id} className={`${status?.className} todo-result__item` + ' ' + (item.complete ? 'completed' : '')}>
								<input type="checkbox" className="todo-result__checkbox" name="checkComplete" checked={item.complete} onChange={() => toogleComplete(item.id)} />
								<span className={`todo-result__name ${item.priority}`}>
									{item.name}
								</span>
								<Flex gap="small" align="center" className="due-date-block">
									<span className="todo-result__date">{item.date}</span>
									{/* Dấu ? giá trị của status có tồn tại thì hiển thị tag tương ứng, nếu không có thì không hiển thị gì cả */}
									{status?.tag}
								</Flex>
								<div className="todo-result__control">
									<button className="todo-result__control-btn todo-result__control-btn--delete" onClick={() => handleDelete(item.id)}>Delete</button>
									<button className="todo-result__control-btn todo-result__control-btn--edit" onClick={() => handleEdit(item.id, item.priority, item.date)}>Edit</button>
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