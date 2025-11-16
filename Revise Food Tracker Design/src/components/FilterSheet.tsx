import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { FoodCategory, ExpiryStatus } from '../types/food';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: FoodCategory;
  onCategoryChange: (category: FoodCategory) => void;
  selectedCondition: ExpiryStatus | 'All';
  onConditionChange: (condition: ExpiryStatus | 'All') => void;
}

const categories: (FoodCategory | 'Other')[] = ['All', 'Dairy', 'Bakery', 'Meat', 'Vegetables', 'Other'];
const conditions: (ExpiryStatus | 'All')[] = ['All', 'GOOD', 'EXPIRING_SOON', 'EXPIRED'];

const conditionLabels = {
  'All': 'All',
  'GOOD': 'Good',
  'EXPIRING_SOON': 'Expiring Soon',
  'EXPIRED': 'Expired',
};

export function FilterSheet({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
  selectedCondition,
  onConditionChange,
}: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="rounded-t-3xl border-none"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <SheetHeader>
          <SheetTitle className="text-center text-[#1A1A1A]">Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6 pb-6 px-8">
          {/* Food Type Filter */}
          <div>
            <h3 className="mb-4 text-[#666666] pl-2">Food Type</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category as FoodCategory)}
                  className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm"
                  style={{
                    backgroundColor: selectedCategory === category ? '#1A1A1A' : '#F5F5F5',
                    color: selectedCategory === category ? '#FFFFFF' : '#666666',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div>
            <h3 className="mb-4 text-[#666666] pl-2">Condition</h3>
            <div className="flex flex-wrap gap-2">
              {conditions.map(condition => (
                <button
                  key={condition}
                  onClick={() => onConditionChange(condition)}
                  className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm"
                  style={{
                    backgroundColor: selectedCondition === condition ? '#1A1A1A' : '#F5F5F5',
                    color: selectedCondition === condition ? '#FFFFFF' : '#666666',
                  }}
                >
                  {conditionLabels[condition]}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button - Centered */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="px-10 py-2.5 rounded-full transition-colors text-sm"
              style={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}