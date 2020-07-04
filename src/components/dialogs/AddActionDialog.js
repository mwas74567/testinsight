import React from 'react';

//MUI
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
    visibleChoice: {
        padding: 10,
        width: '90%',
        height: '10%',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        position: 'relative',
        marginBottom: 5,
    },
    removeChoice: {
        position: 'absolute',
        right: 5,
        top: 0,
    },
    expansionSpace: {
        display: 'flex',
        flexDirection: 'column',
    }
});

const AddActionDialog = ({ submitNewAction, classes }) => {
    
    const [open, setOpen] = React.useState(false);
    const [actionInfo, setActionInfo] = React.useState({
        action_name: '',
        action_type: '',
        answer_choices: [],
    });
    const [answerChoice, setAnswerChoice] = React.useState("");

    const actionTypes = [
        {
            label: "Open Single",
            type: "open_single",
        },
        {
            label: "Open Multiple",
            type: "open_multiple",
        },
        {
            label: "Single Selection",
            type: "single_selection",
        },
        {
            label: "Multiple Selection",
            type: "multiple_selection",
        },
        {
            label: "Pictures",
            type: "pictures",
        }
    ]

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setActionInfo({
            action_name: '',
            action_type: '',
            answer_choices: [],
        })
        setOpen(false);
    }

    const handleSubmit = () => {
        if(
            actionInfo.action_name.trim() !== "" &&
            actionInfo.action_type.trim() !== ""
        ){
            if((actionInfo.action_type === "single_selection" || actionInfo.action_type === "multiple_selection")
                && actionInfo.answer_choices.length > 0){
                submitNewAction(actionInfo);
                handleClose();
            }else{
                submitNewAction(actionInfo);
                handleClose();
            }
        }
    }

    const handleChange = event => {
        
        setActionInfo({
            ...actionInfo,
            [event.target.name] : event.target.value,
        });
    }

    const handleChangeAnswerChoice = event => {
        setAnswerChoice(event.target.value);
    }

    const addAnswerChoice = () => {
        if(answerChoice.trim() !== ""){
            setActionInfo({
                ...actionInfo,
                answer_choices: [...actionInfo.answer_choices, answerChoice],
            });
            setAnswerChoice("");
        }
    }

    const removeChoice = (in_index) => {
        const answer_choices = actionInfo.answer_choices.filter((choice, index) => index !== in_index);
        setActionInfo({
            ...actionInfo,
            answer_choices,
        });
    }
    return (
        <>    
        <Tooltip title="Attach action to task" placement="top">
            <IconButton onClick={handleOpen}>
                <AddIcon color="primary"/>
            </IconButton>
        </Tooltip>    
        <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Add Action
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="action_name"
                type="text"
                value={actionInfo.action_name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={actionInfo.action_name.trim() === ''}
                helperText={actionInfo.action_name.trim() === '' && "Cannot be empty"}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="action_type"
                id="selected-type"
                select
                label="Action Type"
                value={actionInfo.action_type}
                onChange={handleChange}
                error={actionInfo.action_type.trim() === ""}
                helperText={actionInfo.action_type.trim() === "" && "Cannot be empty"}
                className={classes.textField}
                fullWidth
                >
                {actionTypes.map(action_type => (
                    <MenuItem key={action_type.label} value={action_type.type}>
                    {action_type.label}
                    </MenuItem>
                ))}
                </TextField>
                {
                    (actionInfo.action_type === "single_selection" || actionInfo.action_type === "multiple_selection") &&
                    <>
                    <TextField
                    name="answer_choice"
                    type="text"
                    value={answerChoice}
                    onChange={handleChangeAnswerChoice}
                    label="Answer Choice"
                    placeholder="Name"
                    error={answerChoice.trim() === ""}
                    helperText={answerChoice.trim() === '' && "Cannot be empty"}
                    className={classes.textField}
                    fullWidth
                    >
                    </TextField>
                    <Tooltip
                    placement="top"
                    title="submit this answer choice"
                    >
                        <IconButton
                        onClick={addAnswerChoice}
                        >
                            <AddIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                    <span><strong>{actionInfo.answer_choices.length} answer choices added</strong></span>
                    {
                    actionInfo.answer_choices.length > 0 && 
                    <ExpansionPanel
                    >
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <VisibilityIcon color="primary" style={{marginRight: 5}}/>
                            <Typography variant="body1">View Answer Choices</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                        className={classes.expansionSpace}
                        >
                            {actionInfo.answer_choices.map((choice, index) => {
                                return (
                                    <Paper
                                    className={classes.visibleChoice}
                                    >
                                        {choice}
                                        <Tooltip
                                        title="Remove Chice"
                                        placement="top"
                                        >
                                            <IconButton
                                            className={classes.removeChoice}
                                            onClick={() => removeChoice(index)}
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
                    </>
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
                >Submit</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default withStyles(styles)(React.memo(AddActionDialog));
