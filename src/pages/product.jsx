import ProductForm from "../components/product/product.form";
import ProductList from "../components/product/product.list";
import { Button } from "antd";
const ProductPage = (props) => {
    return (
        <>
            <div className="product-page">
                <div className="inner">
                    <h1 className="product-ttl">Page product</h1>
                    <ProductList />
                    <ProductForm />
                    <Button type="primary">Add Product</Button>
                </div>
            </div>
        </>
    )
}

export default ProductPage;