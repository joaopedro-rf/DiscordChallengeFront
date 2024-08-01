import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;


interface Guild {
  name: string;
  oauth2User?: number;
  discordUser?: number;
}

async function useCreateGuild(guild: Guild) {
  const router = useRouter();
  
  try {
    const response: AxiosResponse<Guild> = await axios.post(
      `${apiUrl}/api/auth/register`,
      guild
    );
    router.push("/api/auth/login");
    return response.data;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export default useCreateGuild;
