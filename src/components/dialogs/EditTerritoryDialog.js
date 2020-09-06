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
import { editTerritory } from '../../redux';

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
    loading: state.territoriesData .loading
})

const mapDispatchToProps = dispatch => ({
    editTerritory: (newInfo, id) => dispatch(editTerritory(newInfo, id)),
});

const EditTerritoryDialog = ({ editTerritory, classes, UI, oldInfo, id, loading }) => {
    
    const [open, setOpen] = React.useState(false);
    const [territoryInfo, setTerritoryInfo] = React.useState(() => oldInfo);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) setOpen(false);
    }

    const handleSubmit = () => {
        if(
            territoryInfo.name.trim() !== '' &&
            territoryInfo.description.trim() !== '' &&
            territoryInfo.region.trim() !== '' &&
            !(territoryInfo.name === oldInfo.name && territoryInfo.description === oldInfo.description && territoryInfo.region === oldInfo.region)
        ){
            editTerritory(territoryInfo, id);
        }
        if(territoryInfo.name === oldInfo.name && territoryInfo.description === oldInfo.description && territoryInfo.region === oldInfo.region) handleClose();
        setOpen(false);
    }

    const handleChange = event => {
        setTerritoryInfo({
            ...territoryInfo,
            [event.target.name] : event.target.value,
        })
    }
    return (
        <>    
        {/* <Tooltip title="Edit Territory" placement="top">
            <IconButton onClick={handleOpen}>
                <EditIcon color="primary"/>
            </IconButton>
        </Tooltip>     */}
        <Button
        color="primary"
        onClick={handleOpen}
        variant="contained"
        >Edit</Button>
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Edit Territory
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={territoryInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={territoryInfo.name.trim() === ''}
                helperText={territoryInfo.name.trim() === '' && "Must not be empty"}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="description"
                type="text"
                value={territoryInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={territoryInfo.description.trim() === ''}
                helperText={territoryInfo.description.trim() === '' && "Must not be empty"}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="region"
                type="text"
                value={territoryInfo.region}
                onChange={handleChange}
                label="Region"
                placeholder="Region"
                error={territoryInfo.region.trim() === ''}
                helperText={territoryInfo.region.trim() === '' && "Must not be empty"}
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
)(withStyles(styles)(React.memo(EditTerritoryDialog)));