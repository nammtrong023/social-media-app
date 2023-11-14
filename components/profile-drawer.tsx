'use client';

import InfoIcon from './icon/info-icon';
import { Trash } from 'lucide-react';
import UserAvatar from './user/user-avatar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import useActiveList from '@/hooks/use-active-list';
import { ConversationType, UserType } from '@/types';
import { useModalStore } from '@/hooks/use-modals';
import { AlertModal } from './modals/alert-modal';

interface ProfileDrawerProps {
    user: UserType | undefined;
    conversation: ConversationType | undefined;
}

const ProfileDrawer = ({ user, conversation }: ProfileDrawerProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    const { isOpen, type, onClose, onOpen } = useModalStore();
    const isModalOpen = isOpen && type === 'alert';

    const goToProfile = () => {
        router.push(`/profiles/${user?.id}`);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/conversations/${conversation?.id}`);

            toast.success('Thành công');
            router.push('/conversations');
        } catch (error) {
            toast.error('Thất bại');
            console.log(error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    if (!user || !conversation) return null;

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <InfoIcon />
                </SheetTrigger>
                <SheetContent
                    side='right'
                    className='p-[30px] bg-white dark:bg-dark1 w-[360px] h-screen flex-shrink-0 rounded-md space-y-7'
                >
                    <div className='w-full px-[62px] py-[30px] h-fit bg-gray78/5 dark:bg-dark2 rounded-[10px] flex flex-col items-center'>
                        <UserAvatar
                            src={user.profileImage}
                            username={user.name}
                        />
                        <div className='mt-5 text-center'>
                            <p
                                className='text-lg font-bold hover:underline'
                                onClick={goToProfile}
                            >
                                {user.name}
                            </p>
                            <p className='text-sm font-medium'>{user.email}</p>
                            <span className='flex items-center justify-center w-full gap-x-[10px] text-base font-medium mt-[10px]'>
                                {isActive ? (
                                    <>
                                        <p>Hoạt động</p>
                                        <span
                                            className='w-[10px] h-[10px] inline-block bg-[#38CB89]
                                        flex-shrink-0 rounded-full'
                                        />
                                    </>
                                ) : (
                                    <p>Offline</p>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className='w-full mx-auto flex items-center justify-center'>
                        <div
                            className='w-fit p-2 h-fit flex flex-col text-sm font-medium bg-gray78/10 hover:bg-gray78/5 dark:bg-dark2 dark:hover:bg-gray78/20 transition rounded-lg cursor-pointer items-center justify-center gap-y-2'
                            onClick={() => onOpen('alert')}
                        >
                            <Trash className='w-4 h-4' />
                            <p>Xoá đoạn chat</p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <AlertModal
                title='Xoá đoạn chat'
                loading={isLoading}
                isOpen={isModalOpen}
                onClose={onClose}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default ProfileDrawer;
