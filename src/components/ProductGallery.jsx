const ProductGallery = (props) => {
    return (
        <div class="flex gap-6 mb-24" >
            <div class="grid w-1/2 space-y-6">
                <div class="rounded-lg h-[280px] w-full">
                    <img src={props.image1} alt="Product Gallery Image 1" class="w-full h-full object-cover rounded-lg" />
                </div>
                <div class="rounded-lg h-[280px] w-full">
                    <img src={props.image2} alt="Product Gallery Image 2" class="w-full h-full object-cover rounded-lg" />
                </div>
            </div>
            <div class="lg:col-span-2  rounded-lg w-[445px] h-[580px]">
                <img src={props.image3} alt="Product Gallery Image 3" class="w-full h-full object-cover rounded-lg" />
            </div>
        </div>
    );
};

export default ProductGallery;
