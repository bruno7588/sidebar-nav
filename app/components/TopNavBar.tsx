// TopNavBar.tsx
'use client';
import React from 'react';
import { Moon, SecuritySafe } from 'iconsax-react';

const TopNavBar: React.FC = () => (
  <nav className="w-full h-[70px] flex items-center justify-end px-6 bg-[#20222A] border-b border-[#383d4c]">
    {/* Right-aligned controls */}
    <div className="flex items-center gap-4">
      {/* Exit Admin button */}
      <button
        className="px-4 py-2 border border-[#bfc2cc] rounded-lg text-[#bfc2cc] font-bold bg-transparent hover:bg-[#232323] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#bfc2cc] focus:ring-offset-2 focus:ring-offset-[#232323] shadow-none text-sm"
      >
        Exit Admin
      </button>
      {/* Moon icon (theme toggle) */}
      <button className="text-[#bfc2cc] hover:text-white transition-colors text-xl">
        <Moon size={22} color="#bfc2cc" variant="Linear" />
      </button>
      {/* SecuritySafe icon (security/settings) */}
      <button className="text-[#bfc2cc] hover:text-white transition-colors text-xl">
        <SecuritySafe size={22} color="#bfc2cc" variant="Linear" />
      </button>
    </div>
  </nav>
);

export default TopNavBar; 