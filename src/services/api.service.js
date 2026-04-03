// import axios from 'axios';
import axios from "./axios.custom";

const createUserAPI = (fullName, email, pass, phone) => {
	const URL_BACKEND = '/api/v1/user';
	const data = {
		fullName: fullName,
		email: email,
		password: pass,
		phone: phone
	};
	return axios.post(URL_BACKEND, data);
}


const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
	const URL_BACKEND = '/api/v1/book';
	const data = {
		mainText: mainText,
		author: author,
		price: price,
		quantity: quantity,
		category: category,
		thumbnail: thumbnail
	};
	return axios.post(URL_BACKEND, data);
}

const UpdateUserAPI = (_id, fullName, phone) => {
	const URL_BACKEND = '/api/v1/user';
	const data = {
		_id: _id,
		fullName: fullName,
		phone: phone
	}
	return axios.put(URL_BACKEND, data);
}

const UpdateBookAPI = (_id, mainText, author, price, quantity, category, thumbnail) => {
	const URL_BACKEND = '/api/v1/book';
	const data = {
		_id: _id,
		mainText: mainText,
		author: author,
		price: price,
		quantity: quantity,
		category: category,
		thumbnail: thumbnail
	}
	return axios.put(URL_BACKEND, data);
}

const DeleteUserAPI = (_id) => {
	const URL_BACKEND = `/api/v1/user/${_id}`;
	return axios.delete(URL_BACKEND);
}

const DeleteBookAPI = (_id) => {
	const URL_BACKEND = `/api/v1/book/${_id}`;
	return axios.delete(URL_BACKEND);
}


const fetchAllUserAPI = (current, pageSize) => {
	const URL_BACKEND = `/api/v1/user/?current=${current}&pageSize=${pageSize}`;
	
	return axios.get(URL_BACKEND);
}


const fetchAllBookAPI = (current, pageSize) => {
	const URL_BACKEND = `/api/v1/book/?current=${current}&pageSize=${pageSize}`;
	
	return axios.get(URL_BACKEND);
}


const handleUploadFileAPI = (file, folder) => {
	const URL_BACKEND = '/api/v1/file/upload';
	const bodyFormData = new FormData();
	bodyFormData.append("fileImg", file);
	let config = {
		headers: {
			"upload-type": folder,
			"Content-Type": "multipart/form-data"
		}
	}
	return axios.post(URL_BACKEND, bodyFormData ,config);
}


const UpdateUserAvatarAPI = (avatar, _id, fullname, phone) => {
	const URL_BACKEND = '/api/v1/user';
	const data = {
		_id: _id,
		avatar: avatar,
		fullName: fullname,
		phone: phone
	}
	return axios.put(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, pass, phone) => {
	const URL_BACKEND = '/api/v1/user/register';
	const data = {
		fullName: fullName,
		email: email,
		password: pass,
		phone: phone
	};
	return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, pass) => {
	const URL_BACKEND = '/api/v1/auth/login';
	const data = {
		username: email,
		password: pass,
		delay: 2000
	};
	return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
	const URL_BACKEND = '/api/v1/auth/account';
	return axios.get(URL_BACKEND);
}


const logoutAPI = () => {
	const URL_BACKEND = '/api/v1/auth/logout';
	return axios.post(URL_BACKEND);
}

export {
	createUserAPI, UpdateUserAPI, fetchAllUserAPI, DeleteUserAPI, handleUploadFileAPI,
	UpdateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI, logoutAPI,
	fetchAllBookAPI, createBookAPI, UpdateBookAPI, DeleteBookAPI
}