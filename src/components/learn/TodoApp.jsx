import TitleTodo from "./TitleComponent";
import FormToto from "./FormComponent";
import ListTodo from "./ListComponent";
import SearchTodo from "./SearchComponent";
import logoEmpty from './../../assets/img/empty.png';
import { useEffect, useState } from "react";

const TodoApp = () => {
	const [tasks, setTask] = useState(() => {
		const saved = localStorage.getItem('tasks');
		return saved ? JSON.parse(saved) : [];
	});
	const [taskEdited, setTaskEdited] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [filterProiority, setFilterPriority] = useState('all'); //all, low, medium, high
	const [filterStatus, setFilterStatus] = useState('all'); //all, complete, incomplete

	const randomIntFromInterval = (min, max) => { // min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const addNewTodo = (name, priority, date) => {
		const newTask = {
			id: randomIntFromInterval(1, 1000000),
			name: name,
			complete: false,
			priority: priority,
			date: date
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


	useEffect(() => {
		const saved = localStorage.getItem('tasks');
		if (saved) setTask(JSON.parse(saved));
	}, []);

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
			setTaskEdited({ ...currentTask, priority, date });
		}
	}


	//Hàm này sẽ được truyền vào FormToto để khi click vào nút Add (khi đang chỉnh sửa) sẽ gọi hàm này và tìm ra task cần chỉnh sửa dựa vào id, sau đó cập nhật lại tên task đó và setTaskEdited(null) để reset form về trạng thái thêm mới
	const updateTodo = (id, newName, newPriority, newDate) => {
		const newTask3 = tasks.map(item => {
			if (item.id === id) {
				return { ...item, name: newName, priority: newPriority, date: newDate };
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
	);
	//console.log(filterProiority, filterStatus);
	return (
		<>
			<div className="wrapper">
				<section className="sec-todo-app">
					<div className="inner">
						<div className="todo-heading">
							<div className="todo-heading__left">
								<p className="todo-heading__greeting">Xin chào, hôm nay là</p>
								<p className="todo-heading__date">
									Thứ Sáu, <span>03/04/2026</span>
								</p>
							</div>
							<div className="todo-heading__right">VH</div>
						</div>
						<ul class="todo-dashboard">
							<li class="todo-dashboard__item	todo-dashboard__item--primary">
								<div class="todo-dashboard__item-ttl">Tổng task</div>
								<div class="todo-dashboard__item-num">7</div>
							</li>
							<li class="todo-dashboard__item todo-dashboard__item--secondary">
								<div class="todo-dashboard__item-ttl">Sắp hết hạn</div>
								<div class="todo-dashboard__item-num">2</div>
							</li>
							<li class="todo-dashboard__item todo-dashboard__item--danger">
								<div class="todo-dashboard__item-ttl">Quá hạn</div>
								<div class="todo-dashboard__item-num">1</div>
							</li>
						</ul>
						<div className="todo-wrapper">
							<div className="todo-wrapper__left">
								<div className="todo-panel date-panel">
									<div class="date-panel__label">Ngày hôm nay</div>
									<div class="date-panel__big">03<br/>Tháng 4</div>
									<div class="date-panel__sub">Thứ Sáu, 2026</div>
								</div>
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
									/>
								</div>
								<div className="todo-list">
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
					</div>
				</section>
			</div>
		</>
	)
}


export default TodoApp;