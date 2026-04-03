import { Drawer } from 'antd';
const BookDetail = (props) => {
	const { openDetail, setOpenDetail, dataDetail } = props;

	return (
		<>
			{
				<Drawer title="Book Detail" className='book-detail' onClose={() => { setOpenDetail(false) }} open={openDetail} maskClosable={false}>
					{
						dataDetail ? <>
							<dl>
								<dt>ID</dt>
								<dd>{dataDetail._id}</dd>
							</dl>
							<dl>
								<dt>Title</dt>
								<dd>{dataDetail.mainText}</dd>
							</dl>
							<dl>
								<dt>Author</dt>
								<dd>{dataDetail.author}</dd>
							</dl>
							<dl>
								<dt>Price</dt>
								<dd>{dataDetail.price}</dd>
							</dl>
							<dl>
								<dt>Sold</dt>
								<dd>{dataDetail.sold}</dd>
							</dl>
							<dl>
								<dt>Quantity</dt>
								<dd>{dataDetail.quantity}</dd>
							</dl>
							<dl>
								<dt>Category</dt>
								<dd>{dataDetail.category}</dd>
							</dl>
							<dl>
								<dt>Thumbnail</dt>
								<dd><img src={`${import.meta.env.VITE_BACKEND_URL}images/book/${dataDetail.thumbnail}`} alt="test" /></dd>
							</dl>
						</> : <>
						<p>No data</p>
						</>
					}
				</Drawer>
			}
		</>
	)
}

export default BookDetail;