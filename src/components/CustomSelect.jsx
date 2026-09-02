import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function CustomSelect({
  value,
  onChange,
  options = [],
  title = '',
  minWidth = 130,
  placement = 'bottom'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);


  const formattedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label || String(opt.value) };
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = formattedOptions.find((o) => o.value === value) || formattedOptions[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="md-custom-select-container"
      ref={containerRef}
      style={{ minWidth }}
      title={title}>
      
      <button
        type="button"
        className={`md-custom-select-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}>
        
        <span className="md-select-label-text">{selectedOption ? selectedOption.label : value}</span>
        <ChevronDown size={13} className={`md-select-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen &&
      <div className={`md-custom-select-menu placement-${placement}`}>
          {formattedOptions.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`md-custom-select-option ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}>
              
                <span>{opt.label}</span>
                {isSelected && <Check size={13} color="#FF5F02" />}
              </button>);

        })}
        </div>
      }
    </div>);

}

export default CustomSelect;