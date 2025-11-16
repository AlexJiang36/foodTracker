import { useState, useRef, useEffect } from 'react';
import { Food } from '../types/food';
import { getExpiryStatus, getExpiryText, getDaysUntilExpiry } from '../utils/foodUtils';
import { Heart, Pencil, X } from 'lucide-react';

interface SwipeableFoodItemProps {
  food: Food;
  onDelete: (id: string) => void;
  onDonate: (id: string) => void;
  onEdit: (food: Food) => void;
  onConsume: (id: string) => void;
}

export function SwipeableFoodItem({ food, onDelete, onDonate, onEdit, onConsume }: SwipeableFoodItemProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const itemRef = useRef<HTMLDivElement>(null);

  const status = getExpiryStatus(food.expiryDate);
  const expiryText = getExpiryText(food);

  // Use lighter, more subtle colors
  const getStatusColor = (status: string): string => {
    const daysLeft = getDaysUntilExpiry(food.expiryDate);
    
    // White background for foods with more than 4 days left
    if (daysLeft > 4) {
      return '#FFFFFF';
    }
    
    switch (status) {
      case 'EXPIRED':
        return '#E5E5E5'; // Grey for expired
      case 'EXPIRING_SOON':
        return '#FFD6D6'; // More saturated red for ≤4 days
      case 'GOOD':
        return '#FFFFFF'; // White
      default:
        return '#F9FAFB';
    }
  };

  const statusColor = getStatusColor(status);

  // Calculate lighter shade of the background color for delete button
  const getLighterShade = (hexColor: string): string => {
    return '#FECACA'; // Light red for delete
  };

  const deleteButtonColor = getLighterShade(statusColor);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = translateX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].clientX - startX.current;
    const newTranslateX = currentX.current + diff;
    
    // Only allow left swipe (negative values), max swipe distance is -120px
    if (newTranslateX < 0 && newTranslateX > -120) {
      setTranslateX(newTranslateX);
    } else if (newTranslateX < -120) {
      setTranslateX(-120);
    } else if (newTranslateX > 0) {
      setTranslateX(0);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap to either open (-120) or closed (0) position
    if (translateX < -60) {
      setTranslateX(-120);
    } else {
      setTranslateX(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    currentX.current = translateX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX.current;
    const newTranslateX = currentX.current + diff;
    
    if (newTranslateX < 0 && newTranslateX > -120) {
      setTranslateX(newTranslateX);
    } else if (newTranslateX < -120) {
      setTranslateX(-120);
    } else if (newTranslateX > 0) {
      setTranslateX(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (translateX < -60) {
      setTranslateX(-120);
    } else {
      setTranslateX(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, translateX]);

  // Close swipe when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node) && translateX < 0) {
        setTranslateX(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [translateX]);

  const handleDelete = () => {
    onDelete(food.id);
    setTranslateX(0);
  };

  const handleDonate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDonate(food.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(food);
  };

  const handleConsume = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConsume(food.id);
  };

  return (
    <div ref={itemRef} className="relative overflow-hidden">
      {/* Delete button background - only visible when swiped */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[120px] flex items-center justify-center rounded-xl"
        style={{ backgroundColor: statusColor }}
      >
        <button
          onClick={handleDelete}
          className="p-3 transition-opacity"
          style={{ opacity: translateX < -20 ? 1 : 0 }}
        >
          <X className="w-6 h-6" style={{ color: '#DC2626' }} />
        </button>
      </div>

      {/* Main content */}
      <div
        className="relative flex items-center transition-transform touch-pan-y rounded-xl border"
        style={{
          backgroundColor: statusColor,
          borderColor: '#F0F0F0',
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Consume button on the left */}
        <div className="pl-4">
          <button
            onClick={handleConsume}
            className="w-6 h-6 rounded-full border-2 transition-all hover:bg-black/5"
            style={{ 
              borderColor: '#666666',
              backgroundColor: 'transparent',
            }}
            aria-label="Mark as consumed"
          />
        </div>

        <div className="flex-1 px-5 py-4">
          <h3 className="mb-1 text-[#1A1A1A]">{food.name}</h3>
          <p className="text-[#666666] mb-1">{food.quantity}</p>
          <p className="text-[#666666]">{expiryText}</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pr-5">
          {/* Donation button with clear visual separation */}
          <button
            onClick={handleDonate}
            className="p-2.5 rounded-full transition-colors hover:bg-black/5"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
            aria-label="Mark as donated"
          >
            <Heart className="w-5 h-5" style={{ color: '#666666' }} />
          </button>

          {/* Edit button */}
          <button
            onClick={handleEdit}
            className="p-2.5 rounded-full transition-colors hover:bg-black/5"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
            aria-label="Edit food"
          >
            <Pencil className="w-5 h-5" style={{ color: '#666666' }} />
          </button>
        </div>
      </div>
    </div>
  );
}