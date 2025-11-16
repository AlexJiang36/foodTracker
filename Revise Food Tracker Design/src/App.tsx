import { useState } from 'react';
import { Food, FoodCategory, ExpiryStatus } from './types/food';
import { getSampleFoods, getExpiryStatus } from './utils/foodUtils';
import { SwipeableFoodItem } from './components/SwipeableFoodItem';
import { AddFoodDialog } from './components/AddFoodDialog';
import { FilterSheet } from './components/FilterSheet';
import { SchedulePickupDialog } from './components/SchedulePickupDialog';
import { OverviewPage } from './components/OverviewPage';
import { DonatedPage } from './components/DonatedPage';
import { SettingsPage } from './components/SettingsPage';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { ClipboardList, BarChart3, Heart, Settings, Plus, Search, Filter } from 'lucide-react';

type Tab = 'all' | 'overview' | 'donated' | 'settings';

export default function App() {
  const [foods, setFoods] = useState<Food[]>(getSampleFoods());
  const [currentTab, setCurrentTab] = useState<Tab>('all');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [selectedCondition, setSelectedCondition] = useState<ExpiryStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [schedulePickupOpen, setSchedulePickupOpen] = useState(false);
  const [donatingFoodName, setDonatingFoodName] = useState('');
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const categories: FoodCategory[] = ['All', 'Dairy', 'Bakery', 'Meat', 'Vegetables', 'Other'];

  const handleAddFood = (foodData: Omit<Food, 'id' | 'createdAt'>) => {
    if (editingFood) {
      // Update existing food
      setFoods(foods.map(f => 
        f.id === editingFood.id 
          ? { ...foodData, id: editingFood.id, createdAt: f.createdAt }
          : f
      ));
      setEditingFood(null);
    } else {
      // Add new food
      const newFood: Food = {
        ...foodData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setFoods([...foods, newFood]);
    }
  };

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  const handleDonateFood = (id: string) => {
    setFoods(foods.map(f => 
      f.id === id 
        ? { ...f, isDonated: true, donationDate: new Date() }
        : f
    ));
    setDonatingFoodName(foods.find(f => f.id === id)?.name || '');
    setSchedulePickupOpen(true);
  };

  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    setDialogOpen(true);
  };

  const handleConsumeFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  const handleOpenAddDialog = () => {
    setEditingFood(null);
    setDialogOpen(true);
  };

  const handleLoadSampleData = () => {
    setFoods(getSampleFoods());
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setFoods([]);
    }
  };

  // Filter and sort foods
  const getFilteredFoods = () => {
    let filtered = foods.filter(f => !f.isDonated);

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }

    // Condition filter
    if (selectedCondition !== 'All') {
      filtered = filtered.filter(f => getExpiryStatus(f.expiryDate) === selectedCondition);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by expiry date (closest first)
    return filtered.sort((a, b) => 
      a.expiryDate.getTime() - b.expiryDate.getTime()
    );
  };

  const filteredFoods = getFilteredFoods();

  return (
    <div 
      className="min-h-screen flex flex-col max-w-md mx-auto"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Header */}
      {currentTab === 'all' && (
        <div className="sticky top-0 z-10" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between px-5 pt-6 pb-4">
            <h1 className="text-[#1A1A1A]">My Pantry</h1>
            <Button
              onClick={handleOpenAddDialog}
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
            >
              <Plus className="w-7 h-7" style={{ color: '#1A1A1A' }} />
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="px-5 pb-4 flex gap-3">
            <div className="relative flex-1">
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
                style={{ color: '#999999' }}
              />
              <Input
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 border-none rounded-xl"
                style={{ 
                  backgroundColor: '#F5F5F5',
                  color: '#1A1A1A'
                }}
              />
            </div>
            <Button
              onClick={() => setFilterOpen(true)}
              variant="outline"
              className="px-4 border-none rounded-xl hover:bg-gray-100"
              style={{ 
                backgroundColor: '#F5F5F5',
                color: '#1A1A1A'
              }}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {currentTab === 'all' && (
        <div className="flex-1 overflow-y-auto pb-20 px-5">
          {filteredFoods.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <p style={{ color: '#999999' }}>
                {searchQuery || selectedCategory !== 'All' || selectedCondition !== 'All'
                  ? 'No foods found matching your filters'
                  : 'No foods in your pantry yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFoods.map(food => (
                <SwipeableFoodItem
                  key={food.id}
                  food={food}
                  onDelete={handleDeleteFood}
                  onDonate={handleDonateFood}
                  onEdit={handleEditFood}
                  onConsume={handleConsumeFood}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {currentTab === 'overview' && (
        <OverviewPage foods={foods} />
      )}

      {currentTab === 'donated' && (
        <DonatedPage foods={foods} />
      )}

      {currentTab === 'settings' && (
        <SettingsPage
          onLoadSampleData={handleLoadSampleData}
          onClearAllData={handleClearAllData}
        />
      )}

      {/* Bottom Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#F0F0F0'
        }}
      >
        <div className="flex items-center justify-around px-8 py-4">
          <button
            onClick={() => setCurrentTab('all')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <ClipboardList 
              className="w-6 h-6" 
              style={{ 
                color: currentTab === 'all' ? '#1A1A1A' : '#CCCCCC',
                strokeWidth: currentTab === 'all' ? 2.5 : 2
              }}
            />
            <span 
              className="text-xs"
              style={{ 
                color: currentTab === 'all' ? '#1A1A1A' : '#CCCCCC'
              }}
            >
              All
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('overview')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <BarChart3 
              className="w-6 h-6" 
              style={{ 
                color: currentTab === 'overview' ? '#1A1A1A' : '#CCCCCC',
                strokeWidth: currentTab === 'overview' ? 2.5 : 2
              }}
            />
            <span 
              className="text-xs"
              style={{ 
                color: currentTab === 'overview' ? '#1A1A1A' : '#CCCCCC'
              }}
            >
              Overview
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('donated')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <Heart 
              className="w-6 h-6" 
              style={{ 
                color: currentTab === 'donated' ? '#1A1A1A' : '#CCCCCC',
                strokeWidth: currentTab === 'donated' ? 2.5 : 2
              }}
            />
            <span 
              className="text-xs"
              style={{ 
                color: currentTab === 'donated' ? '#1A1A1A' : '#CCCCCC'
              }}
            >
              Donated
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <Settings 
              className="w-6 h-6" 
              style={{ 
                color: currentTab === 'settings' ? '#1A1A1A' : '#CCCCCC',
                strokeWidth: currentTab === 'settings' ? 2.5 : 2
              }}
            />
            <span 
              className="text-xs"
              style={{ 
                color: currentTab === 'settings' ? '#1A1A1A' : '#CCCCCC'
              }}
            >
              Settings
            </span>
          </button>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AddFoodDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingFood(null);
        }}
        onSave={handleAddFood}
        editFood={editingFood}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedCondition={selectedCondition}
        onConditionChange={setSelectedCondition}
      />

      {/* Schedule Pickup Dialog */}
      <SchedulePickupDialog
        open={schedulePickupOpen}
        onOpenChange={setSchedulePickupOpen}
        foodName={donatingFoodName}
      />
    </div>
  );
}