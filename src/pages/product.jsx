import ProductForm from "../components/product/product.form";
import ProductList from "../components/product/product.list";
import { Button } from "antd";
const ProductPage = (props) => {
    return (
        <>
            <div className="wrapper">
                <section className="sec-product">
                    <div className="inner">
                        <h1 className="product-ttl">Page product</h1>
                        <ProductList />
                        
                        <Button type="primary">Add Product</Button>
                    </div>

                </section>
            </div>
        </>
    )
}

export default ProductPage;