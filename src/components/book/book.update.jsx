import { Modal, Input, Space, InputNumber, Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import { UpdateBookAPI, handleUploadFileAPI } from '../../services/api.service';



const UpdateBook = (props) => {
	const { openUpdate, setOpenUpdate, dataUpdate, setDataUpdate, loadBook } = props;


	const [id, setId] = useState();
	const [title, setTitle] = useState();
	const [author, setAuthor] = useState();
	const [price, setPrice] = useState();
	const [quantity, setQuantity] = useState();
	const [category, setCategory] = useState();
	const [preview, setPreview] = useState(null);

	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		if (dataUpdate && dataUpdate._id) {
			setId(dataUpdate._id);
			setTitle(dataUpdate.mainText);
			setAuthor(dataUpdate.author);
			setPrice(dataUpdate.price);
			setQuantity(dataUpdate.quantity);
			setCategory(dataUpdate.category);
			setPreview(`${import.meta.env.VITE_BACKEND_URL}images/book/${dataUpdate.thumbnail}`);
		}
	}, [dataUpdate]);
	

	const resetUpdateForm = () => {
		setId();
		setTitle();
		setAuthor();
		setPrice();
		setQuantity();
		setCategory();
		setPreview(null);
		setOpenUpdate(false);
		setDataUpdate();
	}

	const handleUploadFile = (event) => {
		if (!event.target.files || event.target.files.length === 0) {
			setSelectedFile(null);
			setPreview(null);
			return
		}
		// I've kept this example simple by using the first image instead of multiple
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setPreview(URL.createObjectURL(file));
		}
	}

	const handleSubmit = async () => {
		if (!selectedFile && !preview) {
			notification.error({
				message: "Loi upload anh",
				description: "Moi ban upload anh"
			})
			return;
		}


		let newThumbnail = "";
		if (!selectedFile && preview) {
			newThumbnail = dataUpdate.thumbnail;
		} else {
			const resUpload = await handleUploadFileAPI(selectedFile, "book");
			if (resUpload.data) {
				newThumbnail = resUpload.data.fileUploaded;
			} else {
				notification.error({
					message: "Loi upload file",
					description: JSON.stringify(resUpload.message)
				})
				return;
			}
		}

		const res = await UpdateBookAPI(id, title, author, price, quantity, category, newThumbnail);
		if (res.data) {
			resetUpdateForm();
			await loadBook();
			notification.success({
				message: 'Update sach',
				description: 'Cap nhat thanh cong'
			})
		} else {
			notification.error({
				message: 'Loi them moi',
				description: JSON.stringify(res.message)
			})
		}
	}
	return (
		<>
			<Modal title="Update Book"
				open={openUpdate}
				onOk={() => { handleSubmit() }}
				onCancel={() => {
					resetUpdateForm()
				}}
				okText={"Update Book"}
			>
				<div className='page-book__form'>
					<div className='page-book__form-wp'>
						{
							dataUpdate ?
								<>
									<dl>
										<dt>ID</dt>
										<dd><Input placeholder="Title" value={id} disabled /></dd>
									</dl>
									<dl>
										<dt>Title</dt>
										<dd><Input placeholder="Title" value={title} onChange={(event)=>{setTitle(event.target.value)}} /></dd>
									</dl>
									<dl>
										<dt>Author</dt>
										<dd><Input placeholder="Author" value={author} onChange={(event)=>{setAuthor(event.target.value)}}/></dd>
									</dl>
									<dl>
										<dt>Price</dt>
										<dd>
											<Space direction="vertical" style={{ width: "100%" }}>
												<InputNumber min='1' addonAfter="đ" defaultValue=""
													value={price}
													onChange={(event) => { setPrice(event.target.value) }} />
											</Space>
										</dd>
									</dl>
									<dl>
										<dt>Qty</dt>
										<dd>
											<Space direction="vertical" style={{ width: "100%" }}>
												<InputNumber min='1' defaultValue="" value={quantity}
													onChange={(event) => { setQuantity(event.target.value) }} />
											</Space>
										</dd>
									</dl>
									<dl>
										<dt>Category</dt>
										<dd>
											<Space wrap>
												<Select
													defaultValue={"Arts"}
													style={{
														width: 300,
													}}
													value={category}
													onChange={(value) => { setCategory(value) }}
													options={[
														{ value: 'Arts', label: 'Arts' },
														{ value: 'Business', label: 'Business' },
														{ value: 'Comics', label: 'Comics' },
														{ value: 'Cooking', label: 'Cooking' },
														{ value: 'Entertainment', label: 'Entertainment' },
														{ value: 'History', label: 'History' },
														{ value: 'Music', label: 'Music' },
														{ value: 'Sports', label: 'Sports' },
														{ value: 'Teen', label: 'Teen' },
														{ value: 'Travel', label: 'Travel' },
													]}
												/>
											</Space>
										</dd>
									</dl>
									<dl>
										<dt>Thumbnail</dt>
										<dd>
											<div className='change-file'>
												<label htmlFor="file">Upload</label>
												<input type="file" id='file' hidden
													onChange={(event) => handleUploadFile(event)}
													onClick={(event) => event.target.value = null}
												/>
											</div>
											<div className='file-prev'>
												{
													preview &&
													<>
														<img src={preview} alt="" />
													</>
												}
											</div>
										</dd>
									</dl>
								</>
								: <>
									<p>No data</p>
								</>
						}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default UpdateBook;