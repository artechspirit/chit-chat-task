import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import default styles

interface DatePickerProps {
  dateProps?: string;
  onSelectDate?: (day: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ dateProps, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  // Handle date selection
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    if (typeof onSelectDate === "function") {
      onSelectDate(formatDate(day));
    }
    setFocusedInput(false); // Close the calendar after selecting a date
  };

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Parse input date from DD/MM/YYYY format
  const parseDate = (input: string): Date | null => {
    if (!input) return null;
    const parts = input.split("/");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const parsedDate = parseDate(inputDate);
    setSelectedDate(parsedDate);
  };

  useEffect(() => {
    if (dateProps) {
      const parsedDate = parseDate(dateProps);
      setSelectedDate(parsedDate);
    }
  }, [dateProps]);

  return (
    <div className="flex flex-col items-start">
      {/* Input field */}
      <div className="relative flex mb-2">
        <Image
          className="ml-4 mr-2"
          src={
            selectedDate
              ? "/icons/schedule_active.svg"
              : "/icons/schedule_inactive.svg"
          }
          width={20}
          height={20}
          alt="Schedule icon"
        />
        <input
          type="text"
          value={formatDate(selectedDate)}
          onChange={handleInputChange}
          onFocus={() => setFocusedInput(true)}
          className={`w-48 px-4 py-2 border-2 rounded-[4px] text-[#4F4F4F]`}
          placeholder="DD/MM/YYYY"
        />
        {/* Calendar icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Calendar popup */}
      {focusedInput && (
        <div className="absolute z-10 mt-2 left-[226px] bottom-[-245px] bg-white shadow-md rounded-[4px] border border-[] overflow-hidden text[#4F4F4F]">
          <DayPicker
            modifiersClassNames={{
              selected: "bg-blue-500 text-white rounded-full", // Styling untuk hari yang dipilih
            }}
            selectedDays={selectedDate}
            onDayClick={handleDayClick}
            modifiers={{
              selected: {
                style: {
                  border: "1px solid #2F80ED",
                  borderRadius: "100px",
                  color: "#fff",
                },
              },
            }}
            numberOfMonths={1}
            captionLayout="dropdown"
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
