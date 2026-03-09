import dynamic from 'next/dynamic';

const GroupChat = dynamic(() =>
  import('@/features/groups-chat').then((mod) => mod.GroupChat)
);

export default function GroupChatPage() {
  return <GroupChat />;
}
