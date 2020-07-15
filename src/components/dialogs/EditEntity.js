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

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import { editInfo } from '../../redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
}

const mapStateToProps = state => ({
    credentials: state.user.credentials,
    errors: state.UI.errors,
});

const mapDispatchToProps = dispatch => ({
    editInfo: newInfo => dispatch(editInfo(newInfo)),
});

const EditEntity = ({ classes, type, infoKey, title, label, credentials, errors, editInfo }) => {

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState('');

    const incomingEntity = `${credentials[infoKey]}`;

    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setEntity(incomingEntity);
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
        if(entity === incomingEntity || entity.trim() === ''){
            handleClose();
            return;
        }
        if(entity.trim() !== ''){
            const newInfo = {
                [infoKey] : entity,
            }
            editInfo(newInfo);
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
                        <TextField
                        name={infoKey}
                        type={type}
                        value={entity}
                        onChange={handleChange}
                        label={label}
                        placeholder={label}
                        error={entity.trim() === ''}
                        helperText={entity.trim() === '' && "Cannot be empty"}
                        className={classes.textField}
                        fullWidth
                        />
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
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(EditEntity)));