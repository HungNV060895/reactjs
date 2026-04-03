import { Input, notification, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { UpdateUserAPI } from '../../services/api.service';

const UpdateUserModal = (props) => {
	const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

	const [fullName, setFullName] = useState("");
	const [id, setId] = useState("");
	const [phone, setPhone] = useState("");

	//next dataUpdate != prev dataUpdate
	useEffect(() => {
		if (dataUpdate) {
			setFullName(dataUpdate.fullName);
			setId(dataUpdate._id);
			setPhone(dataUpdate.phone);
		}
	}, [dataUpdate]);
	
	const handleSubmit = async () => {
		const res = await UpdateUserAPI(id, fullName, phone);
		if (res.data) {
			notification.success({
				message: 'update user',
				description: 'Cap nhat user thanh cong!'
			});
			resetAndCloseModal();
			loadUser();
		} else {
			notification.error({
				message: 'Error update user',
				description: JSON.stringify(res.message)
			})
		}
	}
	

	const handleCancel = () => {
		setIsModalUpdateOpen(false);
		resetAndCloseModal();
	};


	const resetAndCloseModal = () => {
		setIsModalUpdateOpen(false);
		setFullName('');
		setId('');
		setPhone('');
		//setDataUpdate = null để cho dataUpdate != với dataUpdate ở trên chỗ useEffect() ==> react sẽ chạy lại hook useEffect
		setDataUpdate(null);
	}
	return (
		<>
			<Modal title="Form Update User" maskClosable={false} open={isModalUpdateOpen} onOk={handleSubmit} onCancel={handleCancel} okText={"Update User"}>
				<div className='page-user__form'>
					<div className='page-user__form-wp'>
					<dl>
							<dt>ID</dt>
							<dd><Input placeholder="ID" disabled
								value={id}
								onChange={(event) => setId(event.target.value)}
							/></dd>
						</dl>
						<dl>
							<dt>Full Name</dt>
							<dd><Input placeholder="Full Name"
								value={fullName}
								onChange={(event) => {
									setFullName(event.target.value);
								}}
							/></dd>
						</dl>
						<dl>
							<dt>Phone Number</dt>
							<dd><Input placeholder="Phone Number"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/></dd>
						</dl>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default UpdateUserModal;