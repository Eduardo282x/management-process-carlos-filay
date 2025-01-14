import { SnackbarCloseReason, Snackbar, Alert } from '@mui/material';
import { FC } from 'react';
import { BaseResponse } from '../interfaces/base.interface';

interface ISnackbar {
    baseResponse: BaseResponse,
    open: boolean,
    setOpen: (open: boolean) => void
}

export const SnackbarComponent: FC<ISnackbar> = ({ baseResponse, open, setOpen }) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={handleClose}
                    severity={baseResponse.success ? 'success' : 'error'}

                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {baseResponse.message}
                </Alert>
            </Snackbar>
        </>
    );
}
