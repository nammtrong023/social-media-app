'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Heading from '../heading';
import UserBox from '../user/user-box';
import { ConversationType, UserType } from '@/types';
import { MessageSquare } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationList from '../../app/(routes)/conversations/[conversationId]/components/conversation-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserInfoSkeleton } from '../skeleton/user-info-skeleton';

interface TabProps {
    users: UserType[];
    data: ConversationType[] | undefined;
    className?: string;
}

export function ChatSidebar({ users, className, data }: TabProps) {
    const [isConversation, setIsConversation] = useState(true);

    useEffect(() => {}, [isConversation]);

    return (
        <Tabs
            defaultValue='conversation'
            className={cn(
                'w-full lg:max-w-[320px] h-full bg-white dark:bg-dark1 rounded-[10px] p-5',
                className,
            )}
        >
            <TabsList className='grid w-full grid-cols-2 h-10 bg-white dark:bg-dark1 mb-2'>
                <Heading title={isConversation ? 'Chat' : 'Mọi người'} />
                <div className='text-end'>
                    <TabsTrigger
                        title='Chat'
                        value='conversation'
                        onClick={() => setIsConversation(true)}
                    >
                        <MessageSquare size={20} />
                    </TabsTrigger>

                    <TabsTrigger
                        title='Mọi người'
                        value='users'
                        onClick={() => setIsConversation(false)}
                    >
                        <MdOutlineGroupAdd size={20} />
                    </TabsTrigger>
                </div>
            </TabsList>
            <TabsContent
                value='conversation'
                className='h-[calc(100%-48px)] pb-20 lg:pb-0 w-full'
            >
                {data && data.length >= 0 ? (
                    <ConversationList data={data} />
                ) : (
                    <UserInfoSkeleton />
                )}
            </TabsContent>

            <TabsContent
                value='users'
                className='h-[calc(100%-48px)] pb-20 lg:pb-0 w-full'
            >
                <ScrollArea className='flex flex-col gap-y-3 min-h-[425px] h-full w-full rounded-[10px]'>
                    {!users ? (
                        <UserInfoSkeleton />
                    ) : (
                        <>
                            {users.map((user) => (
                                <UserBox key={user.id} user={user} />
                            ))}
                        </>
                    )}
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
}
