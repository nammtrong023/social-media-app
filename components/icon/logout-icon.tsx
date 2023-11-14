import { useTheme } from 'next-themes';
import React from 'react';

const LogoutIcon = () => {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    
    return (
        <svg
            width={16}
            height={16}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.4 1.6C2.18783 1.6 1.98434 1.68429 1.83431 1.83431C1.68429 1.98434 1.6 2.18783 1.6 2.4V13.6C1.6 13.8122 1.68429 14.0157 1.83431 14.1657C1.98434 14.3157 2.18783 14.4 2.4 14.4H5.6C6.04183 14.4 6.4 14.7582 6.4 15.2C6.4 15.6418 6.04183 16 5.6 16H2.4C1.76348 16 1.15303 15.7471 0.702944 15.2971C0.252856 14.847 0 14.2365 0 13.6V2.4C0 1.76348 0.252856 1.15303 0.702944 0.702944C1.15303 0.252856 1.76348 0 2.4 0H5.6C6.04183 0 6.4 0.358172 6.4 0.8C6.4 1.24183 6.04183 1.6 5.6 1.6H2.4Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.4 1.6C2.18783 1.6 1.98434 1.68429 1.83431 1.83431C1.68429 1.98434 1.6 2.18783 1.6 2.4V13.6C1.6 13.8122 1.68429 14.0157 1.83431 14.1657C1.98434 14.3157 2.18783 14.4 2.4 14.4H5.6C6.04183 14.4 6.4 14.7582 6.4 15.2C6.4 15.6418 6.04183 16 5.6 16H2.4C1.76348 16 1.15303 15.7471 0.702944 15.2971C0.252856 14.847 0 14.2365 0 13.6V2.4C0 1.76348 0.252856 1.15303 0.702944 0.702944C1.15303 0.252856 1.76348 0 2.4 0H5.6C6.04183 0 6.4 0.358172 6.4 0.8C6.4 1.24183 6.04183 1.6 5.6 1.6H2.4Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.6347 3.43427C10.9471 3.12185 11.4537 3.12185 11.7661 3.43427L15.7661 7.43427C16.0785 7.74669 16.0785 8.25322 15.7661 8.56564L11.7661 12.5656C11.4537 12.8781 10.9471 12.8781 10.6347 12.5656C10.3223 12.2532 10.3223 11.7467 10.6347 11.4343L14.069 7.99995L10.6347 4.56564C10.3223 4.25322 10.3223 3.74669 10.6347 3.43427Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.6347 3.43427C10.9471 3.12185 11.4537 3.12185 11.7661 3.43427L15.7661 7.43427C16.0785 7.74669 16.0785 8.25322 15.7661 8.56564L11.7661 12.5656C11.4537 12.8781 10.9471 12.8781 10.6347 12.5656C10.3223 12.2532 10.3223 11.7467 10.6347 11.4343L14.069 7.99995L10.6347 4.56564C10.3223 4.25322 10.3223 3.74669 10.6347 3.43427Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.80078 7.99995C4.80078 7.55812 5.15895 7.19995 5.60078 7.19995H15.2008C15.6426 7.19995 16.0008 7.55812 16.0008 7.99995C16.0008 8.44178 15.6426 8.79995 15.2008 8.79995H5.60078C5.15895 8.79995 4.80078 8.44178 4.80078 7.99995Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.80078 7.99995C4.80078 7.55812 5.15895 7.19995 5.60078 7.19995H15.2008C15.6426 7.19995 16.0008 7.55812 16.0008 7.99995C16.0008 8.44178 15.6426 8.79995 15.2008 8.79995H5.60078C5.15895 8.79995 4.80078 8.44178 4.80078 7.99995Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
        </svg>
    );
};

export default LogoutIcon;