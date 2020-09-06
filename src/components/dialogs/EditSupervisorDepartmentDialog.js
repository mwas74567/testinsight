import React from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import { editSupervisor, getDepartments } from '../../redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
}

const mapStateToProps = state => ({
    departments: state.departmentsData.departments,
    supervisor: state.supervisorsData.supervisor,
    loading: state.UI.loading,
    errors: state.UI.errors,
});

const mapDispatchToProps = dispatch => ({
    getDepartments: () => dispatch(getDepartments()),
    editSupervisor: (newInfo, supervisor_id) => dispatch(editSupervisor(newInfo, supervisor_id)),
});

const EditSupervisorDepartmentDialog = ({ classes, type, infoKey, title, label, supervisor, errors, editSupervisor, loading, departments, getDepartments }) => {

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState('');
    const [department_name, setDepartmentName] = React.useState('');

    React.useEffect(() => {
        if(open && departments.length === 0) getDepartments();
    }, [open]);

    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setEntity(supervisor[infoKey]);
        }   
    }, [open]);

    React.useEffect(() => {
        departments.forEach(department => {
            if(department.document_id === entity) setDepartmentName(department.name);
        });
    }, [entity]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setEntity(event.target.value);
    }

    const handleSubmit = () => {
        if(entity === supervisor[infoKey] || entity.trim() === ''){
            handleClose();
            return;
        }
        if(entity.trim() !== ''){
            const newInfo = {
                [infoKey] : entity,
                department_name,
            }
            editSupervisor(newInfo, supervisor.document_id);
        }
    }

    return (
        <>
             <Tooltip
            title={title}
            placement="top"
            onClick={handleOpen}
            >
                <IconButton
                ><EditIcon color="primary"/></IconButton>
            </Tooltip>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle
                >{title}</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        {
                            infoKey === "department_id" &&
                            <TextField
                            name={infoKey}
                            id="selected-department"
                            select
                            label="Department"
                            value={entity}
                            onChange={handleChange}
                            error={entity.trim() === ''}
                            helperText={entity.trim() === '' && "Cannot be empty"}
                            className={classes.textField}
                            fullWidth
                            >
                            {departments.map(department => (
                                <MenuItem key={department.document_id} value={department.document_id}>
                                {department.name}
                                </MenuItem>
                            ))}
                            </TextField>
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    >Cancel</Button>
                    <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(EditSupervisorDepartmentDialog)));