'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import { MessageType } from '@/types';
import { useAuth } from '@/components/providers/auth-provider';

interface MessageBoxProps {
    data: MessageType;
}

const DATE_FORMAT = 'HH:MM a';

const MessageBox: React.FC<MessageBoxProps> = ({ data }) => {
    const { currentUser } = useAuth();
    const isOwn = currentUser?.id === data?.sender?.id;

    return (
        <div className={cn('flex gap-3 p-4 w-full', isOwn && 'justify-end')}>
            <div className={cn('flex flex-col gap-2 max-w-[40%]', isOwn && 'items-end')}>
                <div className='flex items-center gap-1'>
                    <div className='text-sm text-dark4'>{data.sender.name}</div>
                    <div className='text-xs text-dark4'>
                        {format(new Date(data.createdAt), DATE_FORMAT)}
                    </div>
                </div>
                <div
                    className={cn(
                        'text-sm overflow-hidden max-w-fit w-full',
                        isOwn ? 'bg-blueFF text-white' : 'bg-gray-50 dark:bg-gray78/80',
                        data.image ? 'rounded-lg p-0' : 'rounded-2xl py-2 px-3',
                    )}
                >
                    {data.image ? (
                        <div className='bg-white border rounded-lg'>
                            <Image
                                alt='Image'
                                height='288'
                                width='288'
                                src={data.image}
                                className='object-cover cursor-pointer hover:scale-110 transition translate'
                            />
                        </div>
                    ) : (
                        <p className='break-words'>{data.content}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
