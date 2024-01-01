'use client';

import React, { Fragment, useEffect, useRef } from 'react';
import { MessageType } from '@/types';
import MessageBox from './message-box';
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatScroll } from '@/hooks/use-chat-scroll';
import { ArrowDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';

const ConversationBody = () => {
    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {
        isScrolling,
        isAppearing,
        setIsScrolling,
        jumpToBottom,
        handleScroll,
        scrollToBottom,
    } = useScrollToBottom({
        chatRef,
        bottomRef,
    });

    const { data, isFetchingNextPage, status, hasNextPage, fetchNextPage } =
        useChatQuery();

    useChatScroll({
        chatRef,
        bottomRef,
        count: data?.pages?.[0]?.data?.length ?? 0,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        loadMore: fetchNextPage,
    });

    useEffect(() => {
        if (!isFetchingNextPage) {
            scrollToBottom();
            handleScroll();
            setIsScrolling(false);
        } else {
            setIsScrolling(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isFetchingNextPage, setIsScrolling]);

    return (
        <>
            <div
                ref={chatRef}
                className={cn(
                    'flex-1 overflow-y-auto h-full w-full bg-white dark:bg-dark1',
                    isScrolling && 'scroll-smooth',
                )}
                onScroll={handleScroll}
            >
                {status === 'pending' && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Loader2 className='h-9 w-9 text-zinc-500 animate-spin' />
                    </div>
                )}

                {status !== 'pending' && (
                    <>
                        {!hasNextPage && <div className='flex-1' />}

                        {hasNextPage && (
                            <div className='flex justify-center'>
                                {isFetchingNextPage && (
                                    <Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4' />
                                )}
                            </div>
                        )}

                        <div className='flex flex-col-reverse mt-auto'>
                            {data?.pages.map((group, i) => (
                                <Fragment key={i}>
                                    {group.data.map((message: MessageType) => (
                                        <MessageBox
                                            key={message.id}
                                            data={message}
                                        />
                                    ))}
                                </Fragment>
                            ))}
                        </div>

                        <div className='pt-20' ref={bottomRef} />

                        {isAppearing && (
                            <Button
                                className='sticky bottom-[6%] left-1/2 -translate-x-1/2 rounded-full p-2 flex-shrink-0 bg-dark1/80 dark:bg-white'
                                onClick={jumpToBottom}
                                disabled={isFetchingNextPage}
                            >
                                <ArrowDown className='w-6 h-6' />
                            </Button>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default React.memo(ConversationBody);
