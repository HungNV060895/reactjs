import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message, Badge, Avatar } from 'antd';
import {
	UsergroupAddOutlined, LoginOutlined,
	HomeOutlined, AuditOutlined, AliwangwangOutlined, SunOutlined,
	ProductOutlined, LogoutOutlined, ShoppingCartOutlined
} from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
import { useCart } from '../context/cart.context';
import CartDrawer from '../product/cart.drawer';

const Header = () => {
	const [current, setCurrent] = useState('');
	const [isCartOpen, setIsCartOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const { user, setUser } = useContext(AuthContext);
	const { totalQuantity } = useCart();

	useEffect(() => {
		if (location && location.pathname) {
			const allRouters = ['user', 'book', 'weather', 'product'];
			const currentRouter = allRouters.find(item => location.pathname.startsWith(`/${item}`));
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
			label: <Link to={"/weather"}>Weather</Link>,
			key: 'weather',
			icon: <SunOutlined />
		},
		{
			label: (
				<Link to={"/product"}>
					Product
				</Link>
			),
			key: 'product',
			icon: <ProductOutlined />
		},
		
		// {
		// 	label: <Link to={"/book"}>Books</Link>,
		// 	key: 'book',
		// 	icon: <AuditOutlined />,
		// },
		// ...(!user.id ? [{
		// 	label: <Link to={"/login"}>Đăng nhập</Link>,
		// 	key: 'login',
		// 	icon: <LoginOutlined />,
		// }] : []),


		// ...(user.id ? [{
		// 	label: `Welcome ${user.fullName}`,
		// 	key: 'setting',
		// 	icon: <AliwangwangOutlined />,
		// 	children: [
		// 		{
		// 			label: <span onClick={()=>handleLogout()}>Đăng xuất</span>,
		// 			key: 'logout',
		// 			icon: <LogoutOutlined />
		// 		},
		// 	],
		// }] : []),
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
			
			<div 
				className='icon-cart' 
				onClick={() => setIsCartOpen(true)} 
				style={{ cursor: 'pointer', padding: '0 20px', display: 'flex', alignItems: 'center' }}
			>
				<Badge count={totalQuantity} showZero color="#1677ff">
					<Avatar shape="circle" size="large" icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#f5f5f5', color: '#1677ff' }} />
				</Badge>
			</div>

			<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}

export default Header;

