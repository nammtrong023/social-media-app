const GenderIcon = ({ color }: { color?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
        >
            <path
                d='M5.77778 16C8.96356 16 11.5556 13.408 11.5556 10.2222C11.5552 8.99764 11.163 7.80529 10.4364 6.81956L14.4062 2.85067L16 4.44444V0H11.5556L13.1493 1.59378L9.17955 5.56267C8.19392 4.83663 7.00195 4.44481 5.77778 4.44444C2.592 4.44444 0 7.03644 0 10.2222C0 13.408 2.592 16 5.77778 16ZM5.77778 6.22222C7.98311 6.22222 9.77778 8.01689 9.77778 10.2222C9.77778 12.4276 7.98311 14.2222 5.77778 14.2222C3.57244 14.2222 1.77778 12.4276 1.77778 10.2222C1.77778 8.01689 3.57244 6.22222 5.77778 6.22222Z'
                fill='white'
            />
            <path
                d='M5.77778 16C8.96356 16 11.5556 13.408 11.5556 10.2222C11.5552 8.99764 11.163 7.80529 10.4364 6.81956L14.4062 2.85067L16 4.44444V0H11.5556L13.1493 1.59378L9.17955 5.56267C8.19392 4.83663 7.00195 4.44481 5.77778 4.44444C2.592 4.44444 0 7.03644 0 10.2222C0 13.408 2.592 16 5.77778 16ZM5.77778 6.22222C7.98311 6.22222 9.77778 8.01689 9.77778 10.2222C9.77778 12.4276 7.98311 14.2222 5.77778 14.2222C3.57244 14.2222 1.77778 12.4276 1.77778 10.2222C1.77778 8.01689 3.57244 6.22222 5.77778 6.22222Z'
                fill={color}
            />
        </svg>
    );
};

export default GenderIcon;
