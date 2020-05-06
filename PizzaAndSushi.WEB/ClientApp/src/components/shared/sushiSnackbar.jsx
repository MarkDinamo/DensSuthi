import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SuchiSnackBar({message, isOpen }) {
    const [snack, setSnack] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack(false);
    };

    useEffect(() => {
        if (isOpen) {
            setSnack(true);
        }
    }, [isOpen])

    return (
        <>
            <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}