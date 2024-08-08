import { Guild } from "../guild/guild";

export interface Channel {
    id: number;
    name: string;
    createdAt: string;
    guild: Guild;
}

export type ChannelList = Channel[];