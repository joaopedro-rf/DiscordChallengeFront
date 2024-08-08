import { cookies } from 'next/headers';
import { Channel, ChannelList } from '../types/channel/channel';


export async function getChannels(guildId: string): Promise<ChannelList> {
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;
  const fetchUrl = `${apiUrl}/api/guilds/${guildId}/channels`;
  
  const token = cookies().get('token')?.value;

  const response = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch channels');
  }

  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data as ChannelList;
  }
  
  if (typeof data === 'object' && data !== null) {
    return [data] as ChannelList;
  }

  console.error("Unexpected data format for channels:", data);
  return [];
}