import { ChannelList as ChannelListType } from "../../types/channel/channel";

export function ChannelList({ channels }: { channels: ChannelListType | null }) {
  if (!channels) {
    return <div>No channels available.</div>;
  }

  return (
    <div>
      {channels.length === 0 ? (
        <div>No channels found.</div>
      ) : (
        channels.map(channel => (
          <div key={channel.id}>
            {channel.name} 
          </div>
        ))
      )}
    </div>
  );
}