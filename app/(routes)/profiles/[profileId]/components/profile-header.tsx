'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageUpload } from '@/components/images/image-upload';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user/user-avatar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUsersApi, { ImageData } from '@/api/users/use-users-api';
import { UserType } from '@/types';
import { useModalStore } from '@/hooks/use-modals';
import ProfileActions from './profile-actions';

interface ProfileHeaderProps {
    user: UserType;
    currentUser: UserType;
}

type modalType = 'profileImage' | 'coverImage' | null;

export const ProfileHeader = ({ currentUser, user }: ProfileHeaderProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { onOpen, onClose } = useModalStore();
    const { updateUserImage } = useUsersApi();

    const [typeModal, setTypeModal] = useState<modalType>(null);
    const [imageValue, setImageValue] = useState('');

    const handleOpenModal = (typeModal: modalType) => {
        onOpen('uploadImage');
        setTypeModal(typeModal);
    };

    const mutation = useMutation({
        mutationKey: ['user-images'],
        mutationFn: (data: ImageData) => {
            return updateUserImage(currentUser.id, data);
        },
        onSuccess: () => {
            toast.success('Thành công');
            setImageValue('');
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['get-user'] });
            onClose();
        },
        onError: () => {
            toast.error('Thất bại');
        },
    });

    const handleSubmit = () => {
        const data: ImageData = {
            image: imageValue,
            imageType: typeModal === 'profileImage' ? 'profile' : 'cover',
        };

        mutation.mutate(data);
    };

    return (
        <>
            <div className='rounded-lg drop-shadow-lg bg-white dark:bg-dark1 h-fit pb-5 md:pb-[30px] mb-2 md:mb-[30px]'>
                <div className='relative h-[350px] w-full rounded-lg group'>
                    <Image
                        src={user.coverImage || ''}
                        fill
                        priority
                        alt='background'
                        className='object-cover rounded-t-lg'
                    />
                    <div className='flex flex-col items-center absolute -bottom-[26px] left-[30px]'>
                        <UserAvatar
                            src={user.profileImage}
                            username={user.name}
                            className='object-cover md:w-[150px] md:h-[150px] w-20 h-20 cursor-default'
                        />
                    </div>
                    <span className='absolute group-hover:opacity-100 opacity-0 right-5 top-5'>
                        {currentUser.id === user.id && (
                            <Button
                                variant='outline'
                                onClick={() => handleOpenModal('coverImage')}
                                className='max-w-[335px] md:max-w-[160px] w-full mx-auto md:mx-0'
                            >
                                Thêm ảnh nền
                            </Button>
                        )}
                    </span>
                </div>
                <div className='px-8 flex md:flex-row flex-col md:items-center gap-y-2 justify-between mt-10'>
                    <div className='flex flex-col items-start'>
                        <p className='text-2xl font-bold'>{user.name}</p>
                        <p className='text-sm text-gray78/60 dark:text-dark4'>
                            {user.email}
                        </p>
                    </div>

                    {currentUser.id === user.id ? (
                        <Button
                            variant='gray'
                            onClick={() => handleOpenModal('profileImage')}
                            className='max-w-[335px] md:max-w-[160px] w-full mx-auto md:mx-0'
                        >
                            Thêm ảnh đại diện
                        </Button>
                    ) : (
                        <ProfileActions
                            currentUser={currentUser}
                            userId={user.id}
                        />
                    )}
                </div>
            </div>
            <ImageUpload
                type={typeModal}
                value={imageValue}
                onChange={(image) => setImageValue(image)}
                onRemove={() => setImageValue('')}
                onSubmit={handleSubmit}
            />
        </>
    );
};
