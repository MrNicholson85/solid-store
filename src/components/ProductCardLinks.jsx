import CategoryCard from "./CategoryCard";
import imageCategoryHeadphones from '../assets/img/image-removebg-preview.png';
import imageCategorySpeakers from '../assets/img/speaker.png';
import imageCategoryEarphones from '../assets/img/category-earphones.png';

const ProductCardLinks = () => {
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
                <CategoryCard 
                image={imageCategoryHeadphones} 
                title="HEADPHONES" 
                text="shop"
                link="/headphones"
                width="122px" />

                <CategoryCard 
                image={imageCategorySpeakers} 
                title="SPEAKERS" 
                text="shop"
                link="/speakers" 
                width="122px"
                />

                <CategoryCard 
                image={imageCategoryEarphones} 
                title="EARPHONES" 
                text="shop"
                link="/earphones"
                width="178px"
                />
            </div>
        </div>
    )
}

export default ProductCardLinks;
