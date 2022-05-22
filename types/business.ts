export interface Category {
  alias: string;
  title: string;
}

export interface Business {
  id: string;
  categories: Category[];
  imageUrl: string;
  name: string;
  price: string;
  location: {
    address1: string;
    city: string;
    zipCode: string;
    country: string;
    state: string;
    displayAddress: string[];
  };
}
