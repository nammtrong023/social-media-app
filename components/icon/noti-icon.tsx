import { useTheme } from 'next-themes';
import React from 'react';

const NotiIcon = () => {
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
                d='M14.4 11.4286H16V12.9524H0V11.4286H1.6V6.09524C1.6 4.47868 2.27428 2.92833 3.47452 1.78525C4.67475 0.642175 6.30261 0 8 0C9.69739 0 11.3253 0.642175 12.5255 1.78525C13.7257 2.92833 14.4 4.47868 14.4 6.09524V11.4286ZM12.8 11.4286V6.09524C12.8 4.88282 12.2943 3.72006 11.3941 2.86275C10.4939 2.00544 9.27304 1.52381 8 1.52381C6.72696 1.52381 5.50606 2.00544 4.60589 2.86275C3.70571 3.72006 3.2 4.88282 3.2 6.09524V11.4286H12.8ZM5.6 14.4762H10.4V16H5.6V14.4762Z'
                fill='white'
            />
            <path
                d='M14.4 11.4286H16V12.9524H0V11.4286H1.6V6.09524C1.6 4.47868 2.27428 2.92833 3.47452 1.78525C4.67475 0.642175 6.30261 0 8 0C9.69739 0 11.3253 0.642175 12.5255 1.78525C13.7257 2.92833 14.4 4.47868 14.4 6.09524V11.4286ZM12.8 11.4286V6.09524C12.8 4.88282 12.2943 3.72006 11.3941 2.86275C10.4939 2.00544 9.27304 1.52381 8 1.52381C6.72696 1.52381 5.50606 2.00544 4.60589 2.86275C3.70571 3.72006 3.2 4.88282 3.2 6.09524V11.4286H12.8ZM5.6 14.4762H10.4V16H5.6V14.4762Z'
                fill={isDark ? '#fff' : '#4E5D78'}
            />
        </svg>
    );
};

export default NotiIcon;
