'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tokens } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

type dataType = {
    otp: string;
    email: string;
};

const OTPPage = () => {
    const router = useRouter();
    const { emailSignUp, authToken, setEmailSignUp, handleCookies } = useAuth();

    const [otp, setOtp] = useState('');
    const [isTimeout, setIsTimeout] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const { data, mutate, isPending, status } = useMutation({
        mutationFn: async (data: dataType) => {
            const response = await axios.post(`${baseUrl}/verify-otp`, data);
            return response.data as Tokens;
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const onSubmit = () => {
        mutate({ email: emailSignUp, otp });
    };

    useEffect(() => {
        if (status === 'success' && data) {
            handleCookies(data);
        }

        if (status === 'success' && authToken?.accessToken) {
            setEmailSignUp('');
            router.refresh();
            router.push('/');
        }
    }, [
        data,
        router,
        status,
        authToken?.accessToken,
        handleCookies,
        setEmailSignUp,
    ]);

    useEffect(() => {
        let otpTimeout: NodeJS.Timeout;

        if (isTimeout) {
            otpTimeout = setTimeout(() => {
                setRemainingTime((prevTime) =>
                    prevTime > 0 ? prevTime - 1 : 0,
                );
            }, 1000);
        }

        if (remainingTime === 0) {
            setIsTimeout(false);
        }

        return () => clearTimeout(otpTimeout);
    }, [isTimeout, remainingTime]);

    if (!emailSignUp && status !== 'success') {
        return redirect('/sign-in');
    }

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleResend = async () => {
        setIsTimeout(true);
        setRemainingTime(120);

        try {
            await axios.post(`${baseUrl}/resend-otp`, { email: emailSignUp });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                <h1 className=' font-bold text-lg lg:text-3xl'>
                    Xác thực email
                </h1>
                <p className='font-medium text-sm lg:text-base text-center'>
                    Vui lòng kiểm tra email của bạn.
                </p>
            </div>
            <div className='bg-white dark:bg-[#212833] rounded-[20px] p-6 lg:p-10 flex flex-col gap-y-5 lg:gap-y-[30px] w-full'>
                <div className='w-full space-y-5'>
                    <OTPInput
                        containerStyle={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                        inputStyle={{
                            width: 60,
                            height: 60,
                            borderRadius: 10,
                            fontSize: 18,
                        }}
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType='number'
                        renderInput={(props) => (
                            <Input disabled={isPending} {...props} />
                        )}
                    />

                    <div className='w-full flex items-center justify-center'>
                        <Button
                            disabled={!otp || isPending}
                            variant='blue'
                            type='button'
                            onClick={onSubmit}
                            className='h-12 rounded-md lg:rounded-[10px] w-[50%] select-none'
                        >
                            {isPending && (
                                <Loader2 className='w-4 h-4 animate-spin' />
                            )}
                            Tiếp tục
                        </Button>
                    </div>

                    <div className='flex items-center justify-center text-sm md:text-base font-medium text-[#377DFF]'>
                        {!isTimeout ? (
                            <span
                                onClick={handleResend}
                                className='cursor-pointer'
                            >
                                Gửi lại mã
                            </span>
                        ) : (
                            <span>
                                Gửi lại mã sau {formatTime(remainingTime)}
                            </span>
                        )}
                    </div>
                </div>
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

export default OTPPage;
