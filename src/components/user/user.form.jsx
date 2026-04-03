import { Input, Button, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { loadUser } = props;

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		resetAndCloseModal();
	};
	
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = async () => {
		const res = await createUserAPI(fullName, email, pass, phone);
		if (res.data) {
			notification.success({
				message: 'create user',
				description: 'Tao moi user thanh cong!'
			});
			resetAndCloseModal();
			loadUser();
		} else {
			notification.error({
				message: 'Error create user',
				description: JSON.stringify(res.message)
			})
		}
	}


	const resetAndCloseModal = () => {
		setIsModalOpen(false);
		setFullName('');
		setEmail('');
		setPass('');
		setPhone('');
	}
	

	return (
		<>
			<Button type="primary" onClick={showModal}>Create User</Button>
			<Modal title="Form Add User" maskClosable={false} open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} okText={"Create User"}>
				<div className='page-user__form'>
					<div className='page-user__form-wp'>
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
							<dt>Email</dt>
							<dd><Input placeholder="Email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/></dd>
						</dl>
						<dl>
							<dt>Password</dt>
							<dd><Input.Password placeholder="Password" type='password'
								value={pass}
								onChange={(event) => setPass(event.target.value)}
							/></dd>
						</dl>
						<dl>
							<dt>Phone Number</dt>
							<dd><Input placeholder="Phone Number"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/></dd>
						</dl>
						{/* <div className='page-user__form-btn'>
							<Button type="primary" onClick={handleClick}>Creat User</Button>
						</div> */}
					</div>
				</div>
			</Modal>
		</>
	)
}


export default UserForm;