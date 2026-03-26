export type Product = {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  retailPrice: number;
  wholesalePrice: number;
  images: string[];
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  isWholesale: boolean;
};

export type ViewState = 'home' | 'shop' | 'checkout';
