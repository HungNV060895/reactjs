
import { Button, Modal, Form, Input, InputNumber, Space, Select, notification, message } from 'antd';
import { useState } from 'react';
import { handleUploadFileAPI, createBookAPI } from '../../services/api.service';

const { Option } = Select;

const CreateBook = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formCreateBook] = Form.useForm();

	const [preview, setPreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);


    const { loadBook } = props;
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


    const resetFormBook = () => {
        formCreateBook.resetFields();
        setIsModalOpen(false);
        setSelectedFile(null);
        setPreview(null);
    }

    const onFinish = async (values) => {
        
        if (!selectedFile) {
            notification.error({
                message: 'Loi upload file',
                description: "Upload file di ban ei!"
            })
            return;
        }
        const resUpload = await handleUploadFileAPI(selectedFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            const res = await createBookAPI(values.title, values.author, +values.price, +values.quantity, values.category, thumbnail);
            if (res.data) {
                notification.success({
                    message: 'Them moi book',
                    description: "Thanh cong ban ei!"
                })
                resetFormBook();
                loadBook();
            } else {
                notification.success({
                    message: 'Them moi book',
                    description: JSON.stringify(message.error)
                })
            }
        }
    }
    return (
        <>
            <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Add Book</Button>
            <Modal title="Create Book Uncontrolled"
                open={isModalOpen}
                onOk={() => { formCreateBook.submit() }}
                onCancel={() => { setIsModalOpen(false); formCreateBook.resetFields() }}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    form={formCreateBook}
                    onFinish={onFinish}
                >
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
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <InputNumber min='1' addonAfter="đ" defaultValue="" />
                        </Space>
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
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <InputNumber min='1' defaultValue="" />
                        </Space>
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
                            onChange={(value) =>{value}}
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
            </Modal>
        </>
    )
}

export default CreateBook;