'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import UserAvatar from './user-avatar';
import { UserType } from '@/types';

const UserInfo = ({
    user,
    className,
}: {
    user: UserType;
    className?: string;
}) => {
    const router = useRouter();

    const goToProfile = () => {
        router.push(`/profiles/${user.id}`);
    };

    return (
        <div
            className={cn(
                'flex items-center gap-x-2 mb-3 bg-white hover:bg-gray78/5 dark:bg-dark1 dark:hover:bg-dark2/25 cursor-pointer p-3 rounded-lg',
                className,
            )}
            onClick={goToProfile}
        >
            <UserAvatar src={user.profileImage} username={user.name} />
            <div className='flex flex-col text-base'>
                <p className='font-semibold line-clamp-1'>{user.name}</p>
                <p className='opacity-60 line-clamp-1'>{user.email}</p>
            </div>
        </div>
    );
};

export default UserInfo;
