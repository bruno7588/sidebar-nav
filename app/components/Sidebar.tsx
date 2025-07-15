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
} from 'iconsax-react';

// Tooltip component with left-pointing arrow, matching Figma design
const Tooltip = ({ children, text, ml = 'ml-4' }: { children: React.ReactNode; text: string; ml?: string }) => (
  <div className="relative group">
    {children}
    <div className={`pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ${ml} z-10 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
      {/* Arrow */}
      <div className="w-0 h-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-[#0F1014] mr-[-1px]"></div>
      {/* Tooltip box */}
      <span className="whitespace-nowrap rounded-lg bg-[#0F1014] px-3 py-2 text-white text-base font-normal shadow-lg flex items-center">
        {text}
      </span>
    </div>
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
  { label: '5Mins Academy', icon: (color: string, variant: 'Linear' | 'Bold') => <Teacher size={20} color={color} variant={variant} /> },
];

const Sidebar: React.FC = () => {
  // State to track which sub-menu is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // State to track selected main and submenu item
  const [selected, setSelected] = useState<{ main: number; sub?: number }>({ main: 0 });
  // State to track collapsed/expanded sidebar
  const [collapsed, setCollapsed] = useState(false);

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
      className="flex flex-col h-screen border-r border-[#383d4c] p-4 transition-all duration-300 ease-in-out bg-[#20222A]"
      style={{ width: collapsed ? 64 : 244, minWidth: collapsed ? 64 : 244, maxWidth: collapsed ? 64 : 244 }}
    >
      {/* Top section: Logo and collapse/expand button */}
      <div className={`flex items-center h-[45px] ${collapsed ? 'justify-center' : 'justify-between'} mb-1`}>
        {/* Logo (replace src with your logo if needed) */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-[20px] w-auto px-4 transition-all duration-200" />
        </div>
        {/* Collapse/Expand button */}
        <Tooltip text={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} ml={collapsed ? 'ml-2' : 'ml-4'}>
          <button
            className={
              collapsed
                ? 'h-[45px] w-[45px] p-0 m-0 flex items-center justify-center rounded hover:bg-[#232323] transition-colors mx-auto mr-4'
                : 'p-2 ml-2 rounded hover:bg-[#232323] transition-colors'
            }
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                setOpenIndex(null); // Close all submenus when expanding
              } else {
                setCollapsed(true);
              }
            }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarLeft size={20} color="#bfc2cc" className={collapsed ? 'rotate-180 transition-transform mx-auto' : 'transition-transform'} />
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
          // Render only icon and tooltip when collapsed
          if (collapsed) {
            return (
              <Tooltip key={item.label} text={item.label}>
                <div
                  className={`flex items-center justify-center h-[45px] w-[45px] mr-4 my-1 rounded-lg cursor-pointer transition-colors hover:bg-[#2D313D]`}
                  onClick={() => {
                    // If 'People & Teams' or 'Content & Courses' is clicked, expand sidebar
                    if (item.label === 'People & Teams' || item.label === 'Content & Courses') {
                      setCollapsed(false);
                      setOpenIndex(idx);
                    } else {
                      handleSelectMain(idx);
                    }
                  }}
                >
                  {item.icon(
                    isIconSelected ? selectedColor : defaultColor,
                    isIconSelected ? 'Bold' : 'Linear'
                  )}
                </div>
              </Tooltip>
            );
          }
          // Expanded sidebar: show icon, text, and submenus
          return (
            <div key={item.label}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.subMenu ? 'justify-between' : ''} hover:bg-[#2D313D]`}
                onClick={() => {
                  if (item.subMenu) {
                    handleToggle(idx);
                  } else {
                    handleSelectMain(idx);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  {item.icon(
                    isIconSelected ? selectedColor : defaultColor,
                    isIconSelected ? 'Bold' : 'Linear'
                  )}
                  <span className={`text-[14px] font-poppins ${isMainSelected ? selectedText : defaultText}`}>{item.label}</span>
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
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isSubMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
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
                          <span className={isSubSelected ? selectedSubText : defaultSubText}>{sub.label}</span>
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
      {/* Powered by section (optional, can be removed or replaced) */}
      {!collapsed && (
        <div className="px-8 pb-6 pt-2 mt-auto">
          <p className="text-[#9ea4b3] text-xs font-poppins mb-2">Powered by</p>
          {/* Placeholder for logo - replace with your logo if needed */}
          <div className="h-5 w-24 bg-[#00D3BF] rounded" />
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 