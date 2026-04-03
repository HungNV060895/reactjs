import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
    const error = useRouteError();

	return (
		<>
			<Result
				status="500"
				title="Opps!"
				subTitle={error.statusText || error.message}
				extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
			/>
		</>
    );
}