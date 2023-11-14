'use client';

import Link from 'next/link';
import GoogleIcon from '@/components/icon/google-icon';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tokens } from '@/types';
import { Button } from '@/components/ui/button';
import { AtSignIcon, Loader2, Lock } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/components/providers/auth-provider';

const formSchema = z.object({
    email: z.string().email('Email is not valid'),
    password: z.string().min(6, '6 characters at least'),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
    initialData: ProfileFormValues | null;
}

const LoginPage = ({ initialData }: ProfileFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isLoading, setisLoading] = useState(false);
    const { currentUser, isFetching, setAuthToken } = useAuth();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            email: '',
            password: '',
        },
    });

    const { data, mutate, isSuccess } = useMutation({
        mutationFn: async (values: ProfileFormValues) => {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                values,
            );

            return response.data as Tokens;
        },
        onError: (error: Error) => {
            console.log(error);
            setisLoading(false);
            toast.error('Email or password incorrect');
        },
    });

    const onSubmit = (values: ProfileFormValues) => {
        setisLoading(true);
        mutate(values);
    };

    useEffect(() => {
        if (isSuccess) {
            setCookie('access_token', data?.accessToken);
            setCookie('refresh_token', data?.refreshToken);
            setAuthToken({
                accessToken: data?.accessToken,
                refreshToken: data?.refreshToken,
            });
            queryClient.invalidateQueries();
            router.refresh();
            router.push('/');
        }
    }, [data, router, queryClient, isSuccess, currentUser, setAuthToken]);

    return (
        <div className='flex flex-col items-center justify-center gap-y-[30px] w-[580px] h-full'>
            <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                <h1 className='text-gray78 font-bold text-lg lg:text-3xl dark:text-white'>
                    Sign In
                </h1>
                <p className='text-gray78 font-medium text-sm lg:text-base dark:text-white text-center'>
                    Welcome back, you’ve been missed!
                </p>
            </div>
            <div className='bg-white relative dark:bg-[#212833] rounded-[20px] p-10 w-full flex flex-col gap-y-5 lg:gap-y-[30px]'>
                {isLoading && (
                    <div className='bg-white/20 dark:bg-dark2/20 backdrop-blur-[2px] rounded-[20px] h-full w-full inset-0 absolute z-50 flex items-center justify-center transition select-none'>
                        <Loader2 className='w-10 h-10 animate-spin' />
                    </div>
                )}

                <div className='flex items-center'>
                    <Button
                        variant='ghost'
                        className='py-18 pl-4 bg-gray78/5 dark:bg-gray78 h-10 lg:h-[52px] rounded-[10px] w-full'
                    >
                        <GoogleIcon />
                        <span className='ml-5 text-sm lg:text-base font-semibold text-gray78 dark:text-white select-none'>
                            Log in with Google
                        </span>
                    </Button>
                </div>

                <div className='flex items-center'>
                    <Separator className='w-1/2 h-[1px] shrink dark:bg-gray78' />
                    <span className='px-5 text-sm lg:text-lg font-bold text-gray78 dark:text-white'>
                        OR
                    </span>
                    <Separator className='w-1/2 h-[1px] shrink dark:bg-gray78' />
                </div>

                <Form {...form}>
                    <form
                        method='post'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col w-full space-y-5'
                    >
                        {/* EMAIL */}
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='w-full relative'>
                                    <AtSignIcon className='w-4 h-4 text-gray78 dark:text-white absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm bg-transparent border-[#4E5D78] dark:text-white'
                                            placeholder='Your email'
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
                            name='password'
                            render={({ field }) => (
                                <FormItem className='w-full relative'>
                                    <Lock className='w-4 h-4 text-gray78 dark:text-white absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            placeholder='Your password'
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm bg-transparent border-[#4E5D78] dark:text-white'
                                            disabled={isLoading}
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='font-medium text-sm text-right w-full dark:text-white'>
                            Forgot password?
                        </div>
                        <Button
                            disabled={isLoading}
                            variant='blue'
                            type='submit'
                            className='w-full h-10 lg:h-[52px] rounded-md lg:rounded-[10px] mt-[30px] text-sm md:text-base'
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>

                <div className='text-sm md:text-base text-gray78 dark:text-white font-medium mt-[30px] text-center'>
                    You haven&apos;t account?
                    <Link href='/sign-up' className='ml-4 text-[#377DFF]'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
