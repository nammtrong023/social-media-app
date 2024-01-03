'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import useConversation from '@/hooks/use-conversation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SendIcon from '@/components/icon/send-icon';
import { ImagePlus } from 'lucide-react';
import EmojiPicker from '@/components/emoji-picker';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { ImageUpload } from '@/components/images/image-upload';
import { useState } from 'react';
import { toast } from 'sonner';
import { useModalStore } from '@/hooks/use-modals';
import useMessagesApi, { MessageData } from '@/api/messages/use-messages-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
    content: z.string().min(1),
});

export type ConversationFormValue = z.infer<typeof formSchema>;

const ConversationForm = () => {
    const queryClient = useQueryClient();

    const [imageValue, setImageValue] = useState('');
    const { onOpen, onClose } = useModalStore();

    const { conversationId } = useConversation();
    const { createMessage } = useMessagesApi();

    const form = useForm<ConversationFormValue>({
        defaultValues: {
            content: '',
        },
    });

    const contentLength = form.getValues('content').length;

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-message'],
        mutationFn: (data: MessageData) => createMessage(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-msg'] });
            queryClient.invalidateQueries({ queryKey: ['get-conversation'] });
            onClose();
            form.reset();
            setImageValue('');
        },
        onError: (error) => {
            toast.error('Thất bại');
        },
    });

    const onSubmit = (values: ConversationFormValue) => {
        const data = {
            content: values.content,
            image: '',
            conversationId,
        };

        mutate(data);
    };

    const handleUpload = () => {
        const data = {
            content: 'image',
            image: imageValue,
            conversationId,
        };

        mutate(data);
    };

    return (
        <div className='p-5 bg-white dark:bg-dark1 border-t dark:border-dark3 flex items-center gap-2 lg:gap-4 w-full rounded-b-[10px]'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex items-center gap-2 lg:gap-4 w-full'
                >
                    <FormField
                        name='content'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='relative flex items-center gap-x-5'>
                                        <Input
                                            disabled={isPending}
                                            placeholder='Aa'
                                            className='w-full focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray78/5 rounded-[10px] h-10 pr-[75px]'
                                            {...field}
                                        />
                                        <Button
                                            disabled={
                                                isPending || !contentLength
                                            }
                                            type='submit'
                                            className='flex-1 rounded-[5px] bg-blue-100 hover:bg-blue-100/80 transition flex items-center justify-center h-10 p-3'
                                        >
                                            <SendIcon
                                                color={`${
                                                    !contentLength
                                                        ? '#4E5D78'
                                                        : '#377DFF'
                                                }`}
                                            />
                                        </Button>
                                        <span className='absolute z-10 right-[70px] top-1/2 -translate-y-1/2 text-gray78 flex items-center gap-x-1 w-fit'>
                                            <ImagePlus
                                                onClick={() =>
                                                    onOpen('uploadImage')
                                                }
                                                className='w-4 h-4 cursor-pointer dark:text-white'
                                            />
                                            <EmojiPicker
                                                onChange={(emoji: string) =>
                                                    field.onChange(
                                                        `${field.value} ${emoji}`,
                                                    )
                                                }
                                            />
                                        </span>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <ImageUpload
                type={null}
                loading={isPending}
                value={imageValue}
                onChange={(image) => setImageValue(image)}
                onRemove={() => setImageValue('')}
                onSubmit={handleUpload}
            />
        </div>
    );
};

export default ConversationForm;
