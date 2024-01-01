import { useInfiniteQuery } from '@tanstack/react-query';
import { useSocket } from '@/components/providers/socket-provider';
import useAxiosPrivate from './use-axios-private';
import useConversation from './use-conversation';
import { MessageType } from '@/types';

export type MessagePaginationType = {
    data: MessageType[];
    nextCursor: string | null;
};

export const useChatQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    const { isConnected } = useSocket();
    const { conversationId } = useConversation();

    const fetchMessages = async (pageParam: undefined) => {
        const result = await axiosPrivate.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/messages`,
            {
                params: {
                    cursor: pageParam,
                    conversationId,
                },
            },
        );

        return result.data;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: ['get-msg'],
            queryFn: ({ pageParam }) => fetchMessages(pageParam),
            initialPageParam: undefined,
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
            refetchInterval: isConnected ? false : 1000,
        });

    return {
        data,
        hasNextPage,
        status,
        isFetchingNextPage,
        fetchNextPage,
    };
};
