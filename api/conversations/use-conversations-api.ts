import useAxiosPrivate from '@/hooks/use-axios-private';
import { ConversationType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/conversations`;

const useConversationsApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getConversations = async () => {
        const response = await axiosPrivate.get(baseUrl);

        return response.data as ConversationType[];
    };

    const getConversationById = async (postId: string) => {
        const response = await axiosPrivate.get(`${baseUrl}/${postId}`);

        return response.data as ConversationType;
    };

    const createConversation = async (userId: string) => {
        const response = await axiosPrivate.post(`${baseUrl}`, { userId });

        return response.data as ConversationType;
    };

    const deleteConversation = async (conversationId: string | undefined) => {
        await axiosPrivate.delete(`${baseUrl}/${conversationId}`);
    };

    return {
        getConversations,
        getConversationById,
        createConversation,
        deleteConversation,
    };
};

export default useConversationsApi;
