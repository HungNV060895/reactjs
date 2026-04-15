import { Card, Button, Row, Col, Typography, message, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/constants/product.constant';

const { Title, Text } = Typography;

const ProductList = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    const handleViewProduct = (productId) => {
        // Xử lý khi người dùng nhấn vào sản phẩm
        navigate(`/product/${productId}`);
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} className="product-ttlsub">Danh sách sản phẩm</Title>
            <Row gutter={[16, 16]}>
                {MOCK_PRODUCTS.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                        <Card
                            hoverable
                            onClick={() => handleViewProduct(product._id)}
                            cover={<img alt={product.name} src={product.image} style={{ height: 200, objectFit: 'contain', padding: 10 }} />}
                            actions={[
                                <Button 
                                    type="primary" 
                                    icon={<ShoppingCartOutlined />} 
                                    onClick={(e) =>{
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }
                                }
                                >
                                    Thêm vào giỏ
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{product.name}</span>
                                        <Tag color="green">{product.category}</Tag>
                                    </div>
                                }
                                description={
                                    <>
                                        <Text type="secondary" ellipsis>{product.description}</Text>
                                        <div style={{ marginTop: 8, color: '#ff4d4f', fontWeight: 'bold', fontSize: '16px' }}>
                                            {product.price.toLocaleString('vi-VN')} đ
                                        </div>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductList;