'use client';

import Link from 'next/link';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Logo } from '@/components/logo';
import { useParams, usePathname } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const params = useParams();

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='bg-white dark:bg-dark1 fixed z-50 top-0 left-0 right-0 w-full py-6 px-5 h-[78px] flex items-center justify-between'>
                <div className='flex items-center'>
                    <Logo />
                </div>
                <ModeToggle />
            </div>
            <div className='w-full bg-[#f9fafb] dark:bg-dark2'>{children}</div>
            {pathname !== `/conversations/${params.conversationId}` && (
                <MobileSidebar />
            )}
        </div>
    );
};

export default MainLayout;
