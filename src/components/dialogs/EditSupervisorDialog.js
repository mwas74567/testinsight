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
import { editSupervisor, } from '../../redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
}

const mapStateToProps = state => ({
    supervisor: state.supervisorsData.supervisor,
    loading: state.UI.loading,
    errors: state.UI.errors,
});

const mapDispatchToProps = dispatch => ({
    editSupervisor: (newInfo, supervisor_id) => dispatch(editSupervisor(newInfo, supervisor_id)),
});

const EditSupervisorDialog = ({ classes, type, infoKey, title, label, supervisor, errors, editSupervisor, loading }) => {

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState('');

    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setEntity(supervisor[infoKey]);
        }   
    }, [open])

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
                            infoKey === "department_type" &&
                            <TextField
                            name="agent_type"
                            id="selected-type"
                            select
                            label="Type"
                            value={entity}
                            onChange={handleChange}
                            error={entity.trim() === ''}
                            helperText={entity.trim() === '' && "Cannot be empty"}
                            className={classes.textField}
                            fullWidth
                            >
                            {['static', 'dynamic',].map(type => (
                                <MenuItem key={type} value={type}>
                                {type}
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
)(withStyles(styles)(React.memo(EditSupervisorDialog)));