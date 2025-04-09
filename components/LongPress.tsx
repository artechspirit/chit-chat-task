import { useState, ReactNode } from "react";

interface LongPressProps {
  onLongPress: () => void;
  duration?: number;
  children: ReactNode;
}

const LongPressButton: React.FC<LongPressProps> = ({
  onLongPress,
  duration = 500,
  children,
}) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDownOrTouchStart = () => {
    const timer = setTimeout(() => {
      onLongPress();
    }, duration);
    setPressTimer(timer);
  };

  const handleMouseUpOrTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDownOrTouchStart}
      onMouseUp={handleMouseUpOrTouchEnd}
      onTouchStart={handleMouseDownOrTouchStart}
      onTouchEnd={handleMouseUpOrTouchEnd}
    >
      {children}
    </div>
  );
};

export default LongPressButton;
