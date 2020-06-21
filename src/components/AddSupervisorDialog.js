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
import { addSupervisor, clearErrors } from '../redux';

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
    supervisors: state.data.supervisors,
    departments: state.data.departments,
})

const mapDispatchToProps = dispatch => ({
    addSupervisor: supervisorInfo => dispatch(addSupervisor(supervisorInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddSupervisorDialog = ({ addSupervisor, clearErrors, classes, UI, supervisors, departments }) => {
    
    const [open, setOpen] = React.useState(false);
    const [supervisorInfo, setSupervisorInfo] = React.useState({
        name: '',
        email: '',
        phone_number: '',
        department_id: '',
    });

    //when the supervisors increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setSupervisorInfo({
            name: '',
            email: '',
            phone_number: '',
            department_id: departments.length > 0 ? departments[0].document_id : '',
        });
        clearErrors();
    }, [supervisors]);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        clearErrors();
        setOpen(false);
    }

    const handleSubmit = () => {
        addSupervisor(supervisorInfo);
    }

    const handleChange = event => {
        clearErrors();
        setSupervisorInfo({
            ...supervisorInfo,
            [event.target.name] : event.target.value,
        })
    }

    return (
        <>    
        <Tooltip title="Add New Supervisor">
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
                Add A New Supervisor
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={supervisorInfo.name}
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
                value={supervisorInfo.email}
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
                value={supervisorInfo.phone_number}
                onChange={handleChange}
                label="Phone"
                placeholder="Phone"
                error={UI.errors && !!UI.errors.phone_number}
                helperText={UI.errors && UI.errors.phone_number}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="department_id"
                id="selected-department"
                select
                label="Department"
                value={supervisorInfo.department_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.department_id}
                helperText={UI.errors && UI.errors.department_id}
                className={classes.textField}
                fullWidth
                >
                {departments.map(department => (
                    <MenuItem key={department.document_id} value={department.document_id}>
                    {department.name}
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
)(withStyles(styles)(React.memo(AddSupervisorDialog)));
