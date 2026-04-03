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
				<div className="todo-list">
					<TitleTodo />
					<SearchTodo 
						handleSearch={setSearchKeyword}
						filterProiority={filterProiority}
						filterStatus={filterStatus}
						setFilterPriority={setFilterPriority}
						setFilterStatus={setFilterStatus}
					/>
					<FormToto
						addNewTodo={addNewTodo} taskEdited={taskEdited} updateTodo={updateTodo} /> {/*Truyền funtion từ cha -> con. Lưu ý: truyền func {addNewTodo} khác với thực thi func {addNewTodo()}*/}
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


		</>
	)
}


export default TodoApp;