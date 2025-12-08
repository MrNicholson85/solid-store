import { A } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = createSignal(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen());
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header class="bg-[#191919] text-theme-white pt-8 px-8 lg:px-0 relative">

        <div class="container nav overflow-hidden mx-auto flex items-center justify-between">
          {/* Logo */}
          <A href="/" class="text-2xl font-black tracking-wider hover:text-theme-orange transition">
            audiophile
          </A>

          {/* Navigation */}
          <nav class="hidden md:flex gap-8">
            <A href="/" class="uppercase text-sm font-semibold tracking-widest hover:text-theme-orange transition">
              Home
            </A>
            <A href="/headphones" class="uppercase text-sm font-semibold tracking-widest hover:text-theme-orange transition">
              Headphones
            </A>
            <A href="/speakers" class="uppercase text-sm font-semibold tracking-widest hover:text-theme-orange transition">
              Speakers
            </A>
            <A href="/earphones" class="uppercase text-sm font-semibold tracking-widest hover:text-theme-orange transition">
              Earphones
            </A>
          </nav>

          {/* Cart Icon */}
          <button 
            class="hover:text-theme-orange transition relative z-50" 
            aria-label="Shopping Cart"
            onClick={toggleCart}
          >
            <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h15.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="currentColor" fill-rule="nonzero" />
            </svg>
          </button>
        </div>

        <hr class="container mt-8 border-white/20" />
      </header>

      {/* Cart Modal */}
      <Show when={isCartOpen()}>
        {/* Backdrop */}
        <div 
          class="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        ></div>

        {/* Cart Modal */}
        <div class="fixed top-24 right-8 lg:right-24 w-[377px] bg-white rounded-lg p-8 z-50 shadow-2xl">
          {/* Header */}
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold uppercase tracking-wider">Cart (3)</h2>
            <button class="text-gray-500 hover:text-theme-orange transition underline text-sm">
              Remove all
            </button>
          </div>

          {/* Cart Items */}
          <div class="space-y-6 mb-6">
            {/* Sample Cart Item */}
            <div class="flex gap-4 items-center">
              <div class="w-16 h-16 bg-theme-light-gray rounded-lg"></div>
              <div class="flex-1">
                <h3 class="font-bold text-sm">XX99 MK II</h3>
                <p class="text-gray-500 text-sm">$ 2,999</p>
              </div>
              <div class="flex items-center bg-theme-light-gray">
                <button class="px-3 py-2 hover:text-theme-orange transition text-sm">-</button>
                <span class="px-3 text-sm font-bold">1</span>
                <button class="px-3 py-2 hover:text-theme-orange transition text-sm">+</button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div class="flex justify-between items-center mb-6">
            <span class="text-gray-500 uppercase text-sm">Total</span>
            <span class="text-lg font-bold">$ 5,396</span>
          </div>

          {/* Checkout Button */}
          <button class="w-full bg-theme-orange text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition">
            Checkout
          </button>
        </div>
      </Show>
    </>
  );
};

export default Header;
