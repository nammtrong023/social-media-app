'use client';

import FormGroup from '@/components/form-group';
import { Button } from '@/components/ui/button';
import { DateFieldForm } from '@/components/ui/date-field-form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { DateValidationError } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { RadioGroupForm } from '@/components/ui/radio-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Gender } from '@/types';

const formSchema = z.object({
    name: z.string().min(5, 'Tối thiểu 5 ký tự'),
    password: z.string().min(6, 'Tối thiểu 6 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    birth: z.date({
        required_error: 'Vui lòng chọn ngày sinh',
        invalid_type_error: 'Vui lòng chọn ngày sinh',
    }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
        errorMap: () => ({ message: 'Vui lòng chọn giới tính!' }),
    }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
    initialData: ProfileFormValues;
}

const RegisterPage = ({ initialData }: ProfileFormProps) => {
    const router = useRouter();
    const { theme } = useTheme();

    const queryClient = useQueryClient();
    const isLaptop = useMediaQuery('(min-width:1024px)');

    const [isLoading, setisLoading] = useState(false);
    const [errorDateField, setErrorDateField] =
        useState<DateValidationError | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            birth: null,
            email: '',
            password: '',
            gender: null,
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: ProfileFormValues) => {
            return await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
                values,
            );
        },
        onSuccess: () => {
            toast.success('Thành công');
            router.push('/sign-in');
        },
        onError: (error: Error) => {
            setisLoading(false);
            toast.error('Email đã tồn tại!');
        },
    });

    const onSubmit = async (values: ProfileFormValues) => {
        setisLoading(true);
        mutation.mutate(values);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-y-[30px] min-w-[320px] w-full max-w-[580px] h-full'>
            <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                <h1 className=' font-bold text-lg lg:text-3xl'>
                    Đăng ký tài khoản
                </h1>
                <p className=' font-medium text-sm lg:text-base text-center'>
                    Tạo tài khoản để tiếp tục và kết nối với mọi người.
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
                        className='py-18 pl-4 bg-gray78/5 dark:bg-gray78 h-10 lg:h-[52px] rounded-[10px] w-full'
                    >
                        <GoogleIcon />
                        <span className='ml-5 text-sm lg:text-base font-semibold '>
                            Đăng nhập Google
                        </span>
                    </Button>
                </div>

                <div className='flex items-center'>
                    <Separator className='w-1/2 h-[1px] shrink dark:bg-gray78' />
                    <span className='px-5 text-sm lg:text-lg font-bold '>
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
                                    <AtSignIcon className='w-4 h-4  absolute left-5 top-[11px] lg:top-[19px] font-bold' />
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
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    borderRadius: isLaptop
                                                        ? '10px'
                                                        : '6px',
                                                    height: isLaptop
                                                        ? '52px'
                                                        : '40px',
                                                    color:
                                                        theme === 'dark'
                                                            ? '#fff'
                                                            : '#4e5d78',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color:
                                                        theme === 'dark'
                                                            ? '#fff'
                                                            : '#4e5d78',
                                                },
                                                '& .MuiOutlinedInput-notchedOutline':
                                                    {
                                                        borderColor: '#4e5d78',
                                                    },
                                                '& .css-dt8m01-MuiFormHelperText-root.Mui-error':
                                                    {
                                                        color: '#FF5630',
                                                    },
                                                width: '100%',
                                            }}
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
                                                color={
                                                    theme == 'dark'
                                                        ? '#fff'
                                                        : '#4E5D78'
                                                }
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
                <div className='flex items-center justify-center gap-x-[19px]  text-sm md:text-base font-medium mt-[30px]'>
                    Bạn đã có tài khoản?
                    <Link href='/sign-in' className='text-[#377DFF]'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
