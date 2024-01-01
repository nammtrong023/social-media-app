'use client';

import { useAuth } from '../providers/auth-provider';
import MainSidebar from './main-sidebar';

const MobileSidebar = () => {
    const { currentUser } = useAuth();
    if (!currentUser) return;

    return (
        <div className='bg-white dark:bg-dark1 fixed block md:hidden right-0 bottom-0 z-10 left-0 w-full'>
            <MainSidebar currentUser={currentUser} />
        </div>
    );
};

export default MobileSidebar;
