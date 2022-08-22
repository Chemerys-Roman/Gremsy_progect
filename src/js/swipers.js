import { Swiper, Navigation, Pagination } from 'swiper';

const galarySliderElement = document.querySelector('.galary__photos-container')
export default function galarySliderFunction() {
  Swiper.use([Navigation, Pagination]);
  console.log('slider is working', galarySliderElement)
  let swiper;
  let swiperGalary;
  let init = false;

  /* Which media query
   ************************************************************* */
  function swiperMode() {
    // if (!galarySliderElement.length) return;
    // const mobile = window.matchMedia('(min-width: 0px) and (max-width: 665px)');
    // const tablet = window.matchMedia(
    //   '(min-width: 666px) and (max-width: 1023px)'
    // );
    // const desktop = window.matchMedia('(min-width: 1024px)');

    const notMobile = window.matchMedia('(min-width: 666px)');

    // Enable (for mobile)
    if (notMobile.matches) {
      if (!init) {
        init = true;
        swiperGalary = new Swiper('.slider-container', {
          slidesPerView: 3,
          loop: true,

          // keyboard: {
          //   enabled: true,
          //   onlyInViewport: true,
          // },
          navigation: {
            nextEl: '.managers-swiper-next',
            prevEl: '.managers-swiper-prev',
          },
          breakpoints: {
            666: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            850: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            950: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1366: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        });
        swiper = new Swiper('.galary__photos-container', {
          slidesPerView: 3,
          // spaceBetween: 150,
          // autoHeight: true,
          scrollbar: {
            hide: true
          },

          loop: true,
          grabCursor: true,
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },

          breakpoints: {
            666: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            850: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            950: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1200: {
              height: 450,
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1366: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        });
      }
    }
  }

  /* On Load
   ************************************************************* */
  window.addEventListener('load', () => {
    swiperMode();
  });

  /* On Resize
   ************************************************************* */
  window.addEventListener('resize', () => {
    swiperMode();
  });
}
