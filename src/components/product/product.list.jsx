import { Card, Button, Row, Col, Typography, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const { Title, Text } = Typography;

// Dữ liệu mẫu (Mock data) tuân theo cấu trúc Product đã thiết kế
const MOCK_PRODUCTS = [
    {
        _id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Titan tự nhiên, chip A17 Pro siêu mạnh mẽ.',
        price: 34990000,
        category: 'Phone',
        image: 'https://placehold.jp/226x220.png',
        stock: 10
    },
    {
        _id: '2',
        name: 'MacBook Air M3',
        description: 'Mỏng nhẹ, thời lượng pin lên đến 18 giờ.',
        price: 27990000,
        category: 'Laptop',
        image: 'https://placehold.jp/226x220.png',
        stock: 5
    }
];

const ProductList = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    const handleViewProduct = (productId) => {
        // Xử lý khi người dùng nhấn vào sản phẩm
        console.log(productId);
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
                                title={product.name}
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