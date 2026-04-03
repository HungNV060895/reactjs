import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import BookDetail from "./book.detail";
import UpdateBookUnconrolled from "./book.update.uncontrolled";
import { DeleteBookAPI } from "../../services/api.service";


const BookTable = (props) => {
	const { dataBooks, current, pageSize, total, setCurrent, setPageSize, openDetail, setOpenDetail, dataDetail, setDataDetail,
		openUpdate, setOpenUpdate, dataUpdate, setDataUpdate, loadBook, loadingTable } = props;
	
	const handleDeleteBook = async(id) => {
		const res = await DeleteBookAPI(id);
		if (res.data) {
			notification.success({
				message: "Xoa book",
				description: "Xoa book thanh cong"
			})
			loadBook();
		} else {
			notification.error({
				message: "Loi xoa book",
				description: JSON.stringify(res.message)
			})
		}
	}
	const columns = [
		{
			title: 'STT',
			dataIndex: 'stt',
			key: 'stt',
			render: (_, data, index) => {
				return (
					<>
						{(index + 1) + (current - 1) * pageSize}
					</>
				)
			}
		},
		{
			title: 'ID',
			dataIndex: '_id',
			render: (_, data) => {
				return (
					<>
						<a href="#" onClick={() => {
							setOpenDetail(true)
							setDataDetail(data)
						}}>{data._id}</a>
					</>
				)
			}
		},
		{
			title: 'Title',
			dataIndex: 'mainText',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: (_, data) => {
				return (
					<>
						{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
					</>
				)
			}
		},
		{
			title: 'QTY',
			dataIndex: 'quantity',
		},
		{
			title: 'Author',
			dataIndex: 'author',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, data) => (
				<>
					<div className="box-action">
						<a href="#" onClick={() => {
							setOpenUpdate(true)
							setDataUpdate(data)
						}}><EditOutlined /></a>
						<Popconfirm
							placement="left"
							title={'Xoa User'}
							description={'Co xoa User khong?'}
							okText="Yes"
							cancelText="No"
							onConfirm={() => { handleDeleteBook(data._id) }}
						>
							<DeleteOutlined />
						</Popconfirm>
					</div>
				</>
			)
		},
	];


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
			<BookDetail openDetail={openDetail} setOpenDetail={setOpenDetail} dataDetail={dataDetail} />
			<UpdateBookUnconrolled openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} loadBook={loadBook} />
			<Table
				rowKey={"_id"}
				dataSource={dataBooks} columns={columns}
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
				loading={loadingTable}
			/>;
		</>
	)
}
export default BookTable;