'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import jwt from 'jsonwebtoken';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { Loader2, Lock } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthApi } from '@/api/auth/use-auth-api';
import { LoginFormType } from '../sign-in/page';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    newPassword: z.string().min(6, 'Tối thiểu 6 ký tự'),
    confirmNewPassword: z.string().min(6, 'Tối thiểu 6 ký tự'),
});

export type VerifyEmailForm = z.infer<typeof formSchema> & {
    resetToken: string;
};

const ConfirmationPage = () => {
    const router = useRouter();
    const { authToken } = useAuth();

    const { login, resetPassword } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const resetToken = searchParams.get('reset-token');

    let email = '';
    const decodedToken = resetToken && jwt.decode(resetToken);

    const form = useForm<VerifyEmailForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const { mutate, isSuccess: resetSuccess } = useMutation({
        mutationKey: ['confirm-password'],
        mutationFn: (values: VerifyEmailForm) => resetPassword(values),
        onError: () => setIsLoading(false),
    });

    const { mutate: mutateLogin, isSuccess: loginSuccess } = useMutation({
        mutationKey: ['login', 'confirm-page'],
        mutationFn: (values: LoginFormType) => login(values),
        onError: () => setIsLoading(false),
    });

    const signIn = useCallback(
        async (email: string, password: string) => {
            if (
                decodedToken &&
                typeof decodedToken !== 'string' &&
                decodedToken.email
            ) {
                email = decodedToken.email;

                mutateLogin({ email, password });
            }
        },
        [decodedToken, mutateLogin],
    );

    useEffect(() => {
        const { newPassword } = form.getValues();

        if (resetSuccess) {
            signIn(email, newPassword);
        }
    }, [email, form, resetSuccess, signIn]);

    useEffect(() => {
        if (loginSuccess && authToken?.accessToken) {
            router.refresh();
            router.push('/');
        }
    }, [router, loginSuccess, authToken?.accessToken, resetSuccess]);

    if (!decodedToken || authToken?.accessToken) {
        return redirect('/sign-in');
    }

    const onSubmit = async (value: VerifyEmailForm) => {
        const { newPassword, confirmNewPassword } = value;

        if (newPassword !== confirmNewPassword) {
            return toast.error('Mật khẩu không khớp!');
        }

        setIsLoading(true);

        const data = {
            resetToken,
            newPassword,
            confirmNewPassword,
        };

        mutate(data);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-y-[30px] min-w-[320px] w-full max-w-[580px] h-full'>
            <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                <h1 className=' font-bold text-lg lg:text-3xl'>
                    Đặt mật khẩu mới
                </h1>
            </div>
            <div className='bg-white dark:bg-[#212833] rounded-[20px] p-6 lg:p-10 flex flex-col gap-y-5 lg:gap-y-[30px] w-full'>
                {isLoading && (
                    <div className='bg-white/20 dark:bg-dark2/20 backdrop-blur-[2px] rounded-[20px] h-full w-full inset-0 absolute z-50 flex items-center justify-center transition select-none'>
                        <Loader2 className='w-10 h-10 animate-spin' />
                    </div>
                )}

                <Form {...form}>
                    <form
                        method='post'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col w-full space-y-5'
                    >
                        <FormField
                            control={form.control}
                            name='newPassword'
                            render={({ field }) => (
                                <FormItem className='w-full relative'>
                                    <Lock className='w-4 h-4  absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm bg-transparent dark:bg-dark2'
                                            placeholder='Mật khẩu mới'
                                            type='password'
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='confirmNewPassword'
                            render={({ field }) => (
                                <FormItem className='w-full relative'>
                                    <Lock className='w-4 h-4  absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            placeholder='Xác nhận mật khẩu mới'
                                            type='password'
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm dark:bg-dark2'
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            variant='blue'
                            type='submit'
                            className='w-full h-10 lg:h-[52px] rounded-md lg:rounded-[10px] text-sm md:text-base'
                        >
                            Xác nhận và đăng nhập
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ConfirmationPage;
