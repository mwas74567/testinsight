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

//Icons
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { clearErrors, addDepartment } from '../../redux';

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
    departments: state.data.departments,
    loading: state.data.loading,
})

const mapDispatchToProps = dispatch => ({
    addDepartment: departmentInfo => dispatch(addDepartment(departmentInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddDepartmentDialog = ({ addDepartment, clearErrors, classes, UI, departments, loading }) => {
    
    const [open, setOpen] = React.useState(false);
    const [departmentInfo, setDepartmentInfo] = React.useState({
        name: '',
        description: '',
    });

    //when the departments increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setDepartmentInfo({
            name: '',
            description: '',
        });
        clearErrors();
    }, [departments]);

    //if data stopped loading, without errors, it means a request to the backend was successful
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors).length === 0
        ){
            setOpen(false);
            setDepartmentInfo({
                name: '',
                description: '',
            });
            clearErrors();
        }
    }, [loading]);

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
        addDepartment(departmentInfo);
    }

    const handleChange = event => {
        clearErrors();
        setDepartmentInfo({
            ...departmentInfo,
            [event.target.name] : event.target.value,
        })
    }
    return (
        <>    
        <Tooltip title="Add New Department">
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
                Add A New Department
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={departmentInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={UI.errors && !!UI.errors.name}
                helperText={UI.errors && UI.errors.name}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="description"
                type="text"
                value={departmentInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={UI.errors && !!UI.errors.description}
                helperText={UI.errors && UI.errors.description}
                className={classes.textField}
                fullWidth
                />
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
        </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddDepartmentDialog)));
