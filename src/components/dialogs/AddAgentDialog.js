import React from 'react';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';

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
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

//Icons
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { getTerritories, addAgent, clearErrors, getDepartments, getSupervisorsByDepartment } from '../../redux';

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
    agents: state.agentsData.agents,
    territories: state.territoriesData.territories,
    departments: state.departmentsData.departments,
    supervisors: state.supervisorsData.filtered,
    loading: state.agentsData.loading,
})

const mapDispatchToProps = dispatch => ({
    getTerritories: () => dispatch(getTerritories()),
    getDepartments: () => dispatch(getDepartments()),
    getSupervisorsByDepartment: departmentId => dispatch(getSupervisorsByDepartment(departmentId)),
    addAgent: agentInfo => dispatch(addAgent(agentInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddAgentDialog = ({ addAgent, clearErrors, classes, UI, agents, territories, loading, getTerritories, departments, getDepartments, supervisors, getSupervisorsByDepartment }) => {
    
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if(open && territories.length === 0) getTerritories();
        if(open && departments.length === 0) getDepartments();
    }, [open])
    const [agentInfo, setAgentInfo] = React.useState({
        name: '',
        email: '',
        phone_number: '',
        agent_type: 'dynamic',
        territory_id: '',
        gender: '',
        date_of_birth: 'December 07, 1997 00:00 am',
        department_id: '',
        supervisor_id: '',
        remote_worker: 'no',
    });

    //when the agents increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setAgentInfo({
            name: '',
            email: '',
            phone_number: '',
            agent_type: 'dynamic',
            territory_id: '',
            gender: '',
            date_of_birth: 'December 07, 1997 00:00 am',
            department_id: '',
            supervisor_id: '',
            remote_worker: 'no',
        });
        clearErrors();
    }, [agents]);

    //when loading is false, and no errors, request to the backend was successful
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors).length === 0
        ){
            setOpen(false);
            setAgentInfo({
                name: '',
                email: '',
                phone_number: '',
                agent_type: 'dynamic',
                territory_id: '',
                gender: '',
                date_of_birth: 'December 07, 1997 00:00 am',
                department_id: '',
                supervisor_id: '',
                remote_worker: 'no',
            });
            clearErrors();
        }
    });

    React.useEffect(() => {
        if(agentInfo.department_id.trim() !== '') getSupervisorsByDepartment(agentInfo.department_id);
    }, [agentInfo.department_id]);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) {
            clearErrors();
            setOpen(false);
        }
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

    const handleDateChange = date => {
        clearErrors();
        setAgentInfo({
            ...agentInfo,
            date_of_birth: dayjs(date).format('MMMM DD, YYYY hh:mm a'),
        });
    }

    return (
        <>    
        <MuiPickersUtilsProvider utils={DayjsUtils}> 
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
                name="department_id"
                id="selected-department"
                select
                label="department"
                value={agentInfo.department_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.department_id}
                helperText={UI.errors && UI.errors.department_id}
                className={classes.textField}
                fullWidth
                >
                {
                    (departments.length === 0 && loading) ?
                    <Typography variant="body1">please wait...</Typography> :
                    (
                        departments.map(department => (
                            <MenuItem key={department.document_id} value={department.document_id}>
                            {department.name}
                            </MenuItem>
                        ))
                    )
                }
                </TextField>
                <TextField
                name="supervisor_id"
                id="selected-supervisor"
                select
                label="supervisor"
                value={agentInfo.supervisor_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.supervisor_id}
                helperText={UI.errors && UI.errors.supervisor_id}
                className={classes.textField}
                fullWidth
                >
                {
                    (supervisors.length === 0 && loading) ?
                    <Typography variant="body1">please wait...</Typography> :
                    (
                        supervisors.map(supervisor => (
                            <MenuItem key={supervisor.document_id} value={supervisor.document_id}>
                            {supervisor.name}
                            </MenuItem>
                        ))
                    )
                }
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
                {
                    (territories.length === 0 && loading) ?
                    <Typography variant="body1">please wait...</Typography> :
                    (
                        territories.map(territory => (
                            <MenuItem key={territory.document_id} value={territory.document_id}>
                            {territory.name}
                            </MenuItem>
                        ))
                    )
                }
                </TextField>
                <TextField
                name="gender"
                id="selected-type"
                select
                label="Gender"
                value={agentInfo.gender}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.gender}
                helperText={UI.errors && UI.errors.gender}
                className={classes.textField}
                fullWidth
                >
                {['Male', 'Female', 'Other'].map(type => (
                    <MenuItem key={type} value={type}>
                    {type}
                    </MenuItem>
                ))}
                </TextField>
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Enter agent date of birth"
                format="MMMM DD, YYYY"
                value={agentInfo.date_of_birth}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                className={classes.textField}
                fullWidth
                />
                {
                    agentInfo.agent_type === 'dynamic' && 
                    <TextField
                    name="remote_worker"
                    id="selected-type"
                    select
                    label="Will agent be a remote worker?"
                    value={agentInfo.remote_worker}
                    onChange={handleChange}
                    error={UI.errors && !!UI.errors.remote_worker}
                    helperText={UI.errors && UI.errors.remote_worker}
                    className={classes.textField}
                    fullWidth
                    >
                    {['yes', 'no'].map(type => (
                        <MenuItem key={type} value={type}>
                        {type}
                        </MenuItem>
                    ))}
                    </TextField>
                }
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
                disabled={loading}
                >Add {
                    loading && <CircularProgress size={30} className={classes.spinner}/>
                }</Button>
            </DialogActions>
        </Dialog>
        </MuiPickersUtilsProvider>
        </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddAgentDialog)));
