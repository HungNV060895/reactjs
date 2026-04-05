import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
	UsergroupAddOutlined, LoginOutlined,
	HomeOutlined, AuditOutlined, AliwangwangOutlined, SunOutlined,
	ProductOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
	const [current, setCurrent] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	const { user, setUser } = useContext(AuthContext);

	useEffect(() => {
		if (location && location.pathname) {
			const allRouters = ['user', 'book', 'weather', 'product'];
			const currentRouter = allRouters.find(item => `/${item}` === location.pathname);
			if (currentRouter) {
				setCurrent(currentRouter);
			} else {
				setCurrent('home');
			}
		}
	}, [location])

	const onClick = (e) => {
		setCurrent(e.key);
	};

	const handleLogout = async() => {
		const res = await logoutAPI();
		if (res.data) {
			//clear data
			localStorage.removeItem('access_token');
			setUser({
				email: "",
				phone: "",
				fullName: "",
				role: "",
				avatar: "",
				id: "",
			})
			message.success('Logout thanh cong');
			// navigate('/');
		}
	}

	const items = [
		{
			label: <Link to={"/"}>Home</Link>,
			key: 'home',
			icon: <HomeOutlined />,
		},
		{
			label: <Link to={"/user"}>Users</Link>,
			key: 'user',
			icon: <UsergroupAddOutlined />
		},
		{
			label: <Link to={"/weather"}>Wheather</Link>,
			key: 'weather',
			icon: <SunOutlined />
		},
		{
			label: <Link to={"/product"}>Product</Link>,
			key: 'product',
			icon: <ProductOutlined />
		},
		{
			label: <Link to={"/book"}>Books</Link>,
			key: 'book',
			icon: <AuditOutlined />,
		},
		...(!user.id ? [{
			label: <Link to={"/login"}>Đăng nhập</Link>,
			key: 'login',
			icon: <LoginOutlined />,
		}] : []),


		...(user.id ? [{
			label: `Welcome ${user.fullName}`,
			key: 'setting',
			icon: <AliwangwangOutlined />,
			children: [
				{
					label: <span onClick={()=>handleLogout()}>Đăng xuất</span>,
					key: 'logout',
				},
			],
		}] : []),
	];

	return (
		<header id='main-header'>
			<div className="inner">
				<Menu
					onClick={onClick}
					selectedKeys={[current]}
					mode="horizontal"
					items={items}
				/>
			</div>
		</header>
	)
}

export default Header;