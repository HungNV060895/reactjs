import UserTable from "../components/user/user.table";
import UserForm from "../components/user/user.form";
import { useState, useEffect } from "react";
import { fetchAllUserAPI } from "../services/api.service";

const UserPage = () => {
	const [dataUsers, setDataUsers] = useState([]);

	const [current, setCurrent] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [total, setTotal] = useState(0);

	//mảng rỗng thì useEffect sẽ chỉ chạy 1 lần
	//khi có phần từ trong mảng thì useEffect sẽ chạy mảng rỗng [] + điều kiện (phần từ trong mảng)
	useEffect(() => {
		loadUser();
	}, [current, pageSize]); {/*Khi current, hoặc pageSize thay đổi thì loadUser sẽ thay đổi*/}

	const loadUser = async () => {
		const res = await fetchAllUserAPI(current, pageSize);
		if (res.data) {
			setDataUsers(res.data.result); //data.result => result nằm trong data
			setCurrent(res.data.meta.current);
			setPageSize(res.data.meta.pageSize);
			setTotal(res.data.meta.total);
		}
	}
	// console.log(">>>check pageSize", pageSize);
	return (
		<>
			<div className="page-user">
				<div className="inner">
					<UserForm loadUser={loadUser} />
					<h2 className="page-user__ttl">Manager User Page</h2>
					<div className="page-user__table">
						{/* lift-up state */}
						<UserTable
							dataUsers={dataUsers}
							loadUser={loadUser}
							current={current}
							pageSize={pageSize}
							total={total}
							setCurrent={setCurrent}
							setPageSize={setPageSize}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserPage;