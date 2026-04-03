import { Input, Button, Form, Checkbox, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const onFinish = async (values) => {
		const res = await registerUserAPI(
			values.fullName,
			values.email,
			values.password,
			values.phone
		);
		if (res.data) {
			notification.success({
				message: "Register User",
				description: "Dang ky thanh cong",
			})
			navigate('/login');
		} else {
			notification.error({
				message: "Error Register",
				description: JSON.stringify(res.message)
			})
		}
	}
	return (
		<>
			<div className='page-register'>
				<div className="inner">
					<h1 className="page-register__ttl">
						Register Page
					</h1>
					<div className="register-form">
						<Form
							form={form}
							name="basic"
							layout="vertical"
							onFinish={onFinish}
							// onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								label="Full name"
								name="fullName"
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Phone number"
								name="phone"
								rules={[
									{
										required: true,
										pattern: new RegExp(/\d+/g),
										message: "Wrong format!"
									}
								]}
							><Input /></Form.Item>
							<Form.Item name="remember" valuePropName="checked" label={null}>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Form.Item label={null}>
								<Button type="primary" htmlType="submit" onClick={()=> form.submit()}>
									Submit
								</Button>
							</Form.Item>
						</Form>
						<div className="has-acc">Đã có tài khoản <Link to="/login">Đăng nhập</Link></div>
					</div>
				</div>
			</div>

		</>
	)
}

export default RegisterPage;