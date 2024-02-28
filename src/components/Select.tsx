import { useState } from "react";
import Button from "./Button";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface SelectProps<T> {
  options: T[];
  value: T[];
  onChange: (value: T[]) => void;
}

export default function Select<T extends { name: string }>({
  options,
  value,
  onChange,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button className="w-full pr-10" onClick={() => setIsOpen(true)}>
        <span className="block truncate">
          {value.length ? `${value.length} selected` : 'Click to select'}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Button>

      {isOpen && (
        <div className="absolute mt-1 w-full z-10">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <ul className="max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => {
              const selected = value.includes(option);

              return (
                <li
                  key={option.name}
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900"
                  onClick={() =>
                    onChange(
                      selected
                        ? value.filter((opt) => opt !== option)
                        : [...value, option]
                    )
                  }
                >
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.name}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
