import { A } from '@solidjs/router';
import fbIcon from '../assets/img/icon-facebook.svg';
import igIcon from '../assets/img/icon-instagram.svg';
import twIcon from '../assets/img/icon-twitter.svg';

const Footer = () => {
    return (
        <footer class="bg-[#191919] text-theme-white py-8 mt-20">
            <div class="container">
                <div class="flex flex-col md:flex-row md:justify-between ">
                    <A href="/" class="text-2xl font-black tracking-wider hover:text-theme-orange transition mb-6">
                        audiophile
                    </A>
                    <div class="flex flex-col md:flex-row md:justify-between gap-6 mb-6">
                        <nav class="flex flex-col md:flex-row gap-6 md:gap-12">
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
                    </div>
                </div>
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <p class="max-w-md text-theme-gray/50">
                            Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                        </p>
                    </div>
                    <ul class="flex gap-4">
                        <li>
                            <a href="#" aria-label="Facebook" class="hover:text-theme-orange transition">
                                <img src={fbIcon} />
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label="Twitter" class="hover:text-theme-orange transition">
                                <img src={twIcon} />
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label="Instagram" class="hover:text-theme-orange transition">
                                <img src={igIcon} />
                            </a>
                        </li>
                    </ul>
                </div>
                <p>© 2024 Solid Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
