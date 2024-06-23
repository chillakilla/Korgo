import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  subItems: string[];
}

const Menu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef<number>();

  const menuItems: MenuItem[] = [
    { name: 'Electronics', subItems: ['phones', 'Computers'] },
    { name: 'Motors', subItems: ['Car', 'Bike'] }
  ];

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
        className="flex font-bold text-main-color items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Menu
      </button>

      {/* Dropdown menu Div Start */}
      <div onMouseEnter={handleSubMenuMouseEnter} onMouseLeave={handleSubMenuMouseLeave}>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg">
            <div className="py-1">
              {menuItems.map((item, index) => (
                <div key={index} className="px-4 py-2">
                  <div className="font-semibold">{item.name}</div>
                  <div className="flex flex-col">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={`/${subItem.toLowerCase()}`}>
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

export default Menu;
