"use client";
import { InitialModal } from "@/components/modals/initial-modal";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

  const router = useRouter();

  useEffect(() => {
    const fetchToken = async (code: string) => {
      try {
        const response = await fetch(
          `${apiUrl}/api/auth/callback?code=${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if(response.status === 200) {
          router.push("/protected/main");
        }

      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (code) {
      fetchToken(code);
    }
  }, []);

  return (
    <div>
      <InitialModal />
    </div>
  );
}
