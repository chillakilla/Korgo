import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  subItems: string[];
}

const MenuButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef<number>();

  {
    /* Menu category */
  }
  const menuItems: MenuItem[] = [{ name: 'Category', subItems: ['All', 'Motors', 'Coolers'] }];

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowMenu(false);
    }, 300);
  };

  const handleSubMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleSubMenuMouseLeave = () => {
    handleMouseLeave();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center px-4 py-2 rounded-xl font-bold text-main-color bg-white hover:bg-gray-200 transform transition-transform duration-200 hover:scale-90"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Menu
      </button>

      {/* Dropdown menu Div Start */}
      <div onMouseEnter={handleSubMenuMouseEnter} onMouseLeave={handleSubMenuMouseLeave}>
        {showMenu && (
          <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
            <div className="py-1">
              {menuItems.map((item, index) => (
                <div key={index} className="px-4 py-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="flex flex-col mt-1 font-medium">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={`/products/${subItem.toLowerCase()}`}>
                        <p className="hover:text-blue-500">{subItem}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Dropdown menu Div End */}
    </div>
  );
};

export default MenuButton;
