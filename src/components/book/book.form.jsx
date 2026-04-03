import { Modal, Button, Input, Space, InputNumber, Select, notification } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFileAPI } from '../../services/api.service';



const CreateBook = (props) => {
	const { loadBook } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [title, setTitle] = useState();
	const [author, setAuthor] = useState();
	const [price, setPrice] = useState();
	const [quantity, setQuantity] = useState();
	const [category, setCategory] = useState();
	const [thumbnail, setThumbnail] = useState();

	const [preview, setPreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

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

	const handleReset = () => {
		setTitle('');
		setAuthor('');
		setPrice('');
		setQuantity('');
		setCategory('');
		setSelectedFile(null);
		setPreview(null);
		setIsModalOpen(false);
	}

	const handleCreate = async () => {

		//check upload file
		if (!selectedFile) {
			notification.error({
				message: "Loi upload file",
				description: "Ban chua upload file"
			})
			return;
		}

		const resUpload = await handleUploadFileAPI(selectedFile, "book");
		if (resUpload.data ) {
			const thumbnail = resUpload.data.fileUploaded;
			const res = await createBookAPI(title, author, price, quantity, category, thumbnail);
			if (res.data) {
				notification.success({
					message: 'Them moi sach',
					description: 'Them moi thanh cong'
				})
				handleReset();
				loadBook();
			} else {
				notification.error({
					message: 'Loi them moi',
					description: JSON.stringify(res.message)
				})
			}
		}
	}

	
	return (
		<>

			<Button type="primary" onClick={() => { setIsModalOpen(true) }}>Add Book</Button>
			<Modal title="Create Book"
				open={isModalOpen}
				onOk={() => { handleCreate() }}
				onCancel={() => {
					setIsModalOpen(false)
					handleReset()
				}}
				okText={"Create Book"}
			>
				<div className='page-book__form'>
					<div className='page-book__form-wp'>
						<dl>
							<dt>Title</dt>
							<dd><Input placeholder="Title" value={title} onChange={(event) => { setTitle(event.target.value) }} /></dd>
						</dl>
						<dl>
							<dt>Author</dt>
							<dd><Input placeholder="Author" value={author} onChange={(event) => { setAuthor(event.target.value) }} /></dd>
						</dl>
						<dl>
							<dt>Price</dt>
							<dd>
								<Space direction="vertical" style={{ width: "100%" }}>
									<InputNumber min='1' addonAfter="đ" defaultValue="" value={price} onChange={(value)=>{setPrice(value)}} />
								</Space>
							</dd>
						</dl>
						<dl>
							<dt>Qty</dt>
							<dd>
								<Space direction="vertical" style={{ width: "100%" }}>
									<InputNumber min='1' defaultValue="" value={quantity} onChange={(value)=>{setQuantity(value)}} />
								</Space>
							</dd>
						</dl>
						<dl>
							<dt>Category</dt>
							<dd>
								<Space wrap>
									<Select
										defaultValue={'Arts'}
										style={{
											width: 300,
										}}
										onChange={(value)=> {setCategory(value)}}
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
					</div>
				</div>
			</Modal>
		</>
	)
}

export default CreateBook;