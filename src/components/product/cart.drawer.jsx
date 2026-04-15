import { Drawer, List, Button, InputNumber, Typography, Space, Empty, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../context/cart.context';

const { Text, Title } = Typography;

const CartDrawer = ({ open, onClose }) => {
    const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

    return (
        <Drawer
            title="Giỏ hàng của bạn"
            placement="right"
            onClose={onClose}
            open={open}
            width={400}
            extra={
                items.length > 0 && (
                    <Button danger onClick={clearCart}>Xóa tất cả</Button>
                )
            }
        >
            {items.length === 0 ? (
                <Empty description="Giỏ hàng trống" />
            ) : (
                <>
                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button 
                                        type="text" 
                                        danger 
                                        icon={<DeleteOutlined />} 
                                        onClick={() => removeFromCart(item.product._id)} 
                                    />
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<img src={item.product.image} alt={item.product.name} style={{ width: 50 }} />}
                                    title={item.product.name}
                                    description={
                                        <Space direction="vertical">
                                            <Text type="danger">{item.product.price.toLocaleString('vi-VN')} đ</Text>
                                            <InputNumber 
                                                min={1} 
                                                max={item.product.stock}
                                                value={item.quantity} 
                                                onChange={(value) => updateQuantity(item.product._id, value)}
                                            />
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <div style={{ marginTop: 24, padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Text strong style={{ fontSize: '16px' }}>Tổng cộng:</Text>
                            </Col>
                            <Col>
                                <Text strong style={{ color: '#ff4d4f', fontSize: '20px' }}>
                                    {totalPrice.toLocaleString('vi-VN')} đ
                                </Text>
                            </Col>
                        </Row>
                        <Button type="primary" block size="large" style={{ marginTop: 16, height: '45px', fontWeight: 'bold' }}>
                            Thanh toán ngay
                        </Button>
                    </div>
                </>
            )}
        </Drawer>
    );
};

export default CartDrawer;