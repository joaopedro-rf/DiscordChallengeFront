import { GuildSidebar } from "@/components/server/guild-sidebar";
import { ReactNode } from "react";


export default async function ServerIdLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { guildId: string };
}) {

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <GuildSidebar guildId={params.guildId}/>
        
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}