import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import {navigate} from "../../router.ts";


export const Slider = () =>{
    const swiper = new Swiper('.swiper' , {
        modules : [Navigation , Pagination],
        direction : 'horizontal' ,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },

    })
   swiper.on('reachEnd' , ()=>{
       const btn =<HTMLButtonElement> document.getElementById('btn')
       btn.innerText = 'Start'
       btn.addEventListener('click', ()=>{
           navigate('login')
       })
   } )
}
export const onBoardingTemplate = () =>{
    const div = document.createElement('div');
    div.innerHTML = `
            <!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">
            <div class="w-full ">
              <img src="/img/WallpaperDog-20397673 1.png" alt="" >
            </div>
            <div class="w-full mt-8">
              <h2 class="text-center text-3xl font-bold font-inter">We provide high quality products just for you</h2>
            </div>
            <div class="w-full flex items-center justify-center mt-16 gap-4">
              <div class="bg-black w-8 h-1">
              </div>
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
          </div>
    </div>
    <div class="swiper-slide">
     <div class="w-full ">
              <img src="/public/img/WallpaperDog-20534536 1.png" alt="">
            </div>
            <div class="w-full mt-8">
              <h2 class="text-center text-3xl font-bold font-inter">Your satisfaction is our number one periority</h2>
            </div>
            <div class="w-full flex items-center justify-center mt-16 gap-4">
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
              <div class="bg-black w-8 h-1">
              </div>
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
          </div>
</div>
    <div class="swiper-slide -mt-6">
    <div class="w-full">
              <img src="/public/img/WallpaperDog-20534715 1.png" alt="" >
            </div>
            <div class="w-full mt-8">
              <h2 class="text-center text-3xl font-bold font-inter">Let’s fulfill your fashion needs with shoearight now!</h2>
            </div>
            <div class="w-full flex items-center justify-center mt-16 gap-4">
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
              <div class="bg-black opacity-50 w-8 h-1">
              </div>
              <div class="bg-black w-8 h-1">
              </div>
          </div>
</div>
    ...
  </div>
  <div class="swiper-button-next px-3 mt-4">
        <button class="glide__arrow glide__arrow--right next-btn bg-black rounded-full w-full flex items-center justify-center font-medium  text-white py-4" data-glide-dir=">" id="btn">next</button>
    </div>
    `

    return div
}