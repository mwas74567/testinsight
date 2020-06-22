import React from 'react';
import AgentsSkeleton from '../components/skeletons/AgentsSkeleton';
import AgentsData from '../components/Agents';

//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getAgents } from '../redux';

const mapStateToProps = state => ({
    agents: state.data.agents,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getAgents: () => dispatch(getAgents()),
})

const Agents = ({ getAgents, agents, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Agents';
        if(agents.length === 0) getAgents();
    }, []);

    const component = loading ? <AgentsSkeleton /> : <AgentsData />;

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
)(React.memo(Agents));
