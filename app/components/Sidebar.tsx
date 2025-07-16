'use client';
import React, { useState } from 'react';
import {
  Home,
  User,
  Book,
  Chart,
  Hierarchy,
  TaskSquare,
  CalendarTick,
  Setting2,
  Teacher,
  ArrowUp2,
  SidebarLeft,
  SidebarRight,
  MessageQuestion,
} from 'iconsax-react';

// Tooltip component with left-pointing arrow, matching Figma design
const Tooltip = ({ children, text, ml = 'ml-4', show = true }: { children: React.ReactNode; text: string; ml?: string; show?: boolean }) => (
  <div className="relative group">
    {children}
    {show && (
      <div className={`pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-5 ${ml} z-10 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        {/* Arrow */}
        <div className="w-0 h-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-[#0F1014] mr-[-1px]"></div>
        {/* Tooltip box */}
        <span className="whitespace-nowrap rounded-lg bg-[#0F1014] px-3 py-2 text-white text-[14px] font-poppins font-normal shadow-lg flex items-center">
          {text}
        </span>
      </div>
    )}
  </div>
);

// Sidebar navigation structure based on Figma
const navItems = [
  { label: 'Home', icon: (color: string, variant: 'Linear' | 'Bold') => <Home size={20} color={color} variant={variant} /> },
  {
    label: 'People & Teams',
    icon: (color: string, variant: 'Linear' | 'Bold') => <User size={20} color={color} variant={variant} />,
    subMenu: [
      { label: 'People' },
      { label: 'Teams' },
      { label: 'Cohorts' },
    ],
  },
  {
    label: 'Content & Courses',
    icon: (color: string, variant: 'Linear' | 'Bold') => <Book size={20} color={color} variant={variant} />,
    subMenu: [
      { label: '5Mins Courses' },
      { label: 'Your lessons' },
      { label: 'Your Courses' },
      { label: 'SCORM' },
    ],
  },
  { label: 'Reports', icon: (color: string, variant: 'Linear' | 'Bold') => <Chart size={20} color={color} variant={variant} /> },
  { label: 'Skills', icon: (color: string, variant: 'Linear' | 'Bold') => <Hierarchy size={20} color={color} variant={variant} /> },
  { label: 'Learning Records', icon: (color: string, variant: 'Linear' | 'Bold') => <TaskSquare size={20} color={color} variant={variant} /> },
  { label: 'Events', icon: (color: string, variant: 'Linear' | 'Bold') => <CalendarTick size={20} color={color} variant={variant} /> },
  { label: 'Account & Settings', icon: (color: string, variant: 'Linear' | 'Bold') => <Setting2 size={20} color={color} variant={variant} /> },
];

// Bottom group nav items
const bottomNavItems = [
  { label: '5Mins Academy', icon: (color: string, variant: 'Linear' | 'Bold') => <Teacher size={20} color={color} variant={variant} /> },
  { label: 'Help & Support', icon: (color: string, variant: 'Linear' | 'Bold') => <MessageQuestion size={20} color={color} variant={variant} /> },
];

const Sidebar: React.FC = () => {
  // State to track which sub-menu is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // State to track selected main and submenu item
  const [selected, setSelected] = useState<{ main: number; sub?: number }>({ main: 0 });
  // State to track collapsed/expanded sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Only one state: collapsed. Animations for width and text opacity will run together.

  // Toggle sub-menu open/close
  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Handle selecting a main menu item
  const handleSelectMain = (idx: number) => {
    setSelected({ main: idx });
    setOpenIndex(null); // Optionally close submenus when selecting a main item
  };

  // Handle selecting a submenu item
  const handleSelectSub = (mainIdx: number, subIdx: number) => {
    setSelected({ main: mainIdx, sub: subIdx });
  };

  // Colors for selected and default states
  const selectedColor = '#FFBB38';
  const defaultColor = '#bfc2cc';
  const selectedText = 'font-bold text-[#FFBB38]';
  const defaultText = 'text-[#bfc2cc]';
  const selectedSubText = 'font-bold text-[#FFBB38]';
  const defaultSubText = 'text-[#9ea4b3]';

  return (
    <aside
      // Smoother animation: duration-500 and a less dramatic cubic-bezier for width and other properties
      className="flex flex-col h-screen border-r border-[#383d4c] p-4 transition-all duration-500 bg-[#20222A]"
      style={{
        width: collapsed ? 84 : 244,
        minWidth: collapsed ? 84 : 244,
        maxWidth: collapsed ? 84 : 244,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Slightly less smooth curve
      }}
    >
      {/* Top section: Logo and collapse/expand button */}
      <div className={`flex items-center h-[45px] ${collapsed ? 'justify-center' : 'justify-between'} mb-1`}>
        {/* Logo (replace src with your logo if needed) */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Logo"
            className={`h-[20px] w-auto px-4 transition-all duration-200
              ${collapsed ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
            style={{
              transitionProperty: 'opacity, transform',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '200ms',
            }}
          />
        </div>
        {/* Collapse/Expand button */}
        <Tooltip text={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} ml={collapsed ? 'ml-2' : 'ml-4'}>
          <button
            className={
              collapsed
                ? 'h-[45px] w-[45px] p-0 m-0 flex items-center justify-center rounded hover:bg-[#2D313D] transition-colors mx-auto mr-4'
                : 'p-2 ml-2 rounded hover:bg-[#2D313D] transition-colors'
            }
            onClick={() => {
              if (collapsed) setOpenIndex(null); // Close all submenus when expanding
              setCollapsed((prev) => !prev); // Toggle collapsed state
            }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ width: 45, height: 45, minWidth: 45, minHeight: 45, position: 'relative' }}
          >
            {/* Fade between SidebarLeft and SidebarRight icons */}
            <span className="relative block w-5 h-5 overflow-hidden" style={{ width: 20, height: 20 }}>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionProperty: 'opacity', width: 20, height: 20 }}
              >
                <SidebarRight size={20} color="#bfc2cc" style={{ width: 20, height: 20, transform: 'translateX(-1px)' }} />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                style={{ transitionProperty: 'opacity', width: 20, height: 20 }}
              >
                <SidebarLeft size={20} color="#bfc2cc" style={{ width: 20, height: 20 }} />
              </span>
            </span>
          </button>
        </Tooltip>
      </div>
      {/* Navigation items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item, idx) => {
          // Main menu is selected if it's selected and no sub-menu is selected
          const isMainSelected = selected.main === idx && selected.sub === undefined;
          const isSubMenuOpen = openIndex === idx && !collapsed;
          // Icon should be bold and colored ONLY if main menu is selected (not a sub-menu)
          const isIconSelected = selected.main === idx && selected.sub === undefined;
          // Always render icon and text container for animation
          return (
            <div key={item.label}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.subMenu ? 'justify-between' : ''} hover:bg-[#2D313D]`}
                onClick={() => {
                  // If sidebar is collapsed and user clicks on 'People & Teams' or 'Content & Courses', expand and open submenu
                  if (collapsed && (item.label === 'People & Teams' || item.label === 'Content & Courses')) {
                    setCollapsed(false);
                    setOpenIndex(idx);
                  } else if (item.subMenu) {
                    handleToggle(idx);
                  } else {
                    handleSelectMain(idx);
                  }
                }}
              >
                {/* Icon and fixed-width text container */}
                <div className="flex items-center gap-3">
                  {/* Tooltip only when collapsed */}
                  {collapsed ? (
                    <Tooltip text={item.label}>
                      <div>
                        {item.icon(
                          isIconSelected ? selectedColor : defaultColor,
                          isIconSelected ? 'Bold' : 'Linear'
                        )}
                      </div>
                    </Tooltip>
                  ) : (
                    item.icon(
                      isIconSelected ? selectedColor : defaultColor,
                      isIconSelected ? 'Bold' : 'Linear'
                    )
                  )}
                  {/* Fixed-width text container: always present, text fades in/out */}
                  <div className="w-[120px] overflow-hidden">
                    <span
                      className={`whitespace-nowrap text-[14px] font-poppins transition-opacity duration-200
                        ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
                        ${isMainSelected ? selectedText : defaultText}`}
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: collapsed ? '0ms' : '100ms',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
                {/* Show arrow if has sub-menu */}
                {item.subMenu && (
                  <ArrowUp2
                    size={16}
                    color={defaultColor}
                    className={`transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </div>
              {/* Sub-menu with animated expand/collapse (only when expanded) */}
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isSubMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} `}
                style={{ pointerEvents: isSubMenuOpen ? 'auto' : 'none' }}
              >
                {item.subMenu && (
                  <div className="flex flex-col ml-8">
                    {item.subMenu.map((sub, subIdx) => {
                      const isSubSelected = selected.main === idx && selected.sub === subIdx;
                      return (
                        <div
                          key={sub.label}
                          className={`py-2 pr-4 rounded cursor-pointer text-[14px] font-poppins transition-all duration-200 hover:bg-[#2D313D] group`}
                          onClick={() => handleSelectSub(idx, subIdx)}
                        >
                          {/* Submenu text with fade animation (opacity animates with sidebar width) */}
                          <span
                            // Fade in with 100ms delay when expanding, fade out instantly when collapsing
                            className={`transition-opacity duration-200
                              ${isSubMenuOpen && !collapsed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                              ${isSubSelected ? selectedSubText : defaultSubText}`}
                            style={{
                              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                              transitionDelay: !collapsed && isSubMenuOpen ? '100ms' : '0ms',
                            }}
                          >
                            {sub.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </nav>
      {/* Bottom group: 5Mins Academy & Help & Support pinned to bottom */}
      <div className="flex flex-col gap-1 mt-auto">
        {bottomNavItems.map((item, idx) => {
          // For bottom group, use a high index offset to avoid conflicts with main nav selection
          const bottomIdx = navItems.length + idx;
          const isMainSelected = selected.main === bottomIdx && selected.sub === undefined;
          const isIconSelected = selected.main === bottomIdx && selected.sub === undefined;
          return (
            <div key={item.label}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-[#2D313D]`}
                onClick={() => handleSelectMain(bottomIdx)}
                style={{ minHeight: 48 }} // Ensures vertical space is always reserved
              >
                <div className="flex items-center gap-3">
                  <Tooltip text={item.label} show={collapsed}>
                    <div>
                      {item.icon(
                        isIconSelected ? selectedColor : '#9EA4B3',
                        isIconSelected ? 'Bold' : 'Linear'
                      )}
                    </div>
                  </Tooltip>
                  <div className="w-[120px] overflow-hidden">
                    <span
                      className={`text-[14px] font-poppins transition-opacity duration-200
                        ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
                        ${isMainSelected ? 'font-bold text-[#FFBB38]' : 'text-[#9EA4B3]'}`}
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: collapsed ? '0ms' : '100ms',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Powered by section (optional, can be removed or replaced) */}
      {collapsed ? (
        <div className="px-8 pb-6 pt-2 h-[56px]" />
      ) : (
        <div className="px-8 pb-6 pt-2">
          <p className="text-[#9ea4b3] text-xs font-poppins mb-2">Powered by</p>
          {/* Placeholder for logo - replace with your logo if needed */}
          <div className="h-5 w-24 bg-[#00D3BF] rounded" />
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 