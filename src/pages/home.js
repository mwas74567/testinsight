import React from 'react';

//MUI
import Grid from '@material-ui/core/Grid';

const Home = () => {

    React.useEffect(() => {
        document.title = 'Supervisor | Home';
    }, []);

    return (
        <Grid container
        >
            Home Page. Analytics?
        </Grid>
    );
}

export default React.memo(Home);
