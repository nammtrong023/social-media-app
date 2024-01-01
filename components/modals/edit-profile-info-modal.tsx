'use client';

import * as z from 'zod';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { RadioGroupForm } from '@/components/ui/radio-form';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { DateFieldForm } from '@/components/ui/date-field-form';
import { DateValidationError } from '@mui/x-date-pickers';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { Gender } from '@/types';
import useUsersApi from '@/api/users/use-users-api';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import dayjs from 'dayjs';

const formSchema = z.object({
    name: z.string().min(5, 'Độ dài tối thiểu là 5'),
    birth: z.date({ invalid_type_error: 'Vui lòng không để trống' }),
    email: z.string().email('Email không hợp lệ'),
    gender: z.enum([Gender.MALE, Gender.FEMALE]).nullable(),
    bio: z.string().nullable(),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
    initialData: ProfileFormValues | null;
}

export function EditProfileInfoModal({ initialData }: ProfileFormProps) {
    const params = useParams();

    const { theme } = useTheme();
    const { updateUserInfo } = useUsersApi();

    const queryClient = useQueryClient();
    const profileId = params.profileId as string;

    const [isOpen, setIsOpen] = useState(false);
    const [errorDateField, setErrorDateField] =
        useState<DateValidationError | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            birth: dayjs(initialData?.birth).toDate(),
            gender: initialData?.gender || null,
            bio: initialData?.bio || '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['update-user-info'],
        mutationFn: (data: ProfileFormValues) => {
            return updateUserInfo(profileId, data);
        },
        onSuccess: () => {
            setIsOpen(false);
            toast.success('Thành công');
            queryClient.invalidateQueries({ queryKey: ['get-user'] });
            queryClient.invalidateQueries({ queryKey: ['get-current-user'] });
        },
        onError: () => {
            toast.error('Thất bại');
        },
    });

    const onSubmit = (data: ProfileFormValues) => {
        mutate(data);
    };

    const sxStyle = {
        '& .MuiInputBase-root': {
            borderRadius: '6px',
            height: '40px',
            color: theme === 'dark' ? 'white' : '#4e5d78',
        },
        '& .MuiSvgIcon-root': {
            color: theme === 'dark' ? 'white' : '#4e5d78',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4e5d78',
        },
        '& .css-dt8m01-MuiFormHelperText-root.Mui-error': {
            color: '#FF5630',
        },
        width: '100%',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#4e5d78',
            },
        },
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsOpen(true)}
                    className='max-w-[335px] w-full'
                    variant='gray'
                >
                    Chỉnh sửa
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[712px] w-full inline-block dark:bg-dark1'>
                <DialogHeader className='mb-5'>
                    <DialogTitle onClick={() => form.reset()}>
                        Chỉnh sửa thông tin
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <div className='h-fit bg-white dark:bg-dark1 px-5'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='gap-y-8 w-full mt-5'
                        >
                            <FormGroup>
                                {/* NAME */}
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem className='w-full sm:w-[240px]'>
                                            <FormLabel>Tên</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Trọng Nam'
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* BIRTH */}
                                <FormField
                                    control={form.control}
                                    name='birth'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col gap-y-2 sm:justify-between h-[72px] w-full sm:w-[240px] relative'>
                                            <FormLabel>Ngày sinh</FormLabel>
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
                                                disabled={isPending}
                                            />
                                            {field.value === null && (
                                                <FormMessage className='absolute bottom-[-25px] left-4' />
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* EMAIL */}
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='w-full sm:w-[240px]'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='ttnamm23@gmail.com'
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* GENDER */}
                                <FormField
                                    control={form.control}
                                    name='gender'
                                    render={({ field }) => (
                                        <FormItem className='h-[72px] w-full sm:w-[240px]'>
                                            <FormLabel className='mb-auto'>
                                                Giới tính
                                            </FormLabel>
                                            <RadioGroupForm
                                                field={field}
                                                disabled={isPending}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>

                            <FormField
                                control={form.control}
                                name='bio'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col justify-between h-[72px]'>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isPending}
                                                placeholder='Mô tả về bạn'
                                                className='resize-none'
                                                maxLength={100}
                                                value={field.value || ''}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full text-right mt-12'>
                                <Button
                                    disabled={
                                        isPending || errorDateField !== null
                                    }
                                    variant='blue'
                                    type='submit'
                                    className='sm:w-fit w-full'
                                >
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
