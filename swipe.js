// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
const urls = [
  'https://naeh-paradies.de/cdn/shop/files/Buegelbild-skateboard-bunt-splash.webp?v=1704400572',
  'https://m.media-amazon.com/images/I/81669I10gIL.jpg',
  'https://cdn.idealo.com/folder/Product/201882/3/201882326/s1_produktbild_gross/wmf-stelio-toaster-edition-edelstahl.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH80NzFTL39KUddp7YE6PQC_AEp2voaFVIMw&s',
  'https://storage.googleapis.com/pod_public/1300/202572.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAxOYE0Z4Qrw7e6NSAFR1_XX0CcUCbBI-0A&s',
  'https://www.teltarif.de/img/handy/einrichten-4f.jpg',
  'https://img.babymarkt.com/isa/163853/c3/detailpage_desktop_600/-/73d0411186234ad0ae6a22fb028d2914/reer-kinderwagen-einkaufstasche-growing-a361717',
  'https://cdn.shopify.com/s/files/1/0103/7985/3909/files/pocketwatch_600x600.jpg?v=1714639808',
  'https://cdn.kern-haus.de/fileadmin/media/haeuser/futura-bauhaus/kern-haus-futura-bauhaus-eingangsseite-abend.jpg?width=1680&aspect_ratio=16:10',
  'https://media.direct.playstation.com/is/image/psdglobal/PS5PRO-Hero-1',
  'https://www.schwarzwaelder-bote.de/media.media.75aa6e4e-4b68-49b1-b9d4-c11fcf548ef1.original1024.jpg',
  'https://bilder.obi.de/361b882f-b811-4247-815b-905d7006c628/prZZK/400892_3558_supermaxtonne_1.jpg',
  'https://m.media-amazon.com/images/I/81+0uGCiqYL.jpg',
  'https://i.ytimg.com/vi/6Ij9PiehENA/maxresdefault.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9NO24I6Gog5rVsrxW7uwn_GJio0E3czp6Q&s'
];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 15],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
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
