'use client';

import React from 'react';
import { ConversationType } from '@/types';
import useConversation from '@/hooks/use-conversation';
import ConversationBox from './conversation-box';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationListProps {
    data: ConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ data }) => {
    const { conversationId } = useConversation();

    return (
        <div className='pb-20 lg:pb-0 overflow-y-auto rounded-[10px] flex-shrink-0 h-full'>
            <ScrollArea className='h-full flex items-center flex-col gap-y-2'>
                {data?.map((item) => (
                    <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))}
            </ScrollArea>
        </div>
    );
};

export default ConversationList;
