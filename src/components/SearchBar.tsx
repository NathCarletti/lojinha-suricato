import type { ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Buscar produtos...' }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { //handleChange é uma função que atualiza o valor do input
    onChange(event.target.value);
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-2 px-4 pl-10 bg-gray-800 text-gray-200 rounded-lg 
                   border border-gray-700 focus:outline-none focus:border-beige-soft 
                   transition-colors placeholder-gray-500"
        />
        <FiSearch 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 
                    text-gray-500 w-4 h-4"
        /> 
      </div>
    </div>
  );
} 