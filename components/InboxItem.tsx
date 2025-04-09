import { getSingleInitialName } from "@/helper";
import InboxIcon from "./InboxIcon";

interface InboxItemProps {
  id: number;
  title: string;
  name: string;
  date: string;
  isGroup: boolean;
  message: string;
  lastItem: boolean;
  onClick?: () => void;
}

export default function InboxItem({
  id,
  title,
  name,
  date,
  isGroup,
  message,
  lastItem,
  onClick,
}: InboxItemProps) {
  return (
    <div
      className={`relative flex cursor-pointer py-[22px]  ${
        lastItem ? "" : "border-b border-b-[#828282]"
      }`}
      onClick={onClick}
    >
      {id === 0 && (
        <div className="absolute rounded-full right-0 top-[50%] transform translate-y-[-50%] bg-[#EB5757] w-[10.5px] h-[10px]"></div>
      )}

      <InboxIcon
        initialName={isGroup ? undefined : getSingleInitialName(title)}
      />

      <div className="ml-[15px]">
        <div className="flex flex-wrap align-middle gap-x-3">
          <div className="font-bold text-[#2F80ED] text-base self-center">
            {title}
          </div>
          <span className="text-[#4f4f4f] text-xs self-center">{date}</span>
        </div>
        {name && <p className="font-bold text-[#4f4f4f] text-sm">{name}:</p>}
        <p className="text-xs text-[#4f4f4f]">{message}</p>
      </div>
    </div>
  );
}
