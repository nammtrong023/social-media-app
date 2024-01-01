'use client';

import useAxiosPrivate from '@/hooks/use-axios-private';
import { PostType } from '@/types';

export type PostDataType = {
    title: string | null;
    images: {
        url: string | undefined;
    }[];
};
const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/posts`;

const usePostsApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getPosts = async ({ pageParam }: { pageParam: number }) => {
        const response = await axiosPrivate.get(`${baseURL}?page=` + pageParam);

        return response.data.data;
    };

    const getPostById = async (postId: string) => {
        const response = await axiosPrivate.get(`${baseURL}/${postId}`);
        return response.data as PostType;
    };

    const getPostsByUserId = async (userId: string, pageParam: number) => {
        const response = await axiosPrivate.get(`${baseURL}/users/${userId}?page=` + pageParam);

        return response.data.data;
    };

    const createPost = async (data: PostDataType) => {
        return await axiosPrivate.post(baseURL, data);
    };

    const updatePost = async (postId: string, data: PostDataType) => {
        return await axiosPrivate.patch(`${baseURL}/${postId}`, data);
    };

    const deletePost = async (postId: string) => {
        return await axiosPrivate.delete(`${baseURL}/${postId}`);
    };

    return { getPosts, getPostById, getPostsByUserId, createPost, updatePost, deletePost };
};

export default usePostsApi;
