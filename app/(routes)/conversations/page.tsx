'use client';

import { useQuery } from '@tanstack/react-query';
import { ChatSidebar } from '@/components/sidebar/chat-sidebar';
import useOtherUsers from '@/hooks/use-other-user';
import useConversationsApi from '@/api/conversations/use-conversations-api';

const ConversationsPage = () => {
    const otherUsers = useOtherUsers();
    const { getConversations } = useConversationsApi();

    const { data: conversations } = useQuery({
        queryKey: ['get-conversations'],
        queryFn: getConversations,
    });

    return (
        <>
            <div className='h-full w-full lg:max-w-[320px]'>
                <ChatSidebar
                    users={otherUsers}
                    data={conversations}
                    className='w-full'
                />
            </div>
            <div className='h-full w-full hidden lg:block xl:max-w-[71%]'>
                <div className='px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full flex justify-center items-center bg-gray-100 dark:bg-dark1 rounded-[10px] w-full'>
                    <div className='text-center items-center flex flex-col'>
                        <h3 className='mt-2 text-xl xl:text-2xl font-semibold text-dark1 dark:text-white'>
                            Chọn một cuộc hội thoại để bắt đầu
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConversationsPage;
