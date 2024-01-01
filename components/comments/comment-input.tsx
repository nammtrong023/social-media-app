'use client';

import * as z from 'zod';
import React, { FC, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import UserAvatar from '@/components/user/user-avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EmojiPicker from '@/components/emoji-picker';
import { Button } from '@/components/ui/button';
import SendIcon from '@/components/icon/send-icon';
import TextareaPost from '@/components/posts/components/textarea-post';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { PostType, UserType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCommentsApi, {
    CommentDataType,
} from '@/api/comments/use-comments-api';

interface CommentInputProps {
    post: PostType;
    currentUser: UserType;
}

const formSchema = z.object({
    content: z.string().min(1),
});

type CommentFormType = z.infer<typeof formSchema>;

const CommentInput: FC<CommentInputProps> = ({ currentUser, post }) => {
    const queryClient = useQueryClient();
    const { createComment } = useCommentsApi();

    const form = useForm<CommentFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    const mutate = useMutation({
        mutationKey: ['create-comment'],
        mutationFn: (data: CommentDataType) => createComment(data),
        onSuccess: () => {
            form.reset();
            toast.success('Thành công');
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            queryClient.invalidateQueries({ queryKey: ['get-post-by-id'] });
            queryClient.invalidateQueries({
                queryKey: ['get-posts-by-userId'],
            });
        },
    });

    const onSubmit = useCallback(
        (values: CommentFormType) => {
            if (values.content === '') return;

            const data = {
                content: values.content,
                postId: post.id,
            };

            mutate.mutate(data);
        },
        [mutate, post.id],
    );

    return (
        <div className='flex gap-x-[10px]'>
            <UserAvatar
                src={currentUser?.profileImage}
                username={currentUser.name}
                className='w-[42px] h-[42px]'
            />
            <Form {...form}>
                <form className='flex-1' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative bg-[#f6f7f8] dark:bg-dark2 rounded-[10px] flex items-center justify-between w-full pr-1'>
                                        <TextareaPost
                                            disabled={mutate.isPending}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <EmojiPicker
                                            onChange={(emoji: string) =>
                                                field.onChange(
                                                    `${field.value} ${emoji}`,
                                                )
                                            }
                                        />
                                        <Button
                                            size='icon'
                                            variant='ghost'
                                            type='submit'
                                            disabled={
                                                !field.value.length ||
                                                mutate.isPending
                                            }
                                            className='hover:bg-[#ecedee] hover:bg-opacity-70 dark:hover:bg-gray78/10 w-8 h-7 rounded-full cursor-pointer transition'
                                        >
                                            <SendIcon
                                                color={
                                                    !!field.value.length
                                                        ? '#377DFF'
                                                        : '#4E5D78'
                                                }
                                            />
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default CommentInput;
