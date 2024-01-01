import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';

interface UserAvatarProps {
    src: string;
    username: string;
    className?: string;
    onClick?: () => void;
}

const UserAvatar: FC<UserAvatarProps> = ({
    className,
    username,
    src,
    onClick,
}) => {
    return (
        <Avatar
            onClick={onClick}
            className={cn('w-12 h-12 cursor-pointer', className)}
        >
            <AvatarImage
                src={src || '/profile-placeholder.jpg'}
                className='object-cover'
            />
            <AvatarFallback className='w-12 h-12 relative'>
                <Image
                    src='/profile-placeholder.jpg'
                    fill
                    alt={username || ''}
                />
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
