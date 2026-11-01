import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Moirang Phee Embroidered Boxy Tee',
    subtitle: 'Streetwear Tee with Traditional Manipuri Chevron Hem',
    category: 'T-Shirts',
    gender: 'Unisex',
    price: 1899,
    originalPrice: 2499,
    description: 'An elevated oversized streetwear staple cut from 280 GSM combed organic cotton. Features subtle hand-embroidered Moirang Phee chevron motifs along the chest pocket and cuff, honoring centuries-old Manipuri loom patterns in modern noir tones.',
    fabric: '100% Combed Heavy Cotton (280 GSM)',
    gsm: 280,
    fit: 'Boxy drop-shoulder relaxed silhouette',
    details: [
      'Hand-embroidered Moirang Phee triangular motifs',
      'Heavyweight 280 GSM single jersey knit',
      'Ribbed 32mm thick collar that holds shape',
      'Pre-shrunk and double-enzyme washed for vintage hand-feel',
      'Crafted in Imphal, Manipur'
    ],
    care: [
      'Machine wash cold (30°C) with like colors',
      'Turn inside out before washing to protect embroidery',
      'Do not tumble dry; lay flat to dry in shade',
      'Warm iron inside out; avoid direct heat on embroidery'
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Chalk Bone', hex: '#F0ECE1' },
      { name: 'Washed Charcoal', hex: '#2A2A2A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 8,
    isNewDrop: true,
    isBestSeller: true,
    images: [
      '/src/assets/images/tee_black_moirang_1793538393313.jpg',
      '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg'
    ],
    traditionalTouch: 'Authentic Moirang Phee geometric motifs traditionally symbolizing the spear of the legendary hero Khamba.',
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'prod-02',
    name: 'Travertine Drop-Shoulder Heavyweight Hoodie',
    subtitle: '450 GSM Brushed French Terry Luxury Streetwear',
    category: 'Hoodies',
    gender: 'Unisex',
    price: 3499,
    originalPrice: 4299,
    description: 'Constructed from ultra-dense 450 GSM custom-milled French terry cotton. Engineered with dramatic dropped shoulders, double-layered hood without drawstrings for a sleek architectural drape, and hidden side-seam pockets.',
    fabric: '100% French Terry Brushed Heavy Cotton (450 GSM)',
    gsm: 450,
    fit: 'Oversized boxy drop-shoulder cut',
    details: [
      'Double-lined seamless hood without cumbersome eyelets',
      'High-density 2x2 ribbed cuffs and hem for structural grip',
      'Concealed kangaroo slash pockets',
      'Tonal micro-embroidered brand mark on upper sleeve',
      'Heavyweight thermal heat retention for Northeast winters'
    ],
    care: [
      'Machine wash gentle cycle cold',
      'Do not bleach or dry clean',
      'Reshape while damp and dry flat'
    ],
    colors: [
      { name: 'Bone Beige', hex: '#EBE5D8' },
      { name: 'Pitch Black', hex: '#0B0B0B' },
      { name: 'Dune Sand', hex: '#D2C6B2' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 5,
    isNewDrop: true,
    isBestSeller: true,
    images: [
      '/src/assets/images/hoodie_bone_front_1793538391466.jpg',
      '/src/assets/images/hoodie_bone_model_1793538393078.jpg'
    ],
    traditionalTouch: 'Warm neutral bone tone inspired by natural unbleached Manipuri raw silk (Moonga & Eri) fibers.',
    rating: 5.0,
    reviewCount: 68
  },
  {
    id: 'prod-03',
    name: 'Selvedge Wide-Leg Cargo Denim',
    subtitle: '14oz Raw Washed Denim with Structural Utility Pockets',
    category: 'Jeans',
    gender: 'Unisex',
    price: 3899,
    originalPrice: 4799,
    description: 'Heavyweight 14oz Japanese selvedge denim in deep stone-washed black. Cut in an effortless wide-leg straight drape with ergonomic 3D flap cargo pockets and custom antique silver hardware.',
    fabric: '100% Ring-Spun Cotton Selvedge Denim (14oz)',
    fit: 'Relaxed wide-leg straight fit with mid-rise waist',
    details: [
      'Double front carpenter and cargo pockets with gunmetal snaps',
      'Reinforced bar-tacking on stress points and knee darts',
      'YKK custom oxidized brass zipper fly',
      'Raw edge cuff detailing with custom tonal stitching'
    ],
    care: [
      'Wash sparingly to preserve indigo wash character',
      'Cold water hand-wash or gentle cycle inside out'
    ],
    colors: [
      { name: 'Washed Black', hex: '#262626' },
      { name: 'Raw Indigo', hex: '#1C2833' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 12,
    isNewDrop: true,
    isBestSeller: true,
    images: [
      '/src/assets/images/denim_black_cargo_1793538393624.jpg',
      '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg'
    ],
    rating: 4.8,
    reviewCount: 31
  },
  {
    id: 'prod-04',
    name: 'Shaphee Lanphee Minimalist Coach Jacket',
    subtitle: 'Contemporary Street Outerwear with Traditional Royal Motifs',
    category: 'Traditional Touches',
    gender: 'Unisex',
    price: 4499,
    originalPrice: 5499,
    description: 'An architectural zip-front coach jacket in matte water-resistant technical twill. Accented on the back yoke with delicate tone-on-tone embroidery drawn from the Shaphee Lanphee—a revered traditional Manipuri textile originally presented as a mark of supreme honor.',
    fabric: 'Matte Technical Cotton-Nylon Shell + Cupro Silk Lining',
    fit: 'Relaxed streetwear jacket with interior cinch cord',
    details: [
      'Authentic Shaphee Lanphee celestial embroidery',
      'Two-way matte black heavy gauge zipper',
      'Interior zip passport pocket and side fleece-lined hand pockets',
      'Adjustable snap cuffs'
    ],
    care: [
      'Specialist dry clean or wipe clean with damp cloth'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#141414' },
      { name: 'Stone Grey', hex: '#737373' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 4,
    isNewDrop: true,
    isBestSeller: false,
    images: [
      '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg',
      '/src/assets/images/tee_black_moirang_1793538393313.jpg'
    ],
    traditionalTouch: 'Inspired by Shaphee Lanphee, the traditional Manipuri textile featuring sun, moon, and floral motifs bestowed on champions.',
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'prod-05',
    name: 'Nocturne Heavyweight Graphic Boxy Tee',
    subtitle: '300 GSM Streetwear Graphic Tee with Typographic Relief',
    category: 'T-Shirts',
    gender: 'Men',
    price: 1799,
    originalPrice: 2299,
    description: 'Heavy 300 GSM dense organic cotton tee featuring high-density rubberized puff print of the Imphal coordinates and minimalist studio topography on the back shoulder.',
    fabric: '100% Dense Combed Cotton (300 GSM)',
    gsm: 300,
    fit: 'Extra-boxy drop shoulder fit with wide sleeve openings',
    details: [
      'Puff screen print with tactile matte relief',
      'Thick 1.25" rib neckline that never sags',
      'Side split hem with herringbone tape reinforcement'
    ],
    care: ['Gentle cold wash', 'Iron inside-out only'],
    colors: [
      { name: 'Noir Black', hex: '#0F0F0F' },
      { name: 'Bone Beige', hex: '#EBE5D8' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15,
    isNewDrop: false,
    isBestSeller: true,
    images: [
      '/src/assets/images/tee_black_moirang_1793538393313.jpg',
      '/src/assets/images/hoodie_bone_model_1793538393078.jpg'
    ],
    rating: 4.7,
    reviewCount: 54
  },
  {
    id: 'prod-06',
    name: 'Wangkhei Raw Hem Street Crewneck',
    subtitle: '400 GSM Unbrushed Looped Terry Sweatshirt',
    category: 'Hoodies',
    gender: 'Women',
    price: 2999,
    originalPrice: 3699,
    description: 'A cropped-and-boxy relaxed crewneck sweater with raw edge cuffs and subtle ribbed hemline. Super soft unbrushed French terry designed for effortless daily layering.',
    fabric: '100% Looped French Terry Cotton (400 GSM)',
    gsm: 400,
    fit: 'Cropped relaxed streetwear cut',
    details: [
      'Signature raw finished cuff sleeves',
      'Drop shoulders with forward-shifted shoulder seam',
      'Clean unbranded minimalist front'
    ],
    care: ['Machine wash cold', 'Lay flat to dry'],
    colors: [
      { name: 'Warm Beige', hex: '#E8E1D3' },
      { name: 'Noir Black', hex: '#181818' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 9,
    isNewDrop: false,
    isBestSeller: true,
    images: [
      '/src/assets/images/hoodie_bone_model_1793538393078.jpg',
      '/src/assets/images/hoodie_bone_front_1793538391466.jpg'
    ],
    rating: 4.8,
    reviewCount: 37
  },
  {
    id: 'prod-07',
    name: 'Kanglei Relaxed Pleated Trousers',
    subtitle: 'Structured Suiting Fabric with Streetwear Drape',
    category: 'Jeans',
    gender: 'Unisex',
    price: 3299,
    originalPrice: 3999,
    description: 'Bridging high fashion tailoring with effortless street comfort. Double front pleats with a relaxed tapered leg and partially elasticated internal waistband for maximum comfort during long days.',
    fabric: 'Heavyweight Viscose-Wool Blend Twill',
    fit: 'Relaxed loose taper with subtle break',
    details: [
      'Deep double front pleats',
      'Clean tab waistband with button closure',
      'Slanted deep trouser pockets',
      'Interior drawcord for adjustable waist without a belt'
    ],
    care: ['Dry clean recommended or hand wash cold'],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1C' },
      { name: 'Oatmeal Beige', hex: '#DFD8C8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 7,
    isNewDrop: true,
    isBestSeller: false,
    images: [
      '/src/assets/images/denim_black_cargo_1793538393624.jpg',
      '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg'
    ],
    rating: 4.9,
    reviewCount: 23
  },
  {
    id: 'prod-08',
    name: 'Moirang Accent Heavy Ribbed Beanie',
    subtitle: '100% Merino Wool with Miniature Embroidered Spearhead',
    category: 'Traditional Touches',
    gender: 'Unisex',
    price: 1299,
    originalPrice: 1699,
    description: 'A chunky fisherman style knit beanie crafted from 100% fine merino wool. Features a clean fold-over cuff with micro-embroidered Moirang triangle chevron in silver-beige thread.',
    fabric: '100% Australian Merino Wool (7-gauge knit)',
    fit: 'Snug fit with adjustable cuff height',
    details: [
      'Itch-free ultra-soft merino yarn',
      'Seamless 3D knit crown construction',
      'Discreet tonal embroidery'
    ],
    care: ['Hand wash cold with wool detergent', 'Dry flat on towel'],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Bone White', hex: '#FAF6EE' },
      { name: 'Olive Drab', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 18,
    isNewDrop: false,
    isBestSeller: true,
    images: [
      '/src/assets/images/hoodie_bone_front_1793538391466.jpg',
      '/src/assets/images/tee_black_moirang_1793538393313.jpg'
    ],
    traditionalTouch: 'Minimalist interpretation of Manipur Moirang Phee needlework on luxury knitwear.',
    rating: 4.9,
    reviewCount: 45
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg',
    likes: '1.4k',
    caption: 'Autumn/Winter Drop 03 spotted outside Kangla Fort, Imphal. Heavyweight cottons built for the Northeast chill.',
    productTag: 'Moirang Phee Boxy Tee'
  },
  {
    id: 'ig-2',
    image: '/src/assets/images/hoodie_bone_model_1793538393078.jpg',
    likes: '2.1k',
    caption: 'The Travertine 450 GSM in Bone. Zero drawstrings, pure architectural silhouette.',
    productTag: 'Travertine Hoodie'
  },
  {
    id: 'ig-3',
    image: '/src/assets/images/tee_black_moirang_1793538393313.jpg',
    likes: '984',
    caption: 'Meitei loom motifs meet oversized street tailoring. Proudly designed and finished in Imphal.',
    productTag: 'Embroidered Tee'
  },
  {
    id: 'ig-4',
    image: '/src/assets/images/denim_black_cargo_1793538393624.jpg',
    likes: '1.8k',
    caption: '14oz Selvedge wide-leg cargo jeans. Built to endure.',
    productTag: 'Selvedge Cargo'
  },
  {
    id: 'ig-5',
    image: '/src/assets/images/hoodie_bone_front_1793538391466.jpg',
    likes: '3.2k',
    caption: 'Studio restock alert. Only 5 pieces left in Size L. Free delivery in Manipur.',
    productTag: 'Drop-Shoulder Hoodie'
  }
];
