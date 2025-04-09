"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import InboxItem from "./InboxItem";
import type { Inbox } from "@/types";

interface InboxProps {
  data: Inbox[];
  isLoading?: boolean;
  onClick: (id: number) => void;
}

export default function Inbox({ data, isLoading, onClick }: InboxProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  return (
    <div className="relative w-full h-full overflow-y-auto">
      {loading && <Loading />}
      <SearchBar />

      {!loading &&
        !isLoading &&
        data.map((item) => (
          <InboxItem
            key={item.id}
            {...item}
            lastItem={item.id === data.length - 1}
            onClick={() => onClick(item.id)}
          />
        ))}
    </div>
  );
}
