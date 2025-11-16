import { Button } from './ui/button';
import { Download, Trash2, User, Mail, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

interface SettingsPageProps {
  onLoadSampleData: () => void;
  onClearAllData: () => void;
}

export function SettingsPage({ onLoadSampleData, onClearAllData }: SettingsPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    // Save user info (you could persist this to localStorage or a backend)
    console.log('Saving user info:', { name, email, address });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-5 py-6">
        <h1 className="mb-6 text-center text-[#1A1A1A]">Settings</h1>

        <div className="space-y-4">
          {/* User Profile Section */}
          <div 
            className="rounded-2xl p-5 border"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#F0F0F0' }}
          >
            <h3 className="mb-4 text-[#1A1A1A]">Your Profile</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-[#666666] flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border"
                  style={{ 
                    backgroundColor: '#F5F5F5', 
                    borderColor: '#E5E5E5', 
                    color: '#1A1A1A' 
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#666666] flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border"
                  style={{ 
                    backgroundColor: '#F5F5F5', 
                    borderColor: '#E5E5E5', 
                    color: '#1A1A1A' 
                  }}
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-[#666666] flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="border"
                  style={{ 
                    backgroundColor: '#F5F5F5', 
                    borderColor: '#E5E5E5', 
                    color: '#1A1A1A' 
                  }}
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full mt-2"
                style={{ 
                  backgroundColor: '#1A1A1A',
                  color: '#FFFFFF'
                }}
              >
                Save Profile
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div 
            className="rounded-2xl p-5 border"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#F0F0F0' }}
          >
            <h3 className="mb-2 text-[#1A1A1A]">About</h3>
            <p className="text-[#666666] mb-2">
              Food Tracker helps you manage your pantry and reduce food waste.
            </p>
            <p className="text-[#999999]">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}