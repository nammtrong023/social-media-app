import React from 'react';

const NotiFollowIcon = () => {
    return (
        <svg
            width={16}
            height={16}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle cx={8} cy={8} r={8} fill='#377DFF' />
            <circle cx={8} cy={8} r={8} fill='white' fillOpacity='0.8' />
            <path
                d='M8 7.85185C9.10457 7.85185 10 6.98959 10 5.92593C10 4.86227 9.10457 4 8 4C6.89543 4 6 4.86227 6 5.92593C6 6.98959 6.89543 7.85185 8 7.85185Z'
                fill='#377DFF'
            />
            <path
                d='M10 9.33331H6C4.89543 9.33331 4 10.1956 4 11.2592C4 11.6683 4.33164 12 4.74074 12H11.2593C11.6684 12 12 11.6683 12 11.2592C12 10.1956 11.1046 9.33331 10 9.33331Z'
                fill='#377DFF'
            />
        </svg>
    );
};

export default NotiFollowIcon;
