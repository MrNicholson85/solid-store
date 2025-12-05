const LastCall = (props) => {
    return (
        <div class="container flex gap-[125px] items-center mx-h-[588px] h-full">
            <div>
                <h2 class="mb-8">{props.title}</h2>
                <p>{props.copy}</p>
            </div>
            <img src={props.image} alt="Last Call Image" />
        </div>
    );
}

export default LastCall;
