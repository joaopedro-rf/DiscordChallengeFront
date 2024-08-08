export interface Guild {
    id: number;
    name: string;
    inviteCode: string;
    createdAt: string;
    discordUser: any[]; 
    oauth2User: any[]; 
}