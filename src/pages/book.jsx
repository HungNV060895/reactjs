
import  BookTable  from '../components/book/book.table';
import { fetchAllBookAPI } from '../services/api.service';
import { useCallback, useEffect, useState } from 'react';
import CreateBook from '../components/book/book.form.uncontrolled';

const BookPage = () => {
	const [dataBooks, setDataBooks] = useState([]);
	const [current, setCurrent] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [total, setTotal] = useState(0);
	const [dataDetail, setDataDetail] = useState(null);
	const [dataUpdate, setDataUpdate] = useState(null);


	//state
	const [openDetail, setOpenDetail] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);

	const [loadingTable, setLoadingTable] = useState(false);

	//lifecycle react 
	useEffect(() => {
		loadBook();
	}, [current, pageSize])

	const loadBook = useCallback( async () => {
		setLoadingTable(true);
		const res = await fetchAllBookAPI(current, pageSize);
		if (res.data) {
			setDataBooks(res.data.result);
			setCurrent(res.data.meta.current);
			setPageSize(res.data.meta.pageSize);
			setTotal(res.data.meta.total);
		}
		setLoadingTable(false);
	}, [current, pageSize])
	
	return (
		<>
			<div className="page-book">
				<div className="inner">
					<div className="page-book__heading">
						<h1 className="page-book__heading-ttl">Book Store</h1>
					</div>
					<div className='page-book__main'>
						<CreateBook loadBook={loadBook} />
						<BookTable
							current={current}
							pageSize={pageSize}
							total={total}
							dataBooks={dataBooks}
							loadBook={loadBook}
							setPageSize={setPageSize}
							setCurrent={setCurrent}
							setTotal={setTotal}
							openDetail={openDetail}
							setOpenDetail={setOpenDetail}
							dataDetail={dataDetail}
							setDataDetail={setDataDetail}
							openUpdate={openUpdate}
							setOpenUpdate={setOpenUpdate}
							dataUpdate={dataUpdate}
							setDataUpdate={setDataUpdate}
							loadingTable={loadingTable}
							setLoadingTable={setLoadingTable}
						/>
					</div>
				</div>
			</div>
			
		</>
	)
}
export default BookPage;