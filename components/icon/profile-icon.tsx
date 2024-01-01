import { useTheme } from 'next-themes';
import React from 'react';

const ProfileIcon = () => {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={16}
            height={16}
            viewBox='0 0 16 16'
            fill='none'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.30175 11.9684C2.13524 11.1349 3.2657 10.6666 4.44444 10.6666H11.5556C12.7343 10.6666 13.8648 11.1349 14.6983 11.9684C15.5317 12.8019 16 13.9323 16 15.1111C16 15.602 15.602 16 15.1111 16C14.6202 16 14.2222 15.602 14.2222 15.1111C14.2222 14.4038 13.9413 13.7256 13.4412 13.2255C12.9411 12.7254 12.2628 12.4444 11.5556 12.4444H4.44444C3.7372 12.4444 3.05892 12.7254 2.55883 13.2255C2.05873 13.7256 1.77778 14.4038 1.77778 15.1111C1.77778 15.602 1.37981 16 0.888889 16C0.397969 16 0 15.602 0 15.1111C0 13.9323 0.468253 12.8019 1.30175 11.9684Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.30175 11.9684C2.13524 11.1349 3.2657 10.6666 4.44444 10.6666H11.5556C12.7343 10.6666 13.8648 11.1349 14.6983 11.9684C15.5317 12.8019 16 13.9323 16 15.1111C16 15.602 15.602 16 15.1111 16C14.6202 16 14.2222 15.602 14.2222 15.1111C14.2222 14.4038 13.9413 13.7256 13.4412 13.2255C12.9411 12.7254 12.2628 12.4444 11.5556 12.4444H4.44444C3.7372 12.4444 3.05892 12.7254 2.55883 13.2255C2.05873 13.7256 1.77778 14.4038 1.77778 15.1111C1.77778 15.602 1.37981 16 0.888889 16C0.397969 16 0 15.602 0 15.1111C0 13.9323 0.468253 12.8019 1.30175 11.9684Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.99913 1.77778C6.52637 1.77778 5.33247 2.97169 5.33247 4.44444C5.33247 5.9172 6.52637 7.11111 7.99913 7.11111C9.47189 7.11111 10.6658 5.9172 10.6658 4.44444C10.6658 2.97169 9.47189 1.77778 7.99913 1.77778ZM3.55469 4.44444C3.55469 1.98985 5.54453 0 7.99913 0C10.4537 0 12.4436 1.98985 12.4436 4.44444C12.4436 6.89904 10.4537 8.88889 7.99913 8.88889C5.54453 8.88889 3.55469 6.89904 3.55469 4.44444Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.99913 1.77778C6.52637 1.77778 5.33247 2.97169 5.33247 4.44444C5.33247 5.9172 6.52637 7.11111 7.99913 7.11111C9.47189 7.11111 10.6658 5.9172 10.6658 4.44444C10.6658 2.97169 9.47189 1.77778 7.99913 1.77778ZM3.55469 4.44444C3.55469 1.98985 5.54453 0 7.99913 0C10.4537 0 12.4436 1.98985 12.4436 4.44444C12.4436 6.89904 10.4537 8.88889 7.99913 8.88889C5.54453 8.88889 3.55469 6.89904 3.55469 4.44444Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
        </svg>
    );
};

export default ProfileIcon;
