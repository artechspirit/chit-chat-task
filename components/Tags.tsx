import { ClickOutside } from "@/hooks";
import { ITags } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

type TagVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "quinary"
  | "senary"
  | "septenary"
  | "octonary";

interface InfoCardProps {
  icon?: React.ReactNode;
  tags: { label: string; variant: TagVariant; isSelected: boolean }[];
  onSelectedTags?: (tag: ITags) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, tags, onSelectedTags }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  return (
    <div
      onClick={() => setShowPopup(true)}
      className="flex items-center p-4 bg-[#f9f9f9] mt-2 rounded-[4px] cursor-pointer"
    >
      {/* Icon */}
      <div className="mr-4">
        {icon ? (
          icon
        ) : (
          <Image src="/icons/bookmarks.svg" alt="Icon" width={20} height={20} />
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap ml-[-7px] space-x-2 space-y-2">
        {tags.map(
          (tag, index) =>
            tag.isSelected && (
              <Tag
                key={index}
                label={tag.label}
                variant={tag.variant}
                isSelected={tag.isSelected}
              />
            )
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <ClickOutside onClickOutside={() => setShowPopup(false)}>
          <div className="absolute bottom-[-285px] left-[38px] bg-white border border-[#828282] rounded-[4px] p-4 w-[277px] z-50">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag.label}
                variant={tag.variant}
                isFull
                isSelected={tag.isSelected}
                onTagClick={() => onSelectedTags?.(tag)}
              />
            ))}
          </div>
        </ClickOutside>
      )}
    </div>
  );
};

interface TagProps {
  label: string;
  variant: TagVariant;
  isSelected?: boolean;
  isFull?: boolean;
  onTagClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  label,
  variant,
  isFull,
  isSelected,
  onTagClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#e9f3ff]";
      case "secondary":
        return "bg-[#fdcfa4]";
      case "tertiary":
        return "bg-[#f9e9c3]";
      case "quaternary":
        return "bg-[#afebdb]";
      case "quinary":
        return "bg-[#cbf1c2]";
      case "senary":
        return "bg-[#cfcef9]";
      case "septenary":
        return "bg-[#f9e0fd]";
      case "octonary":
        return "bg-[#9dd0ed]";
      default:
        return "bg-[#e9f3ff]";
    }
  };

  return (
    <span
      onClick={onTagClick}
      className={`inline-flex items-center px-3 py-1 h-[28px] rounded-sm text-[#4F4F4F] font-bold text-sm ${getVariantClasses()} ${
        isFull && "w-full mb-2"
      } ${isFull && isSelected && "border border-[#2F80ED]"}`}
    >
      {label}
    </span>
  );
};

export default InfoCard;
