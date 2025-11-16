import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Food, FoodCategory } from '../types/food';

interface AddFoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (food: Omit<Food, 'id' | 'createdAt'>) => void;
  editFood?: Food | null;
}

const categories: FoodCategory[] = ['Dairy', 'Bakery', 'Meat', 'Vegetables', 'Other'];
const units = ['pcs', 'kg', 'L', 'g', 'mg', 'Other'];

export function AddFoodDialog({ open, onOpenChange, onSave, editFood }: AddFoodDialogProps) {
  const [name, setName] = useState('');
  const [quantityAmount, setQuantityAmount] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('pcs');
  const [customUnit, setCustomUnit] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Dairy');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (editFood) {
      setName(editFood.name);
      // Parse existing quantity string like "4 cups" or "500 g"
      const quantityParts = editFood.quantity.split(' ');
      if (quantityParts.length >= 2) {
        setQuantityAmount(quantityParts[0]);
        const unit = quantityParts[1];
        // Check if it's a standard unit or custom
        if (units.includes(unit)) {
          setQuantityUnit(unit);
          setCustomUnit('');
        } else {
          setQuantityUnit('Other');
          setCustomUnit(unit);
        }
      } else {
        setQuantityAmount(editFood.quantity);
        setQuantityUnit('pcs');
        setCustomUnit('');
      }
      setCategory(editFood.category);
      setExpiryDate(editFood.expiryDate.toISOString().split('T')[0]);
    } else {
      setName('');
      setQuantityAmount('');
      setQuantityUnit('pcs');
      setCustomUnit('');
      setCategory('Dairy');
      setExpiryDate('');
    }
  }, [editFood, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUnit = quantityUnit === 'Other' ? customUnit : quantityUnit;
    onSave({
      name,
      quantity: `${quantityAmount} ${finalUnit}`,
      category,
      expiryDate: new Date(expiryDate),
      isDonated: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: '#FFFFFF' }}>
        <DialogHeader>
          <DialogTitle className="text-[#1A1A1A]">{editFood ? 'Edit Food' : 'Add Food'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-[#666666]">Food Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Yogurt"
              required
              className="mt-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}
            />
          </div>

          <div>
            <Label htmlFor="quantityAmount" className="text-[#666666]">Quantity Amount</Label>
            <Input
              id="quantityAmount"
              type="number"
              value={quantityAmount}
              onChange={(e) => setQuantityAmount(e.target.value)}
              placeholder="e.g., 4"
              required
              min="0"
              step="any"
              className="mt-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}
            />
          </div>

          <div>
            <Label htmlFor="quantityUnit" className="text-[#666666]">Quantity Unit</Label>
            <Select value={quantityUnit} onValueChange={(value) => setQuantityUnit(value)}>
              <SelectTrigger className="mt-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#FFFFFF' }}>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {quantityUnit === 'Other' && (
              <Input
                id="customUnit"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                placeholder="e.g., cups"
                required
                className="mt-2"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}
              />
            )}
          </div>

          <div>
            <Label htmlFor="category" className="text-[#666666]">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as FoodCategory)}>
              <SelectTrigger className="mt-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#FFFFFF' }}>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="expiryDate" className="text-[#666666]">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="mt-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#1A1A1A' }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              style={{ borderColor: '#E5E5E5', color: '#666666', backgroundColor: '#FFFFFF' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
            >
              {editFood ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}