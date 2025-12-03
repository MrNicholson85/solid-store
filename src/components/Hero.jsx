import { A } from '@solidjs/router';
import heroImage from '../assets/img/image-hero.jpg';

const Hero = (props) => {
    const hasHeroImage = props.hasHeroImage || false;
    const pageTitle = props.pageTitle || "";

    return (
        <Show
          when={hasHeroImage && heroImage}
          fallback={
            <Show when={pageTitle}>
              <div class="bg-[#191919] text-theme-white mb-40 py-16 px-8 lg:px-24 text-center">
                <h1 class="text-4xl lg:text-5xl font-bold uppercase tracking-widest">{pageTitle}</h1>
              </div>
            </Show>
          }
        >
          <div class="bg-[#191919]">
            <div
              class="container lg:flex text-theme-white mb-[120px] lg:h-[629px] bg-cover bg-no-repeat"
              style={{ "background-image": `url(${heroImage})` }}
            >
              <div class="w-[398px] self-center">
                <span class="text-sm opacity-50 tracking-widest">{props.productLabel}</span>
                <h1 class="text-4xl lg:text-5xl font-bold uppercase tracking-widest my-4">{props.productTitle}</h1>
                <p class="opacity-75 leading-6">{props.productDescription}</p>

                <button class="mt-6 bg-theme-orange text-theme-white uppercase text-sm font-semibold tracking-widest px-6 py-3 hover:bg-theme-light-orange transition">
                  {props.ctaText}
                </button>
              </div>
            </div>
          </div>
        </Show>
    )
};

export default Hero;
