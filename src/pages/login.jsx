import { Input, Button, Form, Checkbox, notification, Divider, message } from "antd";
import { loginAPI } from "../services/api.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";


const LoginPage = () => {
	const [formLogin] = Form.useForm();
	const navigate = useNavigate();
	const [isDone, setIsDone] = useState(false);

	const { setUser } = useContext(AuthContext);

	const onFinish = async (values) => {
		setIsDone(true)
		const res = await loginAPI(
			values.email,
			values.password,
		);
		if (res.data) {
			message.success('Dang nhap thanh cong')
			localStorage.setItem("access_token", res.data.access_token);
			setUser(res.data.user);
			navigate('/');
		} else {
			notification.error({
				message: "Error Register",
				description: JSON.stringify(res.message)
			})
		}
		setIsDone(false)
	}
    return (
        <>
            <div className='page-register'>
				<div className="inner">
					<h1 className="page-register__ttl">
						Login
					</h1>
					<div className="register-form">
						<Form
							form={formLogin}
							name="basic"
							layout="vertical"
							onFinish={onFinish}
							// onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
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
							<Form.Item name="remember" valuePropName="checked" label={null}>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Form.Item label={null}>
								<Button loading={isDone} type="primary" htmlType="submit">
									Login
								</Button>
							</Form.Item>
						</Form>
						<Divider />
							<Link to={'/'}>Trở về trang chủ</Link>
							<div className="has-acc">Chưa có tài khoản <Link to="/register">Đăng ký ngay</Link></div>
					</div>
				</div>
			</div>
        </>
    )
}

export default LoginPage;