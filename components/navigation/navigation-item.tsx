"use client";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../ui/action-tooltip";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const getRandomColor = useCallback(() => {
    const colors = [
      "#7289da",
      "#99aab5",
      "#2c2f33",
      "#23272a",
      "#5865f2",
      "#4f545c",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, [getRandomColor]);


  const onClick = () => {
    router.push(`/protected/guilds/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-white rounded-r-full transition-all w-[4px]",
            params?.guildId !== id && "group-hover:h-[20px]",
            params?.guildId == id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[16px] transition-all overflow-hidden",
            params?.guildId === id && "bg-primary/10 text-primary"
          )}
        >
          <Avatar>
            <AvatarFallback style={{ backgroundColor: color }}>
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </button>
    </ActionTooltip>
  );
};
