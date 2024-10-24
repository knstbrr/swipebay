// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
const urls = [
 'https://cdn.movertix.com/media/catalog/product/cache/image/1200x/s/a/samsung-galaxy-s24-5g-onyx-black-128gb-and-8gb-ram-sm-s921b-back_1.jpg',
  'https://m.media-amazon.com/images/I/61MopOEgcpL._AC_UF894,1000_QL80_.jpg',
  'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-x/iphone-x-space-gray.jpg',
  'https://media.cdn.kaufland.de/product-images/1024x1024/1b9f18a48b8039db116d178657d45dee.jpg',
  'https://m.media-amazon.com/images/I/510uIl8K4NL.jpg',
  'https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large.jpg',
  'https://media.medion.com/prod/medion/de_DE/0729/0843/0761/ECOM_MEDION_MO_MD22020_AKOYA_P52720_Front_Side_Left_Logo_neu.png?imwidth=1920',
  'https://m.media-amazon.com/images/I/71F8udBqz3L.jpg',
  'https://im.cyberport.de/is/image/cyberport//PI_302188621?$Zoom_1000$',
  'https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/23C7HZ/0e4ff57f5c114d0f9533417c82cccb9f.jpg/f/logitech-g502-x-plus-kabellose-gaming-maus-schwarz.jpg',
  'https://m.media-amazon.com/images/I/71bNHqJS9BL.jpg',
  'https://media.foto-erhardt.de/images/product_images/popup_images/sandisk-256-gb-sdxc-extremepro-300mbs-v90-uhs-ii-166557593347190304.jpg',
  'https://media.cdn.kaufland.de/product-images/1024x1024/d5f986442c9e72c12cec81fc072a8ba8.jpg',
  'https://m.media-amazon.com/images/I/61wBoscGbXL.jpg',
  'https://res-1.cloudinary.com/grover/image/upload/v1657530214/co9kfaws5cwjoskhpzkp.jpg',
  'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HQWW2?wid=4000&hei=4000&fmt=jpeg&qlt=95&.v=1681150922615',
  'https://www.hulle24.de/media/image/apple-magsafe-ladegeraet-ladedock-station-mhxh3zma-weiss-silber-hulle24-mainqYgFXn1T4gslp.jpg',
  'https://m.media-amazon.com/images/I/41sWL0p4bML.jpg',
  'https://m.media-amazon.com/images/I/51+U+uw4P9L._AC_UF894,1000_QL80_.jpg'
];

// variables
let cardCount = 0;
let timer_sic = 0;

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 18],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      uioff();
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
      uioff();
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}

function icond() {
  var element = document.getElementById("dislike");
  element.classList.add("mystyle");
} 
function iconl() {
  var element = document.getElementById("like");
  element.classList.add("mystyle");
} 
function diconl() {
  var element = document.getElementById("like");
  element.classList.remove("mystyle");
} 
function dicond() {
  var element = document.getElementById("dislike");
  element.classList.remove("mystyle");
} 
