import React from 'react';
import CustomerDetails from '../components/CustomerDetails';

//MUI
import Grid from '@material-ui/core/Grid';

const Customer = () => {
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <CustomerDetails />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Customer);