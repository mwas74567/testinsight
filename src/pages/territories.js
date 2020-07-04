import React from 'react';
import TerritorySkeleton from '../components/skeletons/TerritoriesSkeleton';
import TerritoriesData from '../components/Territories';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getTerritories } from '../redux';


const mapStateToProps = state => ({
    territories: state.data.territories,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getTerritories: () => dispatch(getTerritories()),
})

const Territories = ({ getTerritories, territories, loading }) => {

    React.useEffect(() => {
        document.title = 'Supervisor | Territories';
        if(territories.length === 0) getTerritories();
    }, []);

    const component = loading ? <TerritorySkeleton/> : <TerritoriesData/>;

    return (
        <Grid container
        >
            <Grid item sm={12}>
                {component}
            </Grid>
        </Grid>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(React.memo(Territories));
