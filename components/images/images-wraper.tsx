import './styles.css';
import React, { useMemo } from 'react';

const ImagesWrapper = ({
    value,
    children,
}: {
    value: (string | undefined)[];
    children?: React.ReactNode;
}) => {
    const previewContainerClass = useMemo(() => {
        const length = value?.length;
        switch (length) {
            case 1:
                return 'preview1 group z-10';
            case 2:
                return 'preview2';
            case 3:
                return 'preview3';
            case 4:
                return 'preview4';
            case 5:
                return 'preview5';
            default:
                return length % 2 === 0 ? 'preview6' : 'preview6 singular_grid';
        }
    }, [value.length]);

    return <div className={previewContainerClass}>{children}</div>;
};

export default ImagesWrapper;
