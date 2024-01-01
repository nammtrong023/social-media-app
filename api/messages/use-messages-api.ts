import useAxiosPrivate from '@/hooks/use-axios-private';
import { MessageType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/messages`;

export type MessageData = {
    content: string;
    image: string;
    conversationId: string;
};

const useMessagesApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getMgsByConvoId = async (pageParam: number, convoId: string) => {
        const response = await axiosPrivate.get(`${baseUrl}/${convoId}?page=` + pageParam);

        return response.data.data as MessageType[];
    };

    const createMessage = async (data: MessageData) => {
        const response = await axiosPrivate.post(`${baseUrl}`, data);

        return response.data as MessageType;
    };

    return {
        getMgsByConvoId,
        createMessage,
    };
};

export default useMessagesApi;
