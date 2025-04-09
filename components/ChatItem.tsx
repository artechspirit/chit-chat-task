import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LongPressButton from "./LongPress";
import { ClickOutside } from "@/hooks";
import { cutText } from "@/helper";

interface ChatItemProps {
  isMine?: boolean;
  isNew?: boolean;
  isGroup?: boolean;
  sender: string;
  messageText: string;
  time: string;
  onLongPress?: (msg: string) => void;
  isReplying?: string | null;
}

export default function ChatItem({
  isMine = false,
  isNew = false,
  isGroup = false,
  sender = "Sender",
  messageText = "Message text",
  time = "19:32",
  isReplying = null,
  onLongPress,
}: ChatItemProps) {
  const [showActionLongPress, setShowActionLongPress] =
    useState<boolean>(false);
  const handleLongPress = () => {
    setShowActionLongPress(true);
  };

  const handleReply = () => {
    if (onLongPress) onLongPress(messageText);
    setShowActionLongPress(false);
  };

  const handleShare = () => {
    setShowActionLongPress(false);
  };

  const senderClass = isMine
    ? "right-0 text-[#9B51E0]"
    : isNew
    ? "text-[#43B78D]"
    : isGroup
    ? "left-0 text-[#E5A443]"
    : "text-[#2F80ED]";

  const messageBgClass = isMine
    ? "bg-[#eedcff]"
    : isNew && isGroup
    ? "bg-[#d2f2ea]"
    : isGroup
    ? "bg-[#fceed3]"
    : "bg-[#f8f8f8]";

  return (
    <div className="relative px-[22px] mb-[22px]">
      <div
        className={`chats flex ${
          isMine ? "justify-end" : "justify-start"
        } mb-7`}
      >
        <div className="chat-message relative max-w-[85%]">
          {isMine && isReplying && (
            <div
              className={`message relative h-[68px] mt-6 p-2 rounded-sm bg-[#f2f2f2]`}
            >
              <p className="message text-base mb-2 text-[#4F4F4F]">
                {cutText(isReplying, 120)}
              </p>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`cursor-pointer absolute  outline-none ${
                isMine && isReplying !== null ? "top-[93px]" : "top-[20px]"
              } ${isMine ? "-left-6" : "-right-6"}`}
            >
              <Image
                src="/icons/icon-more.svg"
                width={20}
                height={20}
                alt="More"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-[-6px] shadow-none border-[#BDBDBD] rounded-[4px]">
              <DropdownMenuItem className="cursor-pointer text-[#2F80ED] focus:text-[#2F80ED] focus:bg-white">
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-[#BDBDBD]" />
              <DropdownMenuItem className="cursor-pointer text-[#EB5757] focus:text-[#EB5757] focus:bg-white">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className={`sender absolute ${senderClass} top-0 font-bold text-sm`}
          >
            {sender}
          </div>

          <LongPressButton onLongPress={handleLongPress}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`message relative min-h-[30px] p-2 border-2 border-[#F2F2F2] rounded-sm ${messageBgClass} ${
                      isMine && isReplying !== null ? "mt-1.5" : "mt-6"
                    }`}
                  >
                    <p className="message text-base mb-2 text-[#4F4F4F] ">
                      {messageText}
                    </p>
                    <p className="text-xs text-[#4F4F4F]">{time}</p>

                    {!isMine && showActionLongPress && (
                      <ClickOutside
                        onClickOutside={() => setShowActionLongPress(false)}
                      >
                        <div className="action-long-press absolute z-10 w-[126px] top-[32px] right-[60px] bg-white border border-[#BDBDBD] rounded-[4px]">
                          <div
                            onClick={handleShare}
                            className="px-4 text-[#2F80ED] flex items-center h-[40px] cursor-pointer hover:bg-[8f8f8f]"
                          >
                            Share
                          </div>
                          <hr />
                          <div
                            onClick={handleReply}
                            className="px-4 text-[#2F80ED] flex items-center h-[40px] cursor-pointer hover:bg-[8f8f8f]"
                          >
                            Reply
                          </div>
                        </div>
                      </ClickOutside>
                    )}
                  </div>
                </TooltipTrigger>
                {!isMine && !showActionLongPress && (
                  <TooltipContent>
                    <p>Long press to show action</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </LongPressButton>
        </div>
      </div>
    </div>
  );
}
