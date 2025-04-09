import React, { useState } from "react";
import Image from "next/image";

interface EditableTextProps {
  text: string;
  onSave: (text: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSave(currentText);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (currentText !== text) {
      onSave(currentText);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-start space-y-2 mt-2">
      <Image
        onClick={handleEdit}
        className="ml-4 mt-1 mr-3 cursor-pointer"
        src={
          currentText.length > 0
            ? "/icons/pen-active.svg"
            : "/icons/pen-inactive.svg"
        }
        width={15}
        height={15}
        alt="Pen Icon"
      />

      {!isEditing && (
        <p
          onClick={handleEdit}
          className="text-[#4F4F4F] cursor-pointer flex items-center"
        >
          {currentText}
        </p>
      )}

      {!isEditing && currentText.length === 0 && (
        <p
          onClick={handleEdit}
          className="text-[#4F4F4F] cursor-pointer flex items-center"
        >
          No Description
        </p>
      )}

      {isEditing && (
        <textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          onKeyDown={handleSave}
          onBlur={handleBlur}
          autoFocus
          rows={4}
          className="w-full p-2 border border-[#E0E0E0] text-[#4F4F4F] rounded-[4px] focus:outline-none resize-none"
        />
      )}
    </div>
  );
};

export default EditableText;
