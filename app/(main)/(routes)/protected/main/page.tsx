"use client";
import { InitialModal } from "@/components/modals/initial-modal";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import axios from "axios";

export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

  const router = useRouter();

  useEffect(() => {
    const fetchToken = async (code: string) => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/callback?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Token request failed");
        }

        const data = await response.json();
        const { token } = data;
    
        localStorage.setItem("access_token", token);

        fetchMessage({token});

      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const fetchMessage = async ({token}: {token: string}) => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Message request failed");
        }
        const messageData = await response.json();
        console.log(messageData);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      fetchToken(code);
    }

  }, [apiUrl, router]);
  

  return (
    <div>
      <InitialModal />
    </div>
  );
}
