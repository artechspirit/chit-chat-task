"use client";
import { useState } from "react";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import Inbox from "@/components/Inbox";
import Task from "@/components/Task";
import Chat from "@/components/Chat";
import { useGetMessagesQuery, useGetMessagesByIdQuery } from "@/features/api";

export default function Home() {
  const { data, isLoading } = useGetMessagesQuery();
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showInbox, setShowInbox] = useState<boolean>(true);
  const [showInboxChat, setShowInboxChat] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);

  const { data: message } = useGetMessagesByIdQuery(selectedChat as number, {
    skip: selectedChat === null,
  });

  const handleQuickClick = () => {
    setShowButtons((prev) => {
      setActiveMenu("");
      setSelectedChat(null);
      return !prev;
    });
  };

  const handleChatOnBack = () => {
    setShowInbox(true);
    setShowInboxChat(false);
    setIsConnecting(true);
  };

  const handleInboxClick = (id: number) => {
    setSelectedChat(id);
    setShowInbox(false);
    setShowInboxChat(true);
    setTimeout(() => setIsConnecting(false), 2000); // Simulate connection delay
  };

  return (
    <div className="bg-[#424242] items-center justify-items-center min-h-screen-minus-64">
      {activeMenu === "inbox" && (
        <Wrapper
          customPaddingClass={!showInbox && showInboxChat ? "px-[0]" : ""}
        >
          {showInbox && data && (
            <Inbox
              data={data}
              isLoading={isLoading}
              onClick={handleInboxClick}
            />
          )}

          {showInboxChat && (
            <Chat
              data={message}
              isConnecting={isConnecting}
              isGroup={selectedChat !== null && selectedChat < 3 ? true : false}
              onBack={handleChatOnBack}
              onClose={handleChatOnBack}
            />
          )}
        </Wrapper>
      )}

      {activeMenu === "task" && (
        <Wrapper>
          <Task />
        </Wrapper>
      )}

      <Image
        src="/icons/btn-quick.svg"
        alt="Quick"
        width={64}
        height={64}
        className="fixed bottom-5 right-5 cursor-pointer transition-all duration-500 ease-in-out z-10"
        onClick={handleQuickClick}
      />

      <div
        className={`fixed bottom-5 right-24 cursor-pointer transition-all duration-300 ease-in-out flex overflow-hidden ${
          showButtons ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
        }`}
      >
        <div className="relative mr-2">
          <div className="text-white text-xs w-full text-center mb-1">
            Inbox
          </div>

          {activeMenu === "inbox" ? (
            <Image
              src={"/icons/btn-inbox-active.svg"}
              alt="Inbox"
              width={57}
              height={57}
              className="cursor-pointer"
              onClick={() => setActiveMenu("inbox")}
            />
          ) : (
            <Image
              src={"/icons/btn-inbox.svg"}
              alt="Inbox"
              width={64}
              height={64}
              className="cursor-pointer"
              onClick={() => setActiveMenu("inbox")}
            />
          )}
        </div>
        <div className="relative">
          <div className=" text-white text-xs w-full text-center mb-1">
            Task
          </div>

          <Image
            src={
              activeMenu === "task"
                ? "/icons/btn-task-active.svg"
                : "/icons/btn-task.svg"
            }
            alt="Task"
            width={64}
            height={64}
            className="cursor-pointer w-[64px] h-[64px]"
            onClick={() => setActiveMenu("task")}
          />
        </div>
      </div>
    </div>
  );
}
