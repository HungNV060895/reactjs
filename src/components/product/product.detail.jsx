import { useParams, Link } from "react-router-dom";
import { Card, Button, Typography, Row, Col, Tag, Breadcrumb, Empty } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useCart } from "../context/cart.context";

const { Title, Text, Paragraph } = Typography;

const ProductDetail = ({products}) => {
    const { productId } = useParams();
    const { addToCart } = useCart();

    // Tìm sản phẩm trong danh sách dựa vào ID trên URL
    const product = products?.find(p => p._id === productId);

    if (!product) {
        return (
            <div className="inner" style={{ padding: '50px 0', textAlign: 'center' }}>
                <Empty description="Không tìm thấy sản phẩm" />
                <Link to="/product"><ArrowLeftOutlined /> Quay lại danh sách</Link>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <section className="sec-product">
                <div className="inner">
                    <Breadcrumb items={[{ title: <Link to="/product">Sản phẩm</Link> }, { title: product.name }]} style={{ margin: '16px 0' }} />
                    
                    <Card bordered={false}>
                        <Row gutter={[40, 40]}>
                            <Col xs={24} md={10}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
                            </Col>
                            <Col xs={24} md={14}>
                                <Tag color="blue">{product.category}</Tag>
                                <Title level={2}>{product.name}</Title>
                                <Title level={3} type="danger">
                                    {product.price.toLocaleString('vi-VN')} đ
                                </Title>
                                <Paragraph style={{ fontSize: 16 }}>{product.description}</Paragraph>
                                <div style={{ marginTop: 32 }}>
                                    <Button type="primary" size="large" icon={<ShoppingCartOutlined />} onClick={() => addToCart(product)}>Thêm vào giỏ hàng</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail;