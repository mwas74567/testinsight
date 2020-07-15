import React from 'react';

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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//icons
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//redux
import { connect } from 'react-redux';
import { addProductCategory, clearErrors } from '../../redux';

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
    openButton: {
        marginBottom: 5,
    }
});

const mapStateToProps = state => ({
    UI: state.UI,
    product_categories: state.productCategoriesData.product_categories,
    loading: state.productCategoriesData.loading,
});

const mapDispatchToProps = dispatch => ({
    addProductCategory: (categoryInfo, formData) => dispatch(addProductCategory(categoryInfo, formData)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddPCDialog = ({ addProductCategory, clearErrors, classes, UI, product_categories, loading }) => {
    
    const [open, setOpen] = React.useState(false);
    const [categoryInfo, setCategoryInfo] = React.useState({
        title: ''
    });
    const [imageState, setImageState] = React.useState({
        selected: false,
        formData: null,
    })

    //when the product_categories increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setCategoryInfo({
            title: ''
        });
        clearErrors();
    }, [product_categories]);

    //when data is not loading, and there are no errors, request to the backend was successful
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors).length === 0
        ) {
            setOpen(false);
            setCategoryInfo({
                title: ''
            });
            clearErrors();
        }
    })

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) {
            setImageState({
                selected: false,
                formData: null,
            })
            clearErrors();
            setOpen(false);
        }
    }

    const handleSubmit = () => {
        if(categoryInfo.title.trim() === '') return;
        addProductCategory(categoryInfo, imageState.formData);
    }

    const handleChange = event => {
        clearErrors();
        setCategoryInfo({
            title: event.target.value
        });
    }

    const handlePCImageChange = event => {
        
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile, imageFile.name);
        setImageState({
            selected: true,
            formData,
        })
    }

    const selectImage = () => {
        const input = document.querySelector("#categoryImageInput");
        input.click();
    }

    const clearImage = () => {
        setImageState({
            selected: false,
            formData: null,
        });
    }

    return (
        <>       
        <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.openButton}
        >Add New</Button>
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Add A New Product Category
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="title"
                type="text"
                value={categoryInfo.title}
                onChange={handleChange}
                label="Title"
                placeholder="Title"
                error={UI.errors && !!UI.errors.title}
                helperText={UI.errors && UI.errors.title}
                className={classes.textField}
                fullWidth
                />
                <input type="file" id="categoryImageInput" onChange={event => handlePCImageChange(event)} hidden="hidden"/>
                <Tooltip
                title="You can optionally choose an image to represent your category"
                placement="top"
                ><IconButton onClick={selectImage}><PhotoSizeSelectActualIcon color="primary"/></IconButton></Tooltip>
                <span>{imageState.selected ? <strong>Selected</strong>: <strong>No Image Selected</strong>}
                {
                    imageState.selected && 
                    <Tooltip
                    title="remove image"
                    placement="top"
                    ><IconButton
                    onClick={clearImage}
                    ><HighlightOffIcon color="secondary"/></IconButton></Tooltip>
                }
                </span>
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
)(withStyles(styles)(React.memo(AddPCDialog)));