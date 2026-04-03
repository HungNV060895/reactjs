import { Button, Modal, Form, Input, InputNumber, Space, Select, notification, message } from 'antd';
import { useEffect, useState } from 'react';
import { handleUploadFileAPI, UpdateBookAPI } from '../../services/api.service';
const { Option } = Select;


const UpdateBookUnconrolled = (props) => {
    const { openUpdate, setOpenUpdate, dataUpdate, setDataUpdate, loadBook } = props;
    const [preview, setPreview] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [ formUpdate ] = Form.useForm();

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            formUpdate.setFieldsValue({
                id: dataUpdate._id,
                title: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

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

    const resetUpdateForm = () => {
        formUpdate.resetFields();
        setOpenUpdate(false);
		setDataUpdate();
	}
    
    const onFinish = async (values) => {
        if (!selectedFile && !preview) {
            notification.error({
                message: 'Loi upload file',
                description: 'Ban chua upload file'
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
        

        const { id, title, author, price, quantity, category } = values;
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
                onOk={() => {
                    formUpdate.submit();
                }}
                onCancel={() => {
                    setOpenUpdate(false)
                }}
                okText={"Update Book"}
            >
                <div className='page-book__form'>
                    <div className='page-book__form-wp'>
                        {
                            dataUpdate ?
                                <>
                                    <Form
                                        name="basic"
                                        layout="vertical"
                                        form={formUpdate}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="id"
                                            label="ID"
                                        ><Input disabled /></Form.Item>
                                        <Form.Item
                                            name="title"
                                            label="Title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Title khong duoc de trong"
                                                },
                                            ]}
                                        ><Input /></Form.Item>
                                        <Form.Item
                                            name="author"
                                            label="Author"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Author khong duoc de trong"
                                                },
                                            ]}
                                        ><Input /></Form.Item>
                                        <Form.Item
                                            name="price"
                                            label="Price"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Price khong duoc de trong"
                                                },
                                            ]}
                                        >
                                            <InputNumber min='1' addonAfter="đ" defaultValue="" />
                                        </Form.Item>
                                        <Form.Item
                                            name="quantity"
                                            label="Quantity"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Quantity khong duoc de trong"
                                                },
                                            ]}
                                        >
                                            <InputNumber min='1' defaultValue="" />
                                        </Form.Item>
                                        <Form.Item
                                            name="category"
                                            label="Category"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Select a option and change input text above"
                                                onChange={(value) => { value }}
                                                allowClear
                                            >
                                                <Option value="Arts">Arts</Option>
                                                <Option value="Business">Business</Option>
                                                <Option value="Comics">Comics</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="thumnail"
                                            label="Thumbnail"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div className='change-file'>
                                                <label htmlFor="file">Upload</label>
                                                <Input type="file" id='file' hidden style={{ opacity: "0" }}
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
                                        </Form.Item>
                                    </Form>
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

export default UpdateBookUnconrolled;