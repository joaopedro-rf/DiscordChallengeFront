"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async (code: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/api/auth/callback?code=${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          router.push("/protected/main");
        } else {
          router.push("/login?error=auth_failed");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/login?error=network_error");
      }
    };
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (typeof code === "string") {
      fetchToken(code);
    }
  }, [router]);

  return <div>Processing login, please wait...</div>;
}
