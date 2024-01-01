import useAxiosPrivate from '@/hooks/use-axios-private';
import { CommentType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/comments`;

export type CommentDataType = {
    content: string;
    postId: string;
};

const useCommentsApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getCommentsByPostId = async (postId: string) => {
        const response = await axiosPrivate.get(`${baseUrl}/posts/${postId}`);

        return response.data.data as CommentType[];
    };

    const createComment = async (data: CommentDataType) => {
        const response = await axiosPrivate.post(`${baseUrl}`, data);

        return response.data as CommentType;
    };

    const updateComment = async (commentId: string, content: string) => {
        const response = await axiosPrivate.patch(`${baseUrl}/${commentId}`, {
            content,
        });

        return response.data as CommentType;
    };

    const deleteComment = async (commentId: string) => {
        return await axiosPrivate.delete(`${baseUrl}/${commentId}`);
    };

    return {
        getCommentsByPostId,
        createComment,
        updateComment,
        deleteComment,
    };
};

export default useCommentsApi;
