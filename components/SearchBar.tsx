import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="search-bar relative">
      <input
        type="text"
        placeholder="Search"
        className="search-input h-[32px] w-full rounded border border-[#828282] focus:outline-none placeholder-[#333333] text-[#333333] px-14"
      />

      <Image
        className="absolute right-10 top-[50%] transform translate-y-[-50%]"
        src="/icons/search-black.svg"
        alt="search"
        width={16}
        height={16}
      />
    </div>
  );
}
