import { getChannels } from "@/lib/channel-list";
import { GuildHeader } from "./guild-header";
import { Channel, ChannelList } from "@/types/channel/channel";

interface GuildSidebarProps{
    guildId: string;
}

export const GuildSidebar = async({guildId}: GuildSidebarProps) => {
    const channels:Channel[] = await getChannels(guildId);

    return(
        <div className="flex flex-col h-full text-secondary w-full bg-[#2B2D31]">
            <GuildHeader channels={channels} />
        </div>
    )
}

