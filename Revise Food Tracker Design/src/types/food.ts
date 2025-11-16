export type FoodCategory = 'All' | 'Dairy' | 'Bakery' | 'Meat' | 'Vegetables' | 'Other';

export type ExpiryStatus = 'GOOD' | 'EXPIRING_SOON' | 'EXPIRED';

export interface Food {
  id: string;
  name: string;
  quantity: string;
  category: FoodCategory;
  expiryDate: Date;
  isDonated: boolean;
  donationDate?: Date;
  createdAt: Date;
}

export interface FoodStats {
  total: number;
  expired: number;
  expiringSoon: number;
  good: number;
  expiringThisWeek: number;
}