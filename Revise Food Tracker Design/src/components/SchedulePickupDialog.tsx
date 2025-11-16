import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from './ui/calendar';

interface SchedulePickupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  foodName: string;
}

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM',
];

export function SchedulePickupDialog({ open, onOpenChange, foodName }: SchedulePickupDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      // You could save this to state or backend here
      onOpenChange(false);
      setSelectedDate(undefined);
      setSelectedTime(null);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: '#FFFFFF' }}>
        <DialogHeader>
          <DialogTitle className="text-[#1A1A1A] text-center">Schedule Pickup</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div 
            className="rounded-2xl p-4 mb-6 border"
            style={{ backgroundColor: '#F9FAFB', borderColor: '#F0F0F0' }}
          >
            <p className="text-[#666666] text-center">
              Schedule a time for our volunteer to pick up <span className="text-[#1A1A1A]">{foodName}</span> at your front door
            </p>
          </div>

          <h4 className="mb-3 text-[#666666] flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Select a Date
          </h4>
          
          <div className="mb-6 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-xl border"
              style={{
                borderColor: '#E5E5E5',
              }}
            />
          </div>

          {selectedDate && (
            <>
              <h4 className="mb-3 text-[#666666] flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Select a Time Slot
              </h4>
              
              <div className="space-y-2 mb-6">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all border"
                    style={{
                      backgroundColor: selectedTime === time ? '#1A1A1A' : '#FFFFFF',
                      color: selectedTime === time ? '#FFFFFF' : '#666666',
                      borderColor: selectedTime === time ? '#1A1A1A' : '#E5E5E5',
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              style={{ borderColor: '#E5E5E5', color: '#666666', backgroundColor: '#FFFFFF' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
              style={{ 
                backgroundColor: selectedDate && selectedTime ? '#1A1A1A' : '#E5E5E5',
                color: selectedDate && selectedTime ? '#FFFFFF' : '#999999',
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}