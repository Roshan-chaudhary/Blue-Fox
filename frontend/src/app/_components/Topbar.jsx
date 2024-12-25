"use client";
import { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Flag from 'react-world-flags';

export default function TopBar() {
  const [selectedCurrency, setSelectedCurrency] = useState('Currency');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: 'EU', label: 'EURO' },
    { code: 'IN', label: 'INR' },
    { code: 'NP', label: 'NPR' },
    { code: 'US', label: 'USD' },
  ];

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.label);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="text-white z-50 text-sm">
      <div className="w-full mx-auto bg-[#615EFF] flex justify-between items-center py-2 px-8 2xl:px-56 text-base">

        <div className="w-full text-center hidden md:block">
          <strong>Special Sale - Special Discounts on All Products</strong>
        </div>

        
        <div className="flex items-center space-x-2 ml-auto lg:ml-0">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center bg-[#615EFF] px-2 py-1 rounded-md text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedCurrency}</span>
              <RiArrowDropDownLine className="ml-2 text-xl" />
            </button>

            {isOpen && (
              <div
                className="absolute bg-white text-black w-40 mt-1 rounded-md shadow-lg z-50"
                style={{ top: '100%', left: 0 }}
              >
                {currencies.map((currency) => (
                  <div
                    key={currency.code}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    <Flag code={currency.code} className="inline-block mr-2 w-6 h-4" />
                    {currency.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
