import FormToto from "./FormComponent";
import ListTodo from "./ListComponent";
import SearchTodo from "./SearchComponent";
import logoEmpty from './../../assets/img/empty.png';
import TodoHeading from "./TodoHeading";
import TodoDashboard from "./TodoDashboard";
import TodoPanelDate from "./TodoPanelDate";
import TodoProgress from "./TodoProgress";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { APP_CONFIG } from "../../constants/APP_CONFIG";

dayjs.extend(customParseFormat);

const TodoApp = () => {
	const [tasks, setTask] = useState(() => {
		const saved = localStorage.getItem('tasks');
		return saved ? JSON.parse(saved) : [];
	});
	const [taskEdited, setTaskEdited] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [filterProiority, setFilterPriority] = useState('all'); //all, low, medium, high
	const [filterStatus, setFilterStatus] = useState('all'); //all, complete, incomplete
	const [sortBy, setSortBy] = useState('none'); //none, date-asc, date-desc, priority-asc, priority-desc

	const randomIntFromInterval = (min, max) => { // min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}



	const addNewTodo = (name, priority, date) => {
		const newTask = {
			id: randomIntFromInterval(1, 1000000),
			name: name,
			complete: false,
			priority: priority,
			date: date,
			createdAt: dayjs().format(APP_CONFIG.DATE_FORMAT),
		}; {/*Khởi tạo 1 task mới*/ }
		setTask([...tasks, newTask]); {/*Copy lại array tasks và thêm newsTask vào mảng tasks*/ }
	}

	const toogleComplete = (id) => {
		const newTaskComplete = tasks.map(item => {
			if (item.id === id) {
				return { ...item, complete: !item.complete };
			}
			return item;
		});
		setTask(newTaskComplete);
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks)); // Lưu tasks vào localStorage dưới dạng chuỗi JSON
	}, [tasks]);


	const deleteTask = (id) => {
		const newTask2 = tasks.filter(item => item.id != id);
		setTask(newTask2);
		//Huỷ chỉnh sửa nếu đang chỉnh sửa task bị xoá
		if (taskEdited?.id === id) {
			setTaskEdited(null);
		}
	}

	//Hàm này sẽ được truyền vào ListTodo để khi click vào nút Edit sẽ gọi hàm này và tìm ra task cần chỉnh sửa dựa vào id, sau đó setTaskEdited để đưa task đó lên FormToto
	const editTask = (id, priority, date) => {
		const currentTask = tasks.find(item => item.id === id);
		if (currentTask) {
			setTaskEdited({ ...currentTask, priority, date, createdAt });
		}
	}


	//Hàm này sẽ được truyền vào FormToto để khi click vào nút Add (khi đang chỉnh sửa) sẽ gọi hàm này và tìm ra task cần chỉnh sửa dựa vào id, sau đó cập nhật lại tên task đó và setTaskEdited(null) để reset form về trạng thái thêm mới
	const updateTodo = (id, newName, newPriority, newDate, newCreatedAt) => {
		const newTask3 = tasks.map(item => {
			if (item.id === id) {
				return { ...item, name: newName, priority: newPriority, date: newDate, createdAt: newCreatedAt};
			}
			return item;
		});
		setTask(newTask3);
		setTaskEdited(null);
	}


	// Filter tasks dựa trên searchKeyword, priority và status
	const filteredTasks = tasks.filter(item =>
		//Nếu không có searchKeyword thì bỏ qua filter search, ngược lại lọc theo tên
		(!searchKeyword || item.name.toLowerCase().includes(searchKeyword.toLowerCase()))
		//khi filterProiority là 'all' thì callback trả về true cho mọi item, ngược lại chỉ trả về true cho những item có priority trùng với filterProiority
		&& (filterProiority === 'all' || item.priority === filterProiority)
		//khi filterStatus là 'all' thì callback trả về true cho mọi item, ngược lại chỉ trả về true cho những item có complete trùng với filterStatus (complete -> true, incomplete -> false)
		&& (filterStatus === 'all' || item.complete === (filterStatus === 'complete'))
	).sort((a, b) => {

		//if(sortBy === 'none') return 0;
		if(sortBy === 'newest') return (dayjs(b.createdAt, APP_CONFIG.DATE_FORMAT).unix() || 0) - (dayjs(a.createdAt, APP_CONFIG.DATE_FORMAT).unix() || 0);
		if(sortBy === 'oldest') return (dayjs(a.createdAt, APP_CONFIG.DATE_FORMAT).unix() || 0) - (dayjs(b.createdAt, APP_CONFIG.DATE_FORMAT).unix() || 0);
		if(sortBy === 'expired'){
			if (!a.date) return 1; // Đẩy task không có ngày xuống cuối
			if (!b.date) return -1;
			
			const dateA = dayjs(a.date, APP_CONFIG.DATE_FORMAT).unix();
			const dateB = dayjs(b.date, APP_CONFIG.DATE_FORMAT).unix();
			return dateA - dateB;
		}
	});
	
	// Tính toán tổng số task, số task hoàn thành và số task chưa hoàn thành để truyền vào TodoDashboard và TodoProgress
	const totalTask = tasks.length;
	const totalComplete = tasks.filter(item => item.complete).length;
	const totalIncomplete = totalTask - totalComplete;

	const today = dayjs().startOf('day');

	const totalExpired = tasks.filter(item => {
		if(!item.date) return false; // Nếu không có ngày tháng thì không tính là quá hạn
		return dayjs(item.date, APP_CONFIG.DATE_FORMAT).startOf('day').diff(today, "day") < 0;
	}).length;

	const totalUpcoming = tasks.filter(item => {
		if(!item.date) return false; // Nếu không có ngày tháng thì không tính là sắp hết hạn
		return dayjs(item.date, APP_CONFIG.DATE_FORMAT).startOf('day').diff(today, "day") > 0 && dayjs(item.date, APP_CONFIG.DATE_FORMAT).startOf('day').diff(today, "day") <= 2;
	}).length;

	return (
		<>
			<div className="wrapper">
				<section className="sec-todo-app">
					<div className="inner">
						<TodoHeading/>
						<TodoDashboard totalTask={totalTask} totalExpired={totalExpired} totalUpcoming={totalUpcoming} />
						<div className="todo-wrapper">
							<div className="todo-wrapper__left">
								<TodoPanelDate />
								<TodoProgress totalTask={totalTask} totalComplete={totalComplete} totalIncomplete={totalIncomplete} />
								<div className="todo-panel todo-form">
									<FormToto
										addNewTodo={addNewTodo} 
										taskEdited={taskEdited} 
										updateTodo={updateTodo} 
									/> {/*Truyền funtion từ cha -> con. Lưu ý: truyền func {addNewTodo} khác với thực thi func {addNewTodo()}*/}
								</div>
							</div>
							<div className="todo-wrapper__right">
								<div className="todo-panel todo-search">
									<SearchTodo 
										handleSearch={setSearchKeyword}
										filterProiority={filterProiority}
										filterStatus={filterStatus}
										setFilterPriority={setFilterPriority}
										setFilterStatus={setFilterStatus}
										setSortBy={setSortBy}
										sortBy={sortBy}
									/>
								</div>
								{filteredTasks.length > 0 ?
									<ListTodo
										tasks={filteredTasks}
										deleteTask={deleteTask}
										editTask={editTask}
										toogleComplete={toogleComplete}
									/>
									:
									<div className="empty">
										<img src={logoEmpty} alt="Empty" />
									</div>
								}
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}


export default TodoApp;