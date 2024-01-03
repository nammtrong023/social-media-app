'use client';

import FormGroup from '@/components/form-group';
import { Button } from '@/components/ui/button';
import { DateFieldForm } from '@/components/ui/date-field-form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DateValidationError } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { RadioGroupForm } from '@/components/ui/radio-form';
import { useMutation } from '@tanstack/react-query';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { AtSignIcon, Loader2, Lock, Smile } from 'lucide-react';
import Link from 'next/link';
import GoogleIcon from '@/components/icon/google-icon';
import { Separator } from '@/components/ui/separator';
import { TextField, styled, useMediaQuery } from '@mui/material';
import { useTheme } from 'next-themes';
import { Gender } from '@/types';
import { useSignInOauth } from '@/hooks/use-sign-in-oauth';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(5, 'Tối thiểu 5 ký tự'),
    password: z.string().min(6, 'Tối thiểu 6 ký tự'),
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    birth: z.date({
        required_error: 'Vui lòng chọn ngày sinh',
    }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
        errorMap: () => ({ message: 'Vui lòng chọn giới tính!' }),
    }),
});

type RegisterFormType = z.infer<typeof formSchema>;

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

const RegisterPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const isLaptop = useMediaQuery('(min-width:1024px)');

    const { setEmailSignUp } = useAuth();
    const { isLoading, setisLoading, signInWithOauth } = useSignInOauth();

    const [errorDateField, setErrorDateField] =
        useState<DateValidationError | null>(null);

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            birth: undefined,
            email: '',
            password: '',
            gender: undefined,
        },
    });

    const { mutate: signUp, isSuccess } = useMutation({
        mutationFn: async (values: RegisterFormType) => {
            return await axios.post(`${baseUrl}/register`, values);
        },
        onSuccess: () => {
            toast.success('Thành công');
            setisLoading(false);
        },
        onError: (error) => {
            setisLoading(false);
            toast.error('Email không hợp lệ!');
        },
    });

    const onSubmit = async (values: RegisterFormType) => {
        setisLoading(true);
        signUp(values);
    };

    useEffect(() => {
        const emailValue = form.getValues('email');

        if (isSuccess) {
            setEmailSignUp(emailValue);
            router.refresh();
            router.push('/verify/otp');
        }
    }, [form, isSuccess, router, setEmailSignUp]);

    const sxStyle = {
        '& .MuiInputBase-root': {
            borderRadius: isLaptop ? '10px' : '6px',
            height: isLaptop ? '52px' : '40px',
            color: theme === 'dark' ? '#fff' : '#4e5d78',
        },
        '& .MuiSvgIcon-root': {
            color: theme === 'dark' ? '#fff' : '#4e5d78',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4e5d78',
        },
        '& .css-dt8m01-MuiFormHelperText-root.Mui-error': {
            color: '#FF5630',
        },
        width: '100%',
        '&:hover .fieldset': {
            borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#4e5d78',
            },
        },
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                <h1 className=' font-bold text-lg lg:text-3xl'>
                    {!isSuccess ? 'Đăng ký tài khoản' : 'Xác thực email'}
                </h1>
                <p className='font-medium text-sm lg:text-base text-center'>
                    {!isSuccess
                        ? 'Tạo tài khoản để tiếp tục và kết nối với mọi người.'
                        : 'Vui lòng kiểm tra email của bạn.'}
                </p>
            </div>
            <div className='bg-white dark:bg-[#212833] rounded-[20px] p-6 lg:p-10 flex flex-col gap-y-5 lg:gap-y-[30px] w-full'>
                {isLoading && (
                    <div className='bg-white/20 dark:bg-dark2/20 backdrop-blur-[2px] rounded-[20px] h-full w-full inset-0 absolute z-50 flex items-center justify-center transition select-none'>
                        <Loader2 className='w-10 h-10 animate-spin' />
                    </div>
                )}

                <div className='flex items-center'>
                    <Button
                        variant='ghost'
                        onClick={() => signInWithOauth()}
                        className='py-18 pl-4 bg-gray78/5 dark:bg-gray78 h-10 lg:h-[52px] rounded-[10px] w-full'
                    >
                        <GoogleIcon />
                        <span className='ml-5 text-sm lg:text-base font-semibold '>
                            Đăng nhập với Google
                        </span>
                    </Button>
                </div>
                <div className='flex items-center'>
                    <Separator className='w-1/2 h-[1px] shrink dark:bg-gray78' />
                    <span className='px-5 text-sm lg:text-lg font-bold '>
                        Hoặc
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
                                    <AtSignIcon className='w-4 h-4 absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm bg-transparent dark:bg-dark2'
                                            placeholder='Your email'
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* NAME */}
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='w-full relative'>
                                    <Smile
                                        className='w-4 h-4 absolute left-5 top-[11px] lg:top-[19px]
                                        font-bold'
                                    />
                                    <FormControl>
                                        <Input
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm dark:bg-dark2'
                                            placeholder='Your name'
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
                                    <Lock className='w-4 h-4  absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                    <FormControl>
                                        <Input
                                            placeholder='Your password'
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

                        <FormGroup>
                            <FormField
                                control={form.control}
                                name='birth'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <DateFieldForm
                                            error={errorDateField}
                                            onError={(newError) =>
                                                setErrorDateField(newError)
                                            }
                                            field={field}
                                            onChange={(date) => {
                                                field.onChange(date);
                                            }}
                                            sx={sxStyle}
                                            disabled={isLoading}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* GENDER */}
                            <FormField
                                control={form.control}
                                name='gender'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] w-full border border-gray78 flex items-center justify-center'>
                                            <RadioGroupForm
                                                className='flex items-center justify-center !mt-0'
                                                field={field}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormGroup>

                        <Button
                            disabled={isLoading || errorDateField !== null}
                            variant='blue'
                            type='submit'
                            className='w-full h-10 lg:h-[52px] rounded-md lg:rounded-[10px] text-sm md:text-base'
                        >
                            Đăng ký
                        </Button>
                    </form>
                </Form>

                <div className='flex items-center justify-center text-sm md:text-base font-medium mt-[30px]'>
                    Bạn đã có tài khoản?
                    <Link href='/sign-in' className='ml-2 text-[#377DFF]'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
