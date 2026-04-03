
import { Drawer, Button, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFileAPI, UpdateUserAvatarAPI } from '../../services/api.service';

const DetailUser = (props) => {
	const { isOpen, setIsOpen, dataDetail, setDataDetail, loadUser } = props;
	const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null)

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

	const handleUploadAvatar = async() => {
		const resUpload = await handleUploadFileAPI(selectedFile, "avatar");
		if (resUpload.data) {
			//success
			const newAvatar = resUpload.data.fileUploaded;
			const resUpdateAvatar = await UpdateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
			if (resUpdateAvatar.data) {
				setIsOpen(false);
				setSelectedFile(null);
				setPreview(null);
				await loadUser();
				notification.success({
					message: "Update Avatar",
					description: "Update Avatar Thanh Cong",
				})
			} else {
				notification.error({
					message: "Error Upload",
					description: JSON.stringify(resUpdateAvatar.message)
				})
			}
		} else {
			notification.error({
				message: "Error Upload",
				description: JSON.stringify(resUpload.message)
			})
		}
	}

	return (
		<Drawer title="Information Detail" onClose={() => { setDataDetail(null); setIsOpen(false);}} open={isOpen} className='info-detail'>
			{dataDetail ? <>
				<dl>
					<dt>ID</dt>
					<dd>{ dataDetail._id }</dd>
				</dl>
				<dl>
					<dt>Full Name</dt>
					<dd>{ dataDetail.fullName }</dd>
				</dl>
				<dl>
					<dt>Email</dt>
					<dd>{ dataDetail.email }</dd>
				</dl>
				<dl>
					<dt>Phone</dt>
					<dd>{ dataDetail.phone }</dd>
				</dl>
				<div className='box-avatar'>
					<img src={`${import.meta.env.VITE_BACKEND_URL}images/avatar/${dataDetail.avatar}`} alt={ dataDetail.fullName } />
				</div>
				<div className='change-file'>
					<label htmlFor="file">Upload Avatar</label>
					<input type="file" id='file' hidden onChange={(event) => handleUploadFile(event)}/>
				</div>
				<div className='file-prev'>
					{
						preview && 
						<>
							<img src={preview} alt="" />
							<Button type='primary' onClick={()=> handleUploadAvatar()}>Upload</Button>
						</>
					}
				</div>
			</> :
			<>
				<p>Not found</p>
			</>
			}
		</Drawer>
	)
}

export default DetailUser;