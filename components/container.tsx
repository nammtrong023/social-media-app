'use client';

import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/auth-provider';
import MainSidebar from '@/components/sidebar/main-sidebar';
import UserInfo from './user/user-info';
import { useQuery } from '@tanstack/react-query';
import useUsersApi from '@/api/users/use-users-api';

interface ContainerProps {
    className?: string;
    showRightBar?: boolean;
    children: React.ReactNode;
}

const Container = ({ className, showRightBar, children }: ContainerProps) => {
    const { currentUser } = useAuth();
    const { getOtherUsers } = useUsersApi();

    const otherUsersQuery = useQuery({
        initialData: [],
        queryKey: ['get-other-users'],
        queryFn: () => getOtherUsers(),
    });

    if (!currentUser) return null;

    return (
        <div className='h-full w-full'>
            <aside className='bg-white dark:bg-dark1 hidden md:flex h-[78px] md:h-full xl:w-[240px] lg:w-[200px] w-full md:w-[100px] z-20 mt-[78px] flex-col fixed inset-y-0'>
                <MainSidebar currentUser={currentUser} />
            </aside>
            <main
                className={cn(
                    'bg-[#f9fafb] dark:bg-dark2 pt-[90px] px-0 md:px-[30px] z-10 xl:pl-[270px] lg:pl-[230px] md:pl-[130px] lg:pr-[310px] lg:pt-[108px] h-screen !pb-[30px] md:pb-0 w-full overflow-y-auto scrollbar-hidden',
                    className,
                )}
            >
                {children}
            </main>
            {showRightBar && (
                <aside className='bg-white dark:bg-dark1 hidden lg:block fixed z-20 inset-y-0 w-[280px] top-[78px] right-0 h-full px-3'>
                    <h2 className='text-base font-bold text-center'>
                        Gợi ý cho bạn
                    </h2>
                    <div className='mt-3 flex flex-col gap-1'>
                        {otherUsersQuery.data.map((user) => (
                            <UserInfo key={user.id} user={user} />
                        ))}
                    </div>
                </aside>
            )}
        </div>
    );
};

export default Container;
