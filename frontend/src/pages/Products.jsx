import FeaturedProducts from "../components/FeaturedProducts";
import ProductFilters from "../components/ProductFilters";

function Products() {
    return (
        <div className="p-7 w-full min-w-0 overflow-x-hidden">
          <ProductFilters />
          <FeaturedProducts />
          
        </div>
    )
};

export default Products;