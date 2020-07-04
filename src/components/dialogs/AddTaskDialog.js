import React from 'react';
import AddActionDialog from './AddActionDialog';

//MUI
import Paper from '@material-ui/core/Paper';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

//Icons
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

//redux
import { connect } from 'react-redux';
import { clearErrors, addTask } from '../../redux';

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
    },
    visibleAction: {
        padding: 10,
        width: '90%',
        height: '10%',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        position: 'relative',
        marginBottom: 5,
    },
    removeAction: {
        position: 'absolute',
        right: 5,
        top: 0,
    },
    expansionSpace: {
        display: 'flex',
        flexDirection: 'column',
    }
});

const mapStateToProps = state => ({
    UI: state.UI,
    tasks: state.data.tasks,
})

const mapDispatchToProps = dispatch => ({
    addTask: taskInfo => dispatch(addTask(taskInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddTaskDialog = ({ addTask, clearErrors, classes, UI, tasks }) => {
    
    const [open, setOpen] = React.useState(false);
    const [taskInfo, setTaskInfo] = React.useState({
        task_name: '',
        description: '',
        actions: [],
    });

    //when the tasks increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setTaskInfo({
            task_name: '',
            description: '',
            actions: [],
        });
        clearErrors();
    }, [tasks]);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        clearErrors();
        setTaskInfo({
            task_name: '',
            description: '',
            actions: [],
        });
        setOpen(false);
    }

    const handleSubmit = () => {
        if(taskInfo.actions.length >= 1) addTask(taskInfo);
    }

    const handleChange = event => {
        clearErrors();
        setTaskInfo({
            ...taskInfo,
            [event.target.name] : event.target.value,
        });
    }

    const submitNewAction = actionInfo => {
        setTaskInfo({
            ...taskInfo,
            actions: [
                ...taskInfo.actions,
                actionInfo,
            ],
        });
    }

    const removeAction = in_index => {
        const actions = taskInfo.actions.filter((action, index) => index !== in_index);
        setTaskInfo({
            ...taskInfo,
            actions,
        })
    }
    return (
        <>    
        <Tooltip title="Add New Task">
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
                Add A New Task
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="task_name"
                type="text"
                value={taskInfo.task_name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={UI.errors && !!UI.errors.task_name}
                helperText={UI.errors && UI.errors.task_name}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="description"
                type="text"
                value={taskInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={UI.errors && !!UI.errors.description}
                helperText={UI.errors && UI.errors.description}
                className={classes.textField}
                fullWidth
                />
                <AddActionDialog submitNewAction={submitNewAction}/>
                <span><strong>Number of Actions added : {taskInfo.actions.length}</strong></span>
                {
                    taskInfo.actions.length > 0 && 
                    <ExpansionPanel
                    >
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <VisibilityIcon color="primary" style={{marginRight: 5}}/>
                            <Typography variant="body1">View Actions</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                        className={classes.expansionSpace}
                        >
                            {taskInfo.actions.map((action, index) => {
                                return (
                                    <Paper
                                    className={classes.visibleAction}
                                    >
                                        {action.action_name}
                                        <Tooltip
                                        title="Remove action"
                                        placement="top"
                                        >
                                            <IconButton
                                            className={classes.removeAction}
                                            onClick={() => removeAction(index)}
                                            >
                                                <DeleteForeverIcon color="secondary"/>
                                            </IconButton>
                                        </Tooltip>
                                    </Paper>
                                )
                            })}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
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
)(withStyles(styles)(React.memo(AddTaskDialog)));
