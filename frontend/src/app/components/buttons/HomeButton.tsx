"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiKeyReturnLight } from "react-icons/pi";

const HomeButton = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-gray-300 hover:bg-gray-200 cursor-pointer p-3 rounded-lg shadow-lg z-50">
      <button onClick={() => router.push("/")} aria-label="ホームに戻る">
        <PiKeyReturnLight size={24} />
      </button>
    </div>
  );
};

export default HomeButton;
