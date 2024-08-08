"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modals";
import { ChannelList } from "@/types/channel/channel";

import { ChevronDown, LogOut, PlusCircle, UserPlus } from "lucide-react";

interface GuildHeaderProps {
  channels: ChannelList;
}

export const GuildHeader: React.FC<GuildHeaderProps> = ({ channels }) => {
  const { onOpen } = useModal();
  const inviteCode = channels[0].guild.inviteCode;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12  text-white
                border-neutral-800 border-b-2 hover:bg-zinc-700/50 transition"
        >
          {channels[0].name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-neutral-400 space-y-[2px]">
        <DropdownMenuItem
          onClick={() => onOpen("invite", { inviteCode })}
          className="text-indigo-400 px-3 py-2 text-sm focus:outline-none cursor-pointer"
        >
          Convidar pessoas
          <UserPlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-2 text-sm focus:outline-none cursor-pointer">
          Criar um canal
          <PlusCircle className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className=" px-3 py-2 text-sm focus:outline-none cursor-pointer">
          Sair da guild
          <LogOut className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm focus:outline-none cursor-pointer">
          Deletar guild
          <PlusCircle className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
