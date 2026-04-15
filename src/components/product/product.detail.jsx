import { useParams } from "react-router-dom";
import { Card, Button, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
    const { productId } = useParams();
    return (
        <div className="wrapper">
            <section className="sec-product">
                <div className="inner">
                    <h1>Product Detail: {productId}</h1>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail;