'use client';

import React from 'react';
import ConversationForm from './components/conversation-form';
import ConversationHeader from './components/conversation-header';
import { ChatSidebar } from '@/components/sidebar/chat-sidebar';
import useConversationsApi from '@/api/conversations/use-conversations-api';
import { useQueries, useQuery } from '@tanstack/react-query';
import useOtherUsers from '@/hooks/use-other-user';
import ConversationBody from './components/conversation-body';
import { redirect } from 'next/navigation';

const ConversationIdPage = ({
    params,
}: {
    params: { conversationId: string };
}) => {
    const otherUsers = useOtherUsers();
    const { getConversations, getConversationById } = useConversationsApi();

    const { data: conversation, isFetching } = useQuery({
        queryKey: ['get-conversation'],
        queryFn: () => getConversationById(params.conversationId),
    });
    const { data: conversations } = useQuery({
        queryKey: ['get-conversations'],
        queryFn: getConversations,
    });

    if (!conversation && !isFetching) {
        return redirect('/conversations');
    }

    return (
        <>
            <div className='flex-shrink-0 hidden h-full w-full lg:max-w-[320px] xl:block'>
                <ChatSidebar users={otherUsers} data={conversations} />
            </div>
            <div className='h-full bg-white dark:bg-dark1 rounded-[10px] w-full xl:max-w-[71%]'>
                <div className='flex flex-col rounded-[10px] w-full h-full'>
                    <ConversationHeader conversation={conversation} />
                    <ConversationBody />
                    <ConversationForm />
                </div>
            </div>
        </>
    );
};

export default ConversationIdPage;
