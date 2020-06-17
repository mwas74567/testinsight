import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../redux';

const styles = {
    button: {
        color: '#ffffff',
        borderColor: '#ffffff',
    }, 
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
}

const mapStateToProps = state => ({
    UI: state.UI,
})

const mapDispatchToProps = dispatch => ({
    loginUser: (credentials, history) => dispatch(loginUser(credentials, history)),
    clearErrors: () => dispatch(clearErrors()),
})

const SigninDialog = ({ classes, loginUser, clearErrors, UI }) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
    });

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        clearErrors();
    }

    const handleChange = event => {
        clearErrors();
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = () => {
        loginUser(credentials, history);
    }
    return (
        <>
            <Button
            className={classes.button}
            variant="outlined"
            onClick={handleOpen}
            disabled={open}
            >SIGN IN</Button>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle><Typography variant="h5">Sign In</Typography></DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                        name="email"
                        type="text"
                        value={credentials.email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="Email"
                        error={UI.errors && !!UI.errors.email}
                        helperText={UI.errors && UI.errors.email}
                        className={classes.textField}
                        fullWidth
                        />
                        <TextField
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        label="Password"
                        placeholder="Password"
                        error={UI.errors && !!UI.errors.password}
                        helperText={UI.errors && UI.errors.password}
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
                    disabled={UI.loading}
                    >SIGN IN {
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
)(withStyles(styles)(React.memo(SigninDialog)));
