import { useState } from "react";
import Image from "next/image";
import ChatItem from "./ChatItem";
import { Button } from "./ui/button";
import ChatLabel from "./ChatLabel";
import { IMessage } from "@/types";
import { cutText } from "@/helper";

interface ChatProps {
  onBack: () => void;
  onClose: () => void;
  isGroup: boolean;
  isConnecting: boolean;
  data: IMessage[];
}

interface ISReplying {
  irSender: string;
  irMessage: string;
}

export default function Chat({
  onBack,
  onClose,
  isGroup = false,
  isConnecting = true,
  data,
}: ChatProps) {
  const [isReplying, setIsReplying] = useState<ISReplying | null>(null);
  const [statusReplying, setStatusReplying] = useState<string | null>(null);

  const handleLongPress = (sender: string, msg: string) => {
    setIsReplying({ irSender: sender, irMessage: msg });
  };

  const handleSend = () => {
    if (isReplying) {
      setStatusReplying(isReplying.irMessage);
      setIsReplying(null);
    }
  };

  return (
    <div className="relative chat">
      {/* Header */}
      <div className="chat-header relative p-[22px] border-b border-[#BDBDBD]">
        <Image
          onClick={onBack}
          className="absolute left-[22px] top-1/2 transform -translate-y-1/2 cursor-pointer"
          src="/icons/icon-back.svg"
          width={24}
          height={24}
          alt="Back"
        />
        <div className="header-content ml-[32px]">
          <h1
            className={`text-[#2F80ED] font-bold ${
              isGroup ? "mb-[-6px]" : "pt-[8px]"
            }`}
          >
            {isGroup
              ? "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]"
              : "FastVisa Support"}
          </h1>
          {isGroup && (
            <span className="text-[#333333] text-xs">3 Participant</span>
          )}
        </div>
        <Image
          onClick={onClose}
          className="absolute right-[22px] top-1/2 transform -translate-y-1/2 cursor-pointer"
          src="/icons/icon-close.svg"
          width={14}
          height={14}
          alt="Close"
        />
      </div>

      {/* Chat Content */}
      <div className="px-[22px] h-[380px] overflow-y-auto">
        {isGroup ? (
          <>
            <div className="relative pt-[11px]">
              <ChatItem
                sender="You"
                time="19:32"
                messageText="No worries. It will be completed ASAP. I’ve asked him yesterday."
                isGroup
                isMine
              />
            </div>
            <div className="relative border-t border-[#4F4F4F] pt-[11px]">
              <ChatLabel label="Today June 09, 2021" />
              <ChatItem
                sender="Mary Hilda"
                time="19:32"
                messageText="Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks."
                isGroup
                onLongPress={(msg) =>
                  true && handleLongPress("Mary Hilda", msg)
                }
              />
              <ChatItem
                sender="You"
                messageText="Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary."
                time="19:32"
                isGroup
                isMine
              />
              <ChatItem
                sender="Mary Hilda"
                messageText="Sure thing, Claren"
                time="19:32"
                isGroup
                onLongPress={(msg) =>
                  true && handleLongPress("Mary Hilda", msg)
                }
              />
            </div>
            <div className="relative border-t border-[#EB5757] pt-[11px]">
              <ChatLabel label="New Message" isNew />
              <ChatItem
                sender="Obaidullah Amarkhil"
                messageText="Morning. I’ll try to do them. Thanks"
                time="19:32"
                isGroup
                isNew
                onLongPress={(msg) =>
                  true && handleLongPress("Obaidullah Amarkhil", msg)
                }
              />
            </div>
          </>
        ) : (
          <div className="relative pt-[11px]">
            {data?.map(({ sender, date, message, isMine, id }: IMessage) => (
              <ChatItem
                key={id}
                sender={sender}
                time={date}
                messageText={message}
                isMine={isMine}
                isReplying={statusReplying}
                onLongPress={(msg) => !isMine && handleLongPress(sender, msg)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Connecting Message */}
      {isConnecting && !isGroup && (
        <div className="absolute bottom-[70px] left-[22px] w-[94%] flex items-center bg-[#e9f3ff] text-[#4F4F4F] text-sm px-4 py-2 rounded-sm">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-white animate-spin fill-[#2F80ED]"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.59C100 78.21 77.61 100.59 50 100.59C22.39 100.59 0 78.21 0 50.59C0 22.98 22.39 0.59 50 0.59C77.61 0.59 100 22.98 100 50.59ZM9.08 50.59C9.08 73.19 27.4 91.51 50 91.51C72.6 91.51 90.92 73.19 90.92 50.59C90.92 27.99 72.6 9.67 50 9.67C27.4 9.67 9.08 27.99 9.08 50.59Z"
              fill="currentColor"
            />
            <path
              d="M93.97 39.04C96.39 38.4 97.86 35.91 97.01 33.55C95.29 28.82 92.87 24.37 89.82 20.35C85.85 15.12 80.88 10.72 75.21 7.41C69.54 4.1 63.28 1.94 56.77 1.05C51.77 0.37 46.7 0.45 41.73 1.28C39.26 1.69 37.81 4.2 38.45 6.62C39.09 9.05 41.57 10.47 44.05 10.11C47.85 9.55 51.72 9.53 55.54 10.05C60.86 10.78 65.99 12.55 70.63 15.26C75.27 17.96 79.33 21.56 82.58 25.84C84.92 28.91 86.8 32.29 88.18 35.88C89.08 38.22 91.54 39.68 93.97 39.04Z"
              fill="currentFill"
            />
          </svg>
          Please wait while we connect you with one of our team ...
        </div>
      )}

      {/* Replying Section */}
      {isReplying && (
        <div className="relative px-[22px] ">
          <div className="isReply h-[105.6px] absolute z-10 bg-[#f2f2f2] top-[-87px] w-[81.8%] border border-[#828282] rounded-bl-none rounded-br-none p-4 rounded-[4px] text-[#4F4F4F]">
            <Image
              onClick={() => setIsReplying(null)}
              className="absolute right-[15px] top-[15px] opacity-70 cursor-pointer"
              src="/icons/icon-close.svg"
              width={13}
              height={13}
              alt="Close"
            />
            <span className="font-bold">Replying to {isReplying.irSender}</span>
            <p>{cutText(isReplying.irMessage, 137)}</p>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="reply-message flex justify-between items-center px-[22px] py-4">
        <input
          type="text"
          placeholder="Type a new message"
          className="w-[87%] h-[40px] rounded-[4px] border border-[#828282] px-[12px] outline-none text-[#333333] placeholder-[#333333]"
        />
        <Button
          onClick={handleSend}
          className="w-[76px] bg-[#2F80ED] hover:bg-blue-700 cursor-pointer rounded-sm min-h-[40px]"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
