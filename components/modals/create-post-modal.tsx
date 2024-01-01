'use client';

import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import UserInfo from '../user/user-info';
import EmojiPicker from '../emoji-picker';
import { usePostStore } from '@/hooks/use-post';
import UserAvatar from '@/components/user/user-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { UserType } from '@/types';
import { useModalStore } from '@/hooks/use-modals';
import usePostsApi, { PostDataType } from '@/api/posts/use-posts-api';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, useMutation } from '@tanstack/react-query';
import ImageUpLoadMultiple from '../images/image-upload-multiple';
import { useEffect } from 'react';

const formSchema = z.object({
    images: z
        .string()
        .array()
        .refine((value) => value.length > 0, 'Vui lòng thêm hình ảnh!'),
    title: z.string().nullable(),
});

type PostFormValues = z.infer<typeof formSchema>;

const CreatePostModal = ({ currentUser }: { currentUser: UserType }) => {
    const router = useRouter();
    const queryClient = new QueryClient();
    const { createPost, updatePost } = usePostsApi();

    const { isOpen, type, onClose } = useModalStore();
    const isOpenPostCreate = isOpen && type === 'createPost';

    const { postData: initialData } = usePostStore();
    const isExistedInitialData = initialData && initialData.postId;

    const defaulValues = {
        title: initialData.title,
        images: initialData.images,
    };

    const form = useForm<PostFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaulValues || {
            title: '',
            images: [],
        },
    });

    useEffect(() => {
        if (initialData) {
            form.setValue('title', initialData.title);
            form.setValue('images', initialData.images);
        }
    }, [form, initialData]);

    const validatePost =
        !initialData.images.length && !form.getValues('images').length;

    const mutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: (postData: PostDataType) => {
            if (initialData?.postId) {
                return updatePost(initialData.postId, postData);
            }

            return createPost(postData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            queryClient.invalidateQueries({
                queryKey: ['get-posts-by-userId'],
            });
            toast.success('Success');
            onClose();
        },
        onError: () => {
            toast.error('Something went wrong');
        },
    });

    const onSubmit = (values: PostFormValues) => {
        const imagesData = values.images.map((url) => ({ url }));

        const data = {
            title: values.title,
            images: imagesData,
        };

        mutation.mutate(data);
    };

    const goToProfile = () => {
        router.push(`/profiles/${currentUser.id}`);
    };

    return (
        <Dialog open={isOpenPostCreate} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    'bg-white dark:bg-dark1',
                    mutation.isPending && 'select-none',
                )}
            >
                <div className='bg-white dark:bg-dark1 sm:max-w-[512px] overflow-x-hidden w-full h-fit'>
                    <DialogTitle className='font-bold title-base title-textGray mb-2'>
                        {isExistedInitialData ? 'Sửa bài viết' : 'Tạo bài viết'}
                    </DialogTitle>
                    <hr className='dark:border-dark3' />
                    <div className='pb-0 w-full h-fit max-h-[500px] overflow-auto'>
                        <UserInfo
                            user={currentUser}
                            className='md:hidden my-2'
                        />
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-3 w-full'
                            >
                                <div className='flex gap-x-3 mt-2 w-full relative'>
                                    <UserAvatar
                                        onClick={goToProfile}
                                        src={currentUser.profileImage}
                                        username={currentUser.name}
                                        className='hidden md:inline-block'
                                    />
                                    <FormField
                                        name='title'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormControl>
                                                    <>
                                                        <Textarea
                                                            value={
                                                                field.value ||
                                                                ''
                                                            }
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder={`Bạn đang nghĩ gì? ${currentUser.name}`}
                                                            className='min-h-[110px] resize-none min-w-[270px] sm:min-w-[350px]  bg-gray78/5 dark:bg-dark2/50 px-3 pr-9 py-2 outline-none rounded-lg dark:border-dark3 relative'
                                                            maxLength={200}
                                                            rows={3}
                                                        />
                                                        <span className='absolute right-3 top-0'>
                                                            <EmojiPicker
                                                                size={20}
                                                                onChange={(
                                                                    emoji: string,
                                                                ) =>
                                                                    field.onChange(
                                                                        `${field.value} ${emoji}`,
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    name='images'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <ImageUpLoadMultiple
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onRemove={(prevImg) => {
                                                        const images =
                                                            field.value.filter(
                                                                (image) =>
                                                                    image !==
                                                                    prevImg,
                                                            );
                                                        field.onChange(images);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={
                                        validatePost || mutation.isPending
                                    }
                                    variant='blue'
                                    type='submit'
                                    className='mt-3 px-5 py-3 select-none title-center w-full md:min-w-[80px] md:max-w-fit md:flex ml-auto'
                                >
                                    {mutation.isPending ? (
                                        <Loader2 className='w-5 h-5 animate-spin' />
                                    ) : isExistedInitialData ? (
                                        'Lưu thay đổi'
                                    ) : (
                                        'Đăng'
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostModal;
