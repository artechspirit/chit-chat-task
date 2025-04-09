import React, { useState } from "react";

interface EditableInputProps {
  name: string;
  defaultValue: string;
  onEnter: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({
  name,
  defaultValue,
  onEnter,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [text, setText] = useState(defaultValue);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter(text);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="pl-4 bg-white w-[60%]">
      {!isEditing && (
        <p
          onClick={handleEdit}
          className="text-[#4F4F4F] cursor-pointer task-title font-bold"
        >
          {text || "Type something..."}
        </p>
      )}

      {isEditing && (
        <input
          type="text"
          placeholder={defaultValue}
          name={name}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleSave}
          onBlur={handleBlur}
          autoFocus
          className="w-full p-2 border text[#4F4F4F] border-[#828282] rounded-[4px] focus:outline-none focus:text-[#4f4f4f]"
        />
      )}
    </div>
  );
};

export default EditableInput;
