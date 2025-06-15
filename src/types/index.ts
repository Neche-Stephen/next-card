export interface Accommodation {
  id: string;
  roomType: string;
  university: 'Nile' | 'Baze';
  price: number;
  services: string[];
  imageUrl: string;
  imageHint: string;
  occupancyRate: number; // 0.0 to 1.0
  basePriceForAI: number; // The price AI uses for discount calculation
  description: string;
}
