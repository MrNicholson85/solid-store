import rightArrow from '../assets/img/icon-arrow-right.svg';

const CategoryCard = (props) => {
    return (
        <a href={props.link} class="group grid gap-4 lg:gap-0 lg:flex relative h-[284px] before:rounded-lg before:bg-theme-light-gray before:absolute before:h-[204px] before:w-full before:bottom-0 before:z-[-1] z-10">
            <div class="block place-items-center bg-light-gray w-full items-start justify-center">
                <img src={props.image} class="mb-8" alt={props.title} width={props.width} />
                <h6 class="font-bold mb-5">{props.title}</h6>
                <p class="group-hover:text-theme-orange transition-colors flex items-center gap-2 uppercase text-xs">{props.text} <img src={rightArrow} alt="right arrow" /></p>
            </div>
        </a>
    )
}

export default CategoryCard;
