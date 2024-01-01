import {  useState } from 'react';

interface ScrollToBottomProps {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
}

export const useScrollToBottom = ({
    chatRef,
    bottomRef,
}: ScrollToBottomProps) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [isAppearing, setIsAppearing] = useState(false);

    const jumpToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    };

    const scrollToBottom = () => {
        if (chatRef.current) {
            const { clientHeight } = chatRef.current;

            if (isScrolling) {
                chatRef.current.scrollTop = clientHeight * 0.5;
            }

            if (!isScrolling) {
                return jumpToBottom();
            }
        }
    };

    const handleScroll = () => {
        if (chatRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = chatRef.current;

            const isAtBottom = scrollTop >= scrollHeight - clientHeight;

            const isNearBottom = scrollHeight - clientHeight - scrollTop <= 400;

            setIsAppearing(!isAtBottom && !isNearBottom);
        }
    };

    return {
        isScrolling,
        isAppearing,
        setIsScrolling,
        handleScroll,
        jumpToBottom,
        scrollToBottom,
    };
};
