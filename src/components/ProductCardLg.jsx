import productImage from '../assets/img/image-speaker-zx9.png';
import patternCircles from '../assets/img/pattern-circles.svg';
import iconRightArrow from '../assets/img/icon-arrow-right.svg';

// Large Product Card Component
const ProductCardLg = (props) => {
    // Destructure props with default values
    const showButton = props.showButton || false;
    const showIcon = props.showIcon || false;

    return (
        <div class="container mb-12 relative bg-theme-orange rounded-lg h-[720px] lg:h-[560px] overflow-hidden grid lg:flex px-24 gap-16 lg:gap-[138px]">
            {/* Background Pattern */}
            <img src={patternCircles} alt="Background Pattern" class="absolute lg:-translate-x-[165px] -translate-y-[283px] lg:-translate-y-5 inset-0 w-[944px] h-[944px] object-cover"/>

            {/* Product Image */}
            <div class="w-[197px] mx-auto lg:w-[410px] md:h-[237px] lg:h-[493px] p-3 lg:translate-y-7 grid place-items-end">
                <img src={productImage} alt={props.title} class=""/>
            </div>
            
            {/* Product Details */}
            <div class="grid lg:place-content-center justify-center lg:justify-start text-theme-white mx-auto md:text-center lg:text-left w-[349px] z-0 ">
                <h2 class="w-[261px] md:mx-auto lg:mx-0 mb-6">{props.title}</h2>
                <p class="mb-10 text-base leading-6 opacity-75">{props.description}</p>

                {showButton && (
                    <button class="theme-btn primary-btn mx-auto lg:mx-0">
                        See Product
                        
                        {showIcon && (
                        <i><img src={iconRightArrow} alt="Right Arrow Icon" /></i>
                        )}
                    </button>
                )}

            </div>

        </div>
    )
}

export default ProductCardLg;
