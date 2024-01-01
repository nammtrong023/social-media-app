import Heading from '../heading';
import UserInfo from './user-info';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { UserType } from '@/types';
import { useAuth } from '../providers/auth-provider';

export const SuggestUser = ({ users }: { users: UserType[] }) => {
    const { currentUser } = useAuth();

    const otherUsersFilter = users.filter(
        (user) => user.email !== currentUser?.email,
    );

    return (
        <div
            className={cn(
                'bg-white dark:bg-dark1 rounded-[10px] w-[290px] h-fit max-h-[400px]',
                !users && 'hidden',
            )}
        >
            <div className='px-[18px] py-[10px]'>
                <Heading title='Gợi ý cho bạn' />
            </div>
            <Separator />
            <div className='px-[18px] py-[10px] space-y-2'>
                {otherUsersFilter.map((user) => (
                    <UserInfo key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};
