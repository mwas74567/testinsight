import React from 'react';

//MUI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { addAgent, clearErrors } from '../../redux';

const styles = theme => ({
    textField: {
        margin: '10px auto 10px auto',
    },
    error: {
        color: 'red',
        fontSize: '.8rem',
        marginTop: '5px',
    },
    spinner: {
        position: 'absolute',
    }
});

const mapStateToProps = state => ({
    UI: state.UI,
    agents: state.data.agents,
    territories: state.data.territories,
})

const mapDispatchToProps = dispatch => ({
    addAgent: agentInfo => dispatch(addAgent(agentInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddAgentDialog = ({ addAgent, clearErrors, classes, UI, agents, territories }) => {
    
    const [open, setOpen] = React.useState(false);
    const [agentInfo, setAgentInfo] = React.useState({
        name: '',
        email: '',
        phone_number: '',
        agent_type: 'dynamic',
        territory_id: '',
    });

    //when the agents increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setAgentInfo({
            name: '',
            email: '',
            phone_number: '',
            agent_type: 'dynamic',
        });
        clearErrors();
    }, [agents]);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        clearErrors();
        setOpen(false);
    }

    const handleSubmit = () => {
        addAgent(agentInfo);
    }

    const handleChange = event => {
        clearErrors();
        setAgentInfo({
            ...agentInfo,
            [event.target.name] : event.target.value,
        });
    }

    return (
        <>    
        <Tooltip title="Add New Agent">
            <IconButton onClick={handleOpen}>
                <AddIcon style={{color: '#fff'}}/>
            </IconButton>
        </Tooltip>    
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Add A New Agent
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={agentInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={UI.errors && !!UI.errors.name}
                helperText={UI.errors && UI.errors.name}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="email"
                type="email"
                value={agentInfo.email}
                onChange={handleChange}
                label="Email"
                placeholder="Email"
                error={UI.errors && !!UI.errors.email}
                helperText={UI.errors && UI.errors.email}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="phone_number"
                type="number"
                value={agentInfo.phone_number}
                onChange={handleChange}
                label="Phone"
                placeholder="Phone"
                error={UI.errors && !!UI.errors.phone_number}
                helperText={UI.errors && UI.errors.phone_number}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="agent_type"
                id="selected-type"
                select
                label="Type"
                value={agentInfo.agent_type}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.agent_type}
                helperText={UI.errors && UI.errors.agent_type}
                className={classes.textField}
                fullWidth
                >
                {['static', 'dynamic'].map(type => (
                    <MenuItem key={type} value={type}>
                    {type}
                    </MenuItem>
                ))}
                </TextField>

                <TextField
                name="territory_id"
                id="selected-territory"
                select
                label="Territory"
                value={agentInfo.territory_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.territory_id}
                helperText={UI.errors && UI.errors.territory_id}
                className={classes.textField}
                fullWidth
                >
                {territories.map(territory => (
                    <MenuItem key={territory.document_id} value={territory.document_id}>
                    {territory.name}
                    </MenuItem>
                ))}
                </TextField>
                {
                    UI.errors && UI.errors.error && <Typography 
                    variant="body2"
                    className={classes.error}
                    >{UI.errors.error}</Typography>
                }
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                color="secondary"
                variant="contained"
                onClick={handleClose}
                >CANCEL</Button>
                <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                disabled={UI.loading}
                >Add {
                    UI.loading && <CircularProgress size={30} className={classes.spinner}/>
                }</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddAgentDialog)));
