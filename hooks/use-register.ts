import axios from "axios";
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

interface Credentials {
  nickname: string;
  email: string;
  password: string;
}

interface AuthResponse {
  status: number;
}

function useRegister() {
  const router = useRouter();
  async function authenticate(credentials: Credentials) {
    try {
      const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/guilds`,
        credentials
      );
      router.push("/api/auth/login");
      return response.data;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  return { authenticate };
}

export default useRegister;
