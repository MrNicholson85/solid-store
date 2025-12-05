import { A } from "@solidjs/router";

const CategoryCardLg = (props) => {
    const flipped = props.flipped || false;

    return (
        <div class={`container mb-40 gap-[125px] flex items-center flex-col md:flex-row ${flipped ? 'md:flex-row-reverse' : ''}`}>
            <div class="w-1/2">
                <img src={props.imgSrc} alt={props.imgAlt} class="" />
            </div>
            <div class="w-1/2">
                <span class="theme-overline flex text-theme-orange text-[14px] mb-4">{props.subtitle && props.subtitle}</span>
                <h2 class="mb-8">{props.title && props.title}</h2>
                <p class="mb-10">{props.description && props.description}</p>
                {props.ctaText && <A href={props.ctaHref} class="flex justify-center theme-btn alt-btn">{props.ctaText}</A>}
            </div>
        </div>
    );
};

export default CategoryCardLg;
