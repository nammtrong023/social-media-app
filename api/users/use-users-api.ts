'use client';

import { NotificationType, UserType } from '@/types';
import useAxiosPrivate from '@/hooks/use-axios-private';
import { ProfileFormValues } from '@/components/modals/edit-profile-info-modal';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;

export type ImageData = {
    image: string;
    imageType: 'profile' | 'cover';
};

const useUsersApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getOtherUsers = async () => {
        const response = await axiosPrivate.get(`${baseUrl}/other-users`);

        return response.data.data as UserType[];
    };

    const getUserById = async (userId: string) => {
        const response = await axiosPrivate.get(`${baseUrl}/${userId}`);

        return response.data as UserType;
    };

    const updateUserInfo = async (userId: string, data: ProfileFormValues) => {
        const response = await axiosPrivate.patch(`${baseUrl}/${userId}`, data);

        return response.data as UserType | string;
    };

    const updateUserImage = async (userId: string, data: ImageData) => {
        return await axiosPrivate.patch(`${baseUrl}/images/${userId}`, data);
    };

    const getFollowers = async (userId: string) => {
        const response = await axiosPrivate.get(
            `${baseUrl}/followers/${userId}`,
        );

        return response.data as UserType[];
    };

    const getFollowings = async (userId: string) => {
        const response = await axiosPrivate.get(
            `${baseUrl}/followings/${userId}`,
        );

        return response.data as UserType[];
    };

    const getNotifications = async (userId: string | undefined) => {
        const response = await axiosPrivate.get(
            `${baseUrl}/notifications/${userId}`,
        );

        return response.data as NotificationType[];
    };

    const updateNotification = async (notiId: string) => {
        await axiosPrivate.patch(`${baseUrl}/notifications/${notiId}`);
    };

    return {
        getOtherUsers,
        getUserById,
        updateUserInfo,
        updateUserImage,
        getFollowers,
        getFollowings,
        getNotifications,
        updateNotification,
    };
};

export default useUsersApi;
