import { Food, ExpiryStatus } from '../types/food';

export function getDaysUntilExpiry(expiryDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getExpiryStatus(expiryDate: Date): ExpiryStatus {
  const daysLeft = getDaysUntilExpiry(expiryDate);
  if (daysLeft < 0) return 'EXPIRED';
  if (daysLeft <= 3) return 'EXPIRING_SOON';
  return 'GOOD';
}

export function getExpiryText(food: Food): string {
  const daysLeft = getDaysUntilExpiry(food.expiryDate);
  if (daysLeft < 0) return 'Expired!';
  if (daysLeft === 0) return 'Expires today!';
  if (daysLeft === 1) return '1 day left';
  return `${daysLeft} days left`;
}

export function getStatusColor(status: ExpiryStatus): string {
  switch (status) {
    case 'EXPIRED':
      return '#E8D5CC'; // Light gray-beige for expired
    case 'EXPIRING_SOON':
      return '#F4D5B8'; // Light peach for expiring soon
    case 'GOOD':
      return '#E8E0D5'; // Light beige for good
  }
}

export function getSampleFoods(): Food[] {
  const today = new Date();
  return [
    {
      id: '1',
      name: 'Yogurt',
      quantity: '4 cups',
      category: 'Dairy',
      expiryDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isDonated: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Chicken',
      quantity: '500g',
      category: 'Meat',
      expiryDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      isDonated: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Milk',
      quantity: '1 carton',
      category: 'Dairy',
      expiryDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isDonated: false,
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Tomatoes',
      quantity: '6 pieces',
      category: 'Vegetables',
      expiryDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      isDonated: false,
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Bread',
      quantity: '1 loaf',
      category: 'Bakery',
      expiryDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      isDonated: false,
      createdAt: new Date(),
    },
  ];
}