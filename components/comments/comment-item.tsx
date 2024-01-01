'use client';

import * as z from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, formatCreatedAt } from '@/lib/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserAvatar from '@/components/user/user-avatar';
import { useForm } from 'react-hook-form';
import EmojiPicker from '@/components/emoji-picker';
import { Button } from '@/components/ui/button';
import SendIcon from '@/components/icon/send-icon';
import TextareaPost from '@/components/posts/components/textarea-post';
import PostControl from '../posts/components/post-control';
import { CommentType, UserType } from '@/types';
import { AlertModal } from '../modals/alert-modal';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useCommentsApi from '@/api/comments/use-comments-api';

interface CommentItemProps {
    data: CommentType;
    currentUser: UserType;
    background?: string;
}

const formSchema = z.object({
    content: z.string().min(1),
});

type CommentDataType = z.infer<typeof formSchema>;

const CommentItem: React.FC<CommentItemProps> = ({
    data,
    currentUser,
    background = 'bg-white',
}) => {
    const router = useRouter();
    const queryClient = new QueryClient();

    const { deleteComment, updateComment } = useCommentsApi();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [editCommentId, setEditCommentId] = useState<string | null>(null);

    const form = useForm<CommentDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: data.content || '',
        },
    });

    useEffect(() => {
        if (data.content) {
            form.setValue('content', data.content);
        }
    }, [data.content, form]);

    const onDetele = useMutation({
        mutationKey: ['detele-comment'],
        mutationFn: () => deleteComment(data.id),
        onSuccess: () => {
            toast.success('Thành công');
            setIsOpenAlert(false);
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            router.refresh();
        },
        onError: () => {
            toast.error('Thất bại');
        },
    });

    const handleEdit = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }

        if (editCommentId !== data.id) {
            setEditCommentId(null);
        }

        setEditCommentId(data.id);
    };

    const mutation = useMutation({
        mutationKey: ['update-comment'],
        mutationFn: (values: CommentDataType) =>
            updateComment(data.id, values.content),
        onSuccess: () => {
            form.reset();
            setEditCommentId(null);
            toast.success('Thành công');
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            router.refresh();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const onSubmit = useCallback(
        (values: CommentDataType) => {
            if (values.content === '') return;

            mutation.mutate(values);
        },
        [mutation],
    );

    const handleKeyDown = useCallback((event: any) => {
        if (event.key === 'Escape' || event.code === 'Escape') {
            setEditCommentId(null);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <>
            <div className='w-full px-5'>
                <div className='flex gap-x-[10px] h-fit py-2'>
                    <UserAvatar
                        src={data.user.profileImage}
                        username={currentUser.name}
                        className='w-8 h-8'
                    />
                    <div
                        className={cn(
                            'w-full min-w-[250px] dark:bg-dark1 max-w-[443px] p-2 flex flex-col rounded-xl relative min-h-[52px]',
                            background,
                        )}
                    >
                        <div className='flex items-center justify-between w-full'>
                            <span className='flex items-center gap-x-1 min-h-[32px]'>
                                <p className='text-sm font-medium'>
                                    {data.user.name}
                                </p>
                                <span className='text-xs opacity-60'>
                                    {formatCreatedAt(data.createdAt)}
                                </span>
                            </span>
                            {currentUser.id === data.userId && (
                                <span className='ml-auto relative'>
                                    <PostControl
                                        onChange={handleEdit}
                                        onDetele={() => setIsOpenAlert(true)}
                                    />
                                </span>
                            )}
                        </div>
                        {data.id === editCommentId ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name='content'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className='relative bg-[#f6f7f8] dark:bg-dark1 rounded-[10px] flex items-center justify-between w-full'>
                                                        <TextareaPost
                                                            textareaRef={
                                                                textareaRef
                                                            }
                                                            disabled={
                                                                mutation.isPending
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                        <EmojiPicker
                                                            onChange={(
                                                                emoji: string,
                                                            ) =>
                                                                field.onChange(
                                                                    `${field.value} ${emoji}`,
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            size='icon'
                                                            variant='ghost'
                                                            className='p-1'
                                                            disabled={
                                                                !field.value
                                                                    .length ||
                                                                mutation.isPending
                                                            }
                                                        >
                                                            <SendIcon
                                                                color={`${
                                                                    !!field
                                                                        .value
                                                                        .length
                                                                        ? '#377DFF'
                                                                        : '#4E5D78'
                                                                }`}
                                                            />
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        ) : (
                            <p className='text-sm break-words max-w-full'>
                                {data.content}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <AlertModal
                title='Xoá bình luận'
                isOpen={isOpenAlert}
                loading={onDetele.isPending}
                onClose={() => setIsOpenAlert(false)}
                onConfirm={onDetele.mutate}
            />
        </>
    );
};

export default CommentItem;
