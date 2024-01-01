'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ConversationType } from '@/types';
import { HiChevronLeft } from 'react-icons/hi';
import useActiveList from '@/hooks/use-active-list';
import ProfileDrawer from '@/components/profile-drawer';
import UserAvatar from '@/components/user/user-avatar';
import { useAuth } from '@/components/providers/auth-provider';
import { UserInfoSkeleton } from '@/components/skeleton/user-info-skeleton';

interface ConversationHeaderProps {
    conversation: ConversationType | undefined;
}

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
    const { currentUser } = useAuth();
    const otherUser = conversation?.users.find(
        (user) => user.id !== currentUser?.id,
    );

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.id!) !== -1;

    const statusText = useMemo(() => {
        return isActive ? 'Hoạt động' : 'Offline';
    }, [isActive]);

    return (
        <div className='bg-white dark:bg-dark1 w-full flex border-b-[1px] dark:border-dark3 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center rounded-t-[10px]'>
            <div className='flex gap-3 items-center'>
                <Link
                    href='/conversations'
                    className='xl:hidden block text-blueFF hover:text-blueFF/90 transition cursor-pointer'
                >
                    <HiChevronLeft size={32} />
                </Link>

                {!otherUser || !conversation ? (
                    <UserInfoSkeleton />
                ) : (
                    <>
                        <UserAvatar
                            src={otherUser.profileImage}
                            username={otherUser.name}
                        />
                        <div className='flex flex-col'>
                            <div>{otherUser.name}</div>
                            <div className='text-sm font-light text-dark4'>
                                {statusText}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ProfileDrawer user={otherUser} conversation={conversation} />
        </div>
    );
};

export default ConversationHeader;
