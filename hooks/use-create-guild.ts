import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import the Cookies module
import { useCallback, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

interface Guild {
  name: string;
  googleId?: number;
}

export function useCreateGuild(guild: Guild) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGuild = useCallback(async (guild: Guild) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<Guild> = await axios.post(
        `${apiUrl}/api/guilds/addGuild`,
        guild,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setIsLoading(false);
      router.push(`/protected/guilds/${response.data.guildId}`);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError("Failed to create guild");
      throw new Error("Failed to create guild");
    }
  }, [router]);

  return { createGuild, isLoading, error };
}