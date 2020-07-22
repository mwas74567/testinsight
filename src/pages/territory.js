import React from 'react';
import TerritoryDetails from '../components/TerritoryDetails';

//MUI
import Grid from '@material-ui/core/Grid';



const Territory = () => {

    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <TerritoryDetails />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Territory);