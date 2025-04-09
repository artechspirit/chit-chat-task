import Image from "next/image";

interface InboxIconProps {
  initialName?: string;
}

export default function InboxIcon({ initialName }: InboxIconProps) {
  return (
    <div className="min-w-[51px]">
      {initialName ? (
        <div className="w-[34px] h-[34px] bg-[#2F80ED] text-white rounded-full flex justify-center items-center">
          {initialName}
        </div>
      ) : (
        <Image
          src="/icons/icon-group.svg"
          width={51}
          height={34}
          objectFit="contain"
          alt="Icon Group"
        />
      )}
    </div>
  );
}
