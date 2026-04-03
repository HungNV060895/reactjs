import { Table, Space, Popconfirm, notification} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from "./update.user";
import { useState } from "react";
import DetailUser from "./detail.user";
import { DeleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {

	const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
	const [dataUpdate, setDataUpdate] = useState(null);
	const [dataDetail, setDataDetail] = useState(null);

	const [isOpen, setIsOpen] = useState(false);


	const columns = [
		{
			title: "STT",
			render: (_, data, index) => {
				return (
					<>
						{(index + 1) + (current - 1)*pageSize}
					</>
				)
			}
		},
		{
			title: 'ID',
			dataIndex: '_id',
			render: (_, data) =>  {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(data);
                            setIsOpen(true);
                        }}
                    >{data._id}</a>
                )
            }
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, data) => (
				<Space size="middle">
					<a><EditOutlined onClick={() => {
						setDataUpdate(data);
						setIsModalUpdateOpen(true);
					}} /></a>
					
					<Popconfirm
							placement="left"
							title={'Xoa User'}
							description={'Co xoa User khong?'}
							okText="Yes"
							cancelText="No"
						onConfirm={() => { handleDeleteUser(data._id) }}
						>
							<DeleteOutlined />
					</Popconfirm>
				</Space>
			),
		},
	];

	const handleDeleteUser = async(id) => {
		const res = await DeleteUserAPI(id);
		if (res.data) {
			notification.success({
				message: 'xoa user',
				description: 'xoa thanh cong!'
			});
			await loadUser();
		} else {
			notification.error({
				message: 'Error xoa user',
				description: JSON.stringify(res.message)
			})
		}
	}

	const onChange = (pagination, lters, sorter, extra) => {
		//nếu thay đổi trang: current
		if (pagination && pagination.current) {
			if (+pagination.current !== +current) {
				setCurrent(+pagination.current); //"5" => 5 (dấu + sẽ convert string sang number)
			}
		}

		//nếu thay đổi tổng số phần tử: pageSize
		if (pagination && pagination.pageSize) {
			if (+pagination.pageSize !== +pageSize) {
				setPageSize(+pagination.pageSize); //"5" => 5 (dấu + sẽ convert string sang number)
			}
		}
	}
	
	return (
		<>
			<UpdateUserModal
				isModalUpdateOpen={isModalUpdateOpen}
				setIsModalUpdateOpen={setIsModalUpdateOpen}
				dataUpdate={dataUpdate}
				setDataUpdate={setDataUpdate}
				loadUser={loadUser}
			/>
			<DetailUser
				setIsOpen={setIsOpen}
				isOpen={isOpen}
				dataDetail={dataDetail}
				setDataDetail={setDataDetail} loadUser={loadUser} />
			<Table
				dataSource={dataUsers}
				columns={columns}
				rowKey={"_id"}
				pagination={
					{
						current: current,
						pageSize: pageSize,
						showSizeChanger: true,
						total: total,
						showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
					}
				}
				onChange={onChange}
			/>;
		</>
	)
}

export default UserTable;