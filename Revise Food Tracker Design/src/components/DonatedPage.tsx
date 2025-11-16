import { Food } from '../types/food';
import { Heart } from 'lucide-react';

interface DonatedPageProps {
  foods: Food[];
}

export function DonatedPage({ foods }: DonatedPageProps) {
  const donatedFoods = foods.filter(f => f.isDonated);

  if (donatedFoods.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          <Heart className="w-10 h-10" style={{ color: '#CCCCCC' }} />
        </div>
        <h3 className="mb-2 text-center" style={{ color: '#666666' }}>
          No donated items yet
        </h3>
        <p className="text-center" style={{ color: '#999999' }}>
          Items you donate will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-5 py-6">
        <h1 className="mb-6 text-center text-[#1A1A1A]">Donated Items</h1>
        <div className="space-y-3">
          {donatedFoods.map(food => (
            <div
              key={food.id}
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: '#F9FAFB', borderColor: '#F0F0F0' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-[#1A1A1A]">{food.name}</h3>
                  <p className="text-[#666666] mb-1">{food.quantity}</p>
                  <p className="text-[#999999]">
                    Donated on {food.donationDate?.toLocaleDateString()}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <Heart className="w-5 h-5" style={{ color: '#666666', fill: '#666666' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}