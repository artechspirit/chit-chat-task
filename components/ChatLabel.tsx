interface ChatLabelProps {
  isNew?: boolean;
  label: string;
}

export default function ChatLabel({
  isNew = false,
  label = "Chat Label",
}: ChatLabelProps) {
  return (
    <div
      className={`absolute p-4 left-[50%] transform translate-x-[-50%] bg-white top-[-25px] ${
        isNew ? "text-[#EB5757]" : "text-[#4F4F4F]"
      }  font-bold text-sm`}
    >
      {label}
    </div>
  );
}
