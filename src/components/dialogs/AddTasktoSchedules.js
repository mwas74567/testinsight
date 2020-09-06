import React from 'react'


//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

// redux
import { addTask,clearErrors} from '../../redux';
import { connect } from 'react-redux';






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
   
    trigger: {
        margin: 10,
    },
});


const mapStateToProps = state => ({   
    UI: state.UI,
    tasks: state.tasksData.tasks,
    schedule:state.schedulesData.schedule,
    loading: state.tasksData.loading,
})
const mapDispatchToProps = dispatch => ({
    addTask: taskInfo => dispatch(addTask(taskInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddTasktoSchedules= ({dialogTitle,buttonTitle, buttonColor, UI, addTask, clearErrors, classes, tasks, loading,schedule }) => {

    
    const [open, setOpen] = React.useState(false);
    const [taskInfo, setTaskInfo] = React.useState({
        task_name: '',
        description: '',
        // schedule_id:schedule.document_id,
        
    });

    //when the tasks increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setTaskInfo({
            task_name: '',
            description: '',
            schedule_id: '',

      
        });
        clearErrors();
    }, [tasks]);
    const [errors, setErrors] = React.useState({
        task_name: false,
        description:false,
        
    });

    //data not loading effect 
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors).length === 0
        ){
            setOpen(false);
            setTaskInfo({
                task_name: '',
                description: '',
                schedule_id:'',
            });
            clearErrors();
        }
       
    }
    
    )
   

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) {
            clearErrors();
            setTaskInfo({
                task_name: '',
                description: '',
                schedule_id:'',
            });
            setOpen(false);
        }
    }

    const handleSubmit = () => {
        if(taskInfo.task_name.trim() === "" )setErrors({...errors,task_name:true})
        if(taskInfo.description.trim() === "" )setErrors({...errors,description:true})
        else{
            clearErrors();
        }
        addTask(taskInfo);
        setOpen(false);
    }

    const handleChange = event => {
        clearErrors();
        setErrors({
            task_name: false,
            description:false,
            schedule_id:'',
            
            
        });
        setTaskInfo({
            ...taskInfo,
            [event.target.name] : event.target.value,
            schedule_id:schedule.document_id,

        });
    }

    // const submitNewAction = actionInfo => {
    //     setTaskInfo({
    //         ...taskInfo,
    //         actions: [
    //             ...taskInfo.actions,
    //             actionInfo,
    //         ],
    //     });
    // }

    // const removeAction = in_index => {
    //     const actions = taskInfo.actions.filter((action, index) => index !== in_index);
    //     setTaskInfo({
    //         ...taskInfo,
    //         actions,
    //     })
    // }
    return (
       <>
          <Button
        variant="contained"
        color={buttonColor}
        onClick={handleOpen}
        className={classes.trigger}
    >{buttonTitle}</Button>
    
        <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
             {dialogTitle}
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                  
                <TextField
                name="name"
                type="text"
                value={taskInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                // error={UI.errors && !!UI.errors.name}
                // helperText={UI.errors && UI.errors.name}
                // className={classes.textField}
                fullWidth
                />
                <TextField
                name="description"
                type="text"
                value={taskInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                // error={UI.errors && !!UI.errors.email}
                // helperText={UI.errors && UI.errors.email}
                className={classes.textField}
                fullWidth
                />
                  
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
                onClick={handleSubmit}
                variant="contained"
                >SUBMIT TASK</Button>
            </DialogActions>
        </Dialog>

       </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddTasktoSchedules)));


