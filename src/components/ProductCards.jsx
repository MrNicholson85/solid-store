import { A } from '@solidjs/router';

const ProductCards = (props) => {
    return (
        <div class="container flex gap-[30px] justify-between mb-[200px]">
            <div class="w-1/2 h-80 rounded-lg bg-cover overflow-hidden">
                <img src={props.bgImage} alt={props.title} class="w-full h-full object-cover"/>
            </div>
            <div class="bg-theme-light-gray flex items-center px-8 lg:px-0 rounded-lg w-1/2">
                <div class="grid w-[204px] gap-6 ml-[95px]">
                    <h4>{props.title}</h4>
                    <A href={props.ctaHref} class="leading-3.5 theme-btn secondary-btn text-sm uppercase text-theme-orange font-bold tracking-widest hover:underline">
                        {props.ctaText}
                    </A>
                </div>
            </div>
        </div>
    )
}
export default ProductCards;
