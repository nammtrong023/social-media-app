'use client';

import dayjs from 'dayjs';
import React from 'react';
import { FormControl } from '@/components/ui/form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateField, DateValidationError } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SxProps, Theme } from '@mui/material';

interface DateFieldFormProps {
    field: {
        value: Date | null;
    };
    disabled: boolean;
    error: DateValidationError | null;
    onChange: (selectedDate: Date | null) => void;
    onError: (error: DateValidationError) => void;
    sx?: SxProps<Theme> | undefined;
}

const minDate = dayjs('1973-01-01T00:00:00.000').toDate();
const maxDate = new Date();

export const DateFieldForm: React.FC<DateFieldFormProps> = ({
    field,
    disabled,
    error,
    sx,
    onChange,
    onError,
}) => {
    // const useStyles = makeStyles(() => ({
    //     btn: {
    //         fontFamily: 'Manrope',
    //         borderColor: '#15e577',
    //         color: '#000',
    //         backgroundColor: 'white',
    //         '&:hover': {
    //             backgroundColor: '#15e577',
    //         },
    //     },
    // }));

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate': {
                return 'Tối đa là thời điểm hiện tại';
            }
            case 'minDate': {
                return 'Năm tối thiểu là 1973';
            }
            case 'invalidDate': {
                return 'Vui lòng thời gian hợp lệ';
            }
            default: {
                return '';
            }
        }
    }, [error]);

    return (
        <FormControl className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px]'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateField
                    sx={sx}
                    slotProps={{
                        textField: {
                            helperText: errorMessage,
                            FormHelperTextProps: {
                                sx: {
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    color: '#FF5630',
                                },
                            },
                        },
                    }}
                    onError={onError}
                    disabled={disabled}
                    format='dd-MM-yyyy'
                    minDate={minDate}
                    maxDate={maxDate}
                    value={field.value}
                    onChange={onChange}
                />
            </LocalizationProvider>
        </FormControl>
    );
};
