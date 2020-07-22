import React from 'react';
import DepartmentDetails from '../components/DepartmentDetails';

//MUI
import Grid from '@material-ui/core/Grid';


const Department = () => {
  
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                <DepartmentDetails />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Department);