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
import EditIcon from '@material-ui/icons/Edit';

//redux
import { connect } from 'react-redux';
import { editDepartment } from '../../redux';

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
    loading: state.departmentsData.loading
})

const mapDispatchToProps = dispatch => ({
    editDepartment: (newInfo, id) => dispatch( editDepartment(newInfo, id)),
});

const EditDepartmentDialog = ({  editDepartment, classes, UI, oldInfo, id, loading }) => {
    
    const [open, setOpen] = React.useState(false);
    const [departmentInfo, setDepartmentInfo] = React.useState(() => oldInfo);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) setOpen(false);
    }

    const handleSubmit = () => {
        if(
            departmentInfo.name.trim() !== '' &&
            departmentInfo.description.trim() !== '' &&
            !(departmentInfo.name === oldInfo.name && departmentInfo.description === oldInfo.description)
        ){
            editDepartment(departmentInfo, id);
        }
        if(departmentInfo.name === oldInfo.name && departmentInfo.description === oldInfo.description) handleClose();
    }

    const handleChange = event => {
        setDepartmentInfo({
            ...departmentInfo,
            [event.target.name] : event.target.value,
        })
    }
    return (
        <>    
        {/* <Tooltip title="Edit Department" placement="top">
            <IconButton onClick={handleOpen}>
                <EditIcon color="primary"/>
            </IconButton>
        </Tooltip>  */}
        <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        >Edit</Button>   
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Edit Department
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                {/* <TextField
                name="name"
                type="text"
                value={departmentInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={departmentInfo.name.trim() === ''}
                helperText={departmentInfo.name.trim() === '' && "Must not be empty"}
                className={classes.textField}
                fullWidth
                /> */}
                <TextField
                name="description"
                type="text"
                value={departmentInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={departmentInfo.description.trim() === ''}
                helperText={departmentInfo.description.trim() === '' && "Must not be empty"}
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
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                >Change {
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
)(withStyles(styles)(React.memo(EditDepartmentDialog)));