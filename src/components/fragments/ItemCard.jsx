import { A } from '@solidjs/router';

const ItemCard = (props) => {
    return (
        <div class="text-center flex flex-col items-center gap-6">
            <img src={props.imageSrc} class="overflow-hidden rounded-lg" alt="Item Image" />
            <h5>{props.title}</h5>
            <A href={props.link} class="theme-btn alt-btn">{props.buttonText}</A>
        </div>
    );
};

export default ItemCard;
