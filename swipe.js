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
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9NO24I6Gog5rVsrxW7uwn_GJio0E3czp6Q&s',
  'https://m.media-amazon.com/images/I/71C6mgZOxtL._AC_UY300_.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCqXoaH5SA5yU0wJaetl_FJy34T2en-vqYzQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH0G-xof5_r_FiC4VekScufYjDNoZog3Dl1w&s',
  'https://hearly.de/storage/UdINmxigdGYSs7Cce3DGcnmCUxTD2Lwuu2CJb8UW.png',
  'https://www.numatic.de/wp-content/uploads/913859-5.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Freundin_%28Zeitschrift%29_logo.svg/2560px-Freundin_%28Zeitschrift%29_logo.svg.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShEdmReLvs-CpIbfxjDXTbVW2gSBqDiuowNA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAIJtl_iWX3ZP_L-tBApfjck2WUPlV2bp5w&s',
  'https://m.media-amazon.com/images/I/713O5npuQYL.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgP4mSmmfgtROFCXLt10cWRFY9hwH9RYE5yw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_FMIvizaCsXxA3OzLwiBR2So8OlgbbUFOQ&s',
  'https://m.media-amazon.com/images/I/819tRhZERSL.jpg',
  'https://m.media-amazon.com/images/I/81U-DS7w+CL.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBn4MEADNdXf0v2g-zVy9C15jgxV7r-JTQA&s',
  'https://asset.re-in.de/isa/160267/c1/-/de/002274564PI00/Creality-Ender-5-Plus-3D-Drucker-Bausatz.jpg?x=500&y=500&ex=500&ey=500&align=center&quality=95',
  'https://www.peta.de/wp-content/uploads/2009/03/Maus-house-mouse-gf306cec1c_1280-c-pixabay.jpg',
  'https://www.img-stageline.de/fileadmin/_processed_/7/b/csm_IMG_Magazin_Mischpulte_MPX-206_00_Fader_a53a230d1b.jpg',
  'https://image.smythstoys.com/original/mobile/8035309.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSznT77LKvpIjWxuGMOYEtzgoLZBwAQa0VwGw&s',
  'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/s10-case-unselect-gallery-1-202409_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=1724620929305',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKuVPgbHjZ_irSsXjD5SGqSCXsqFphZxKCNQ&s',
  'https://goodgoods.cz/5557-large_default/kinder-tablet-mit-tragegriff-7-silikonhulle-android-blau.jpg',
  'https://i.ebayimg.com/00/s/MTAxOVgxNjAw/z/k4wAAOSwirFbBdeg/$_57.JPG?set_id=8800005007',
  'https://images.samsung.com/is/image/samsung/p6pim/de/mz-v9p1t0bw/gallery/de-990pro-nvme-m2-ssd-mz-v9p1t0bw-533582570?$650_519_PNG$',
  'https://eu.hsm.eu/media/image/91/6b/37/HSM_Optische_Datentraeger_500x351px.jpg',
  'https://png.pngtree.com/png-clipart/20220131/ourmid/pngtree-cartoon-of-magnetic-and-like-love-social-network-icon-png-image_4373484.png',
  'https://www.pcwelt.de/wp-content/uploads/2023/04/999-1.jpg?quality=50&strip=all&w=1024',
  'https://i.ebayimg.com/thumbs/images/g/EwgAAOSwX9RmJSL9/s-l1200.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7bDQos5SeO23K0vWvQXgRREQ-vdBvuY1qLQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9Q2MhukYzrTGo2r7N2zcYcyMYnHftKJTBA&s',
  'https://www.pinokids-shop.de/media/image/5f/b3/7d/clipho-woman-damen-gurtel.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVAWwcEOjnKc6JdAmLhZOGni00GU81PFrYiw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvvopaXqPp9i245VL6v2kmqd5deBEnPPupw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-dAGKgGuVAUwOFkhnciijyPXr52LKtx759A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQphEfPRHV6ZGhquCbGYmHheDO0KiFyMlB6ZQ&s',
  'https://cdn-img1.pneus-online.com/produit/pneu-auto/250/FIRESTONE_WINTERHAWK_3_S.jpg',
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
