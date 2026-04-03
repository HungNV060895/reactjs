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
			return <Tag color="error">Hết hạn</Tag>;
		} else if (diff === 0) {
			return <Tag color="warning">Hạn hôm nay</Tag>;
		} else if (diff <= 2) {
			return <Tag color="processing">Sắp hết hạn</Tag>;
		} else {
			return <Tag color="success">Còn {diff} ngày</Tag>;
		}
	}

	const handleEdit = (id, priority, date) => {
		editTask(id, priority, date);
	}
	return (
		<>
			<ul className="list-result">
				{
					tasks.map((item) => {
						return (
							<li key={item.id} className={item.complete ? 'completed' : ''}>
								<input type="checkbox" name="checkComplete" checked={item.complete} onChange={() => toogleComplete(item.id)} />
								<span className={`task-name ${item.priority}`}>
									{item.name}
								</span>
								<Flex gap="small" align="center" className="due-date-block">
									<span className="date-text">{item.date}</span>
									{getExpDate(item.date)}
								</Flex>
								<div className="control">
									<button onClick={() => handleDelete(item.id)}>Delete</button>
									<button onClick={() => handleEdit(item.id, item.priority, item.date)}>Edit</button>
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