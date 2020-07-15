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
import MenuItem from '@material-ui/core/MenuItem';

//icons
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//redux
import { connect } from 'react-redux';
import { addProduct, clearErrors } from '../../redux';

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
    products: state.productsData.products,
    product_categories: state.productCategoriesData.product_categories,
    loading: state.productsData.loading,
})

const mapDispatchToProps = dispatch => ({
    addProduct: (productInfo, formData) => dispatch(addProduct(productInfo, formData)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddProductDialog = ({ addProduct, clearErrors, classes, UI, products, product_categories, loading }) => {
    
    const [open, setOpen] = React.useState(false);
    const [productInfo, setProductInfo] = React.useState({
        category_id: '',
        product_description: '',
        product_title: '',
        unit_price: 0,
    });
    const [imageState, setImageState] = React.useState({
        selected: false,
        formData: null,
    })

    //when the products increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setProductInfo({
            category_id: '',
            product_description: '',
            product_title: '',
            unit_price: 0,
        });
        clearErrors();
    }, [products]);

    //when data is not loading, and there are no errors, request was successful
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors) === 0
        ){
            setOpen(false);
            setProductInfo({
                category_id: '',
                product_description: '',
                product_title: '',
                unit_price: 0,
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
        if(
            productInfo.product_title.trim() === '' || 
            productInfo.product_description.trim() === '' ||
            productInfo.category_id.trim() === ''
        ) return;
    
        addProduct({
            ...productInfo,
            unit_price: typeof productInfo.unit_price === "string" ? parseInt(productInfo.unit_price) : productInfo.unit_price,
        }, imageState.formData);
    }

    const handleChange = event => {
        clearErrors();
        setProductInfo({
            ...productInfo,
            [event.target.name]: event.target.value,
        });
    }

    const handleImageChange = event => {
        
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile, imageFile.name);
        setImageState({
            selected: true,
            formData,
        })
    }

    const selectImage = () => {
        const input = document.querySelector("#productImageInput");
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
                Add A New Product
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="product_title"
                type="text"
                value={productInfo.product_title}
                onChange={handleChange}
                label="Title"
                placeholder="Title"
                error={UI.errors && !!UI.errors.product_title}
                helperText={UI.errors && UI.errors.product_title}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="product_description"
                type="text"
                value={productInfo.product_description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={UI.errors && !!UI.errors.product_description}
                helperText={UI.errors && UI.errors.product_description}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="unit_price"
                type="number"
                value={productInfo.unit_price}
                onChange={handleChange}
                label="Unit Price"
                placeholder="Unit Price"
                error={productInfo.unit_price <= 0}
                helperText={productInfo.unit_price <= 0 && "Unit Price should not be zero"}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="category_id"
                id="selected-category"
                select
                label="Category"
                value={productInfo.category_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.category_id}
                helperText={UI.errors && UI.errors.category_id}
                className={classes.textField}
                fullWidth
                >
                {product_categories.map(category => (
                    <MenuItem key={category.document_id} value={category.document_id}>
                    {category.title}
                    </MenuItem>
                ))}
                </TextField>
                <input type="file" id="productImageInput" onChange={event => handleImageChange(event)} hidden="hidden"/>
                <Tooltip
                title="You can optionally choose an image to represent your product"
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
)(withStyles(styles)(React.memo(AddProductDialog)));