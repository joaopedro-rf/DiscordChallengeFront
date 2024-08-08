"use client";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modals";

export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;
  const {onOpen} = useModal();

  useEffect(() => {
    onOpen("createServer");
  }, []);
  
  const router = useRouter();

  return (
    <div>
      <CreateServerModal />
    </div>
  );
}
