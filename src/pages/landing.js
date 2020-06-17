import React from 'react';

//MUI
import Grid from '@material-ui/core/Grid';

const Landing = () => {

    React.useEffect(() => {
        document.title = 'Client | Landing';
    }, []);

    return (
        <Grid container
        >
            Landing Page. About us here
        </Grid>
    );
}

export default React.memo(Landing);
