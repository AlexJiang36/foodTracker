import { Food, FoodStats } from '../types/food';
import { getExpiryStatus, getDaysUntilExpiry } from '../utils/foodUtils';
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

interface OverviewPageProps {
  foods: Food[];
}

export function OverviewPage({ foods }: OverviewPageProps) {
  const activeFoods = foods.filter(f => !f.isDonated);

  const stats: FoodStats = {
    total: activeFoods.length,
    expired: activeFoods.filter(f => getExpiryStatus(f.expiryDate) === 'EXPIRED').length,
    expiringSoon: activeFoods.filter(f => getExpiryStatus(f.expiryDate) === 'EXPIRING_SOON').length,
    good: activeFoods.filter(f => getExpiryStatus(f.expiryDate) === 'GOOD').length,
    expiringThisWeek: activeFoods.filter(f => {
      const days = getDaysUntilExpiry(f.expiryDate);
      return days >= 0 && days <= 7;
    }).length,
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    color: string;
  }) => (
    <div 
      className="rounded-2xl p-5 border"
      style={{ backgroundColor: color, borderColor: '#F0F0F0' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[#666666] mb-1">{title}</p>
          <p className="text-3xl text-[#1A1A1A]">{value}</p>
        </div>
        <div 
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <Icon className="w-5 h-5" style={{ color: '#666666' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-5 py-6">
        <h1 className="mb-6 text-center text-[#1A1A1A]">Overview</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            title="Total Foods"
            value={stats.total}
            icon={TrendingUp}
            color="#F9FAFB"
          />
          <StatCard
            title="Expiring Soon"
            value={stats.expiringSoon}
            icon={Clock}
            color="#FFF7ED"
          />
          <StatCard
            title="Good Condition"
            value={stats.good}
            icon={CheckCircle2}
            color="#F0FDF4"
          />
          <StatCard
            title="Expired"
            value={stats.expired}
            icon={AlertCircle}
            color="#FEF2F2"
          />
        </div>

        <div 
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#F0F0F0' }}
        >
          <h3 className="mb-2 text-[#1A1A1A]">Expiring This Week</h3>
          <p className="text-[#666666] mb-4">
            {stats.expiringThisWeek} {stats.expiringThisWeek === 1 ? 'item' : 'items'} expiring in the next 7 days
          </p>
          <div className="space-y-2">
            {activeFoods
              .filter(f => {
                const days = getDaysUntilExpiry(f.expiryDate);
                return days >= 0 && days <= 7;
              })
              .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate))
              .map(food => {
                const daysLeft = getDaysUntilExpiry(food.expiryDate);
                return (
                  <div 
                    key={food.id}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#F0F0F0' }}
                  >
                    <div>
                      <p className="text-[#1A1A1A]">{food.name}</p>
                      <p className="text-[#666666]">{food.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#666666]">
                        {daysLeft === 0 ? 'Today' : `${daysLeft}d`}
                      </p>
                    </div>
                  </div>
                );
              })}
            {stats.expiringThisWeek === 0 && (
              <p className="text-center text-[#999999] py-4">
                No items expiring this week
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}