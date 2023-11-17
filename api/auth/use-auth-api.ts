import { VerifyEmailForm } from '@/app/(auth)/confirm/page';
import { LoginFormType } from '@/app/(auth)/sign-in/page';
import { useAuth } from '@/components/providers/auth-provider';
import { Tokens } from '@/types';
import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

export const useAuthApi = () => {
    const { handleCookies } = useAuth();

    const resetPassword = async (value: VerifyEmailForm) => {
        await axios.post(`${baseUrl}/reset-password`, value);
    };

    const login = async (values: LoginFormType) => {
        const response = await axios.post(`${baseUrl}/login`, values);
        handleCookies(response.data);
        return response.data as Tokens;
    };

    return { resetPassword, login };
};
