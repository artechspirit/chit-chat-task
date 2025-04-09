export default function Wrapper({
  children,
  customPaddingClass,
}: Readonly<{
  children: React.ReactNode;
  customPaddingClass?: string;
}>) {
  return (
    <div
      className={`w-[737px] h-[545px] ${
        customPaddingClass ? customPaddingClass : "py-[24px] px-[32px]"
      } rounded-sm  bg-white fixed bottom-28 right-5 z-40`}
    >
      {children}
    </div>
  );
}
