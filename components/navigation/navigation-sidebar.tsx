"use client";
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavigationAction } from './navigation-action';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { NavigationItem } from './navigation-item';

export const NavigationSideBar = () => {
  const [guilds, setGuilds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuilds = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;
      const fetchUrl = `${apiUrl}/api/users/${Cookies.get("googleId")}`;
        console.log(fetchUrl);
      try {
        const response = await axios.get(fetchUrl, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setGuilds(response.data);
        console.log(guilds);
      } catch (error) {
        console.log(error);
        setError("Failed to get guilds");
      } finally {
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  
  return (
    <div className="space-y-4 text-white flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto " />
      <ScrollArea className="flex-1 w-full">
      {guilds && guilds.map((guilds) =>( <div key ={guilds.id} className='mb-4'>
        <NavigationItem 
          id={guilds.id}
          imageUrl={guilds.icon}
          name={guilds.name}
        />
      </div>))}
      </ScrollArea>
    </div>
  );
};