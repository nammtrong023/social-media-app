'use client';

import axios from 'axios';
import { Tokens, UserType } from '@/types';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import React, { createContext, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

type ContextDataType = {
    currentUser: UserType | undefined;
    authToken: Tokens | undefined;
    isFetching: boolean | null;
    setAuthToken: (authToken: Tokens) => void;
    setCurrentUser: (currentUser: UserType | undefined) => void;
    logout: () => void;
};

const accessToken = getCookie('access_token')?.valueOf() || '';
const refreshToken = getCookie('refresh_token')?.valueOf() || '';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;

const AuthContext = createContext<ContextDataType>({
    currentUser: undefined,
    authToken: {
        accessToken,
        refreshToken,
    },
    isFetching: null,
    setAuthToken: () => {},
    setCurrentUser: () => {},
    logout: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserType>();
    const [authToken, setAuthToken] = useState<Tokens | undefined>({
        accessToken,
        refreshToken,
    });

    let isExpired = true;
    const user: any = authToken?.accessToken && jwt.decode(authToken.accessToken);

    if (user && typeof user !== 'string' && user.exp !== undefined) {
        isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    }

    const getCurrentUser = async () => {
        const response = await axios.get(`${baseUrl}/current-user`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken?.accessToken}`,
            },
        });

        return response.data as UserType;
    };

    const { data, isSuccess, isFetching } = useQuery({
        initialData: currentUser,
        queryKey: ['get-current-user'],
        queryFn: () => getCurrentUser(),
        enabled: !!authToken?.accessToken && !isExpired,
    });

    useEffect(() => {
        if (authToken?.accessToken && isSuccess) {
            try {
                setCurrentUser(data);
            } catch (error) {
                console.error('Error verifying token at auth:', error);
            }
        }
    }, [authToken?.accessToken, data, isSuccess]);

    const logout = () => {
        setCurrentUser(undefined);
        setAuthToken(undefined);
        setCookie('refresh_token', '');
        setCookie('access_token', '');
        router.push('/sign-in');
    };

    const contextData = {
        authToken,
        currentUser,
        isFetching,
        setAuthToken,
        logout,
        setCurrentUser,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
