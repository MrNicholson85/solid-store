import { A } from "@solidjs/router";

const ProductCardSm = (props) => {
    return (
        <div class="container h-80 rounded-lg flex items-center bg-cover mb-12 pl-[95px]" style={{ "background-image": `url(${props.bgImage})` }}>
            <div class="grid w-[204px] gap-6">
                <h4>{props.title}</h4>
                <A href={props.link} class="leading-3.5 theme-btn secondary-btn text-sm uppercase text-theme-orange font-bold tracking-widest hover:underline">
                    {props.ctaText}
                </A>
            </div>
        </div>
    );
}
export default ProductCardSm;
