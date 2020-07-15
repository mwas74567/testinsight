import React from 'react';
import AgentProfile from '../components/Agent';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getAgents, setAgent } from '../redux';

const styles = {

}

const mapStateToProps = state => ({
    loading: state.UI.loading, 
    agents: state.agentsData.agents,
});

const mapDispatchToProps = dispatch => ({
    getAgents: () => dispatch(getAgents()),
    setAgent: agent => dispatch(setAgent(agent)),
});

const Agent = ({ classes, loading, match, agents, getAgents, setAgent }) => {

    const findAgent = () => {
        if(agents.length === 0) return {};
        let targetAgent;
        agents.forEach((agent, agentIndex) => {
            if(agent.document_id === match.params.agentId) targetAgent = agent;
        });

        return targetAgent;
    }

    React.useEffect(() => {
        document.title = 'Client | Agent';
        if(agents.length === 0) getAgents();
        setAgent(findAgent());
    }, [agents]);

    const component = <AgentProfile />;
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                {component}
                </Grid>
            </Grid>
        </>
    )
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Agent)));
