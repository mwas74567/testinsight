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
import { editProductInfo} from '../../redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
}

const mapStateToProps = state => ({
    product: state.productsData.product,
    errors: state.UI.errors,
});

const mapDispatchToProps = dispatch => ({
    editProductInfo: (newInfo ,id) => dispatch(editProductInfo(newInfo,id)),
});

const EditProductPriceEntity = ({ classes, type, title, label, product, errors, editProductInfo }) => {

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState({
        
               available_stock: '',

    });

    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setEntity({
             available_stock :product.available_stock
            });
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
        // if(entity === product[infoKey] || entity.trim() === ''){
        //     handleClose();
        //     return;
        // }
        if(entity.trim() !== ''){
            
            editProductInfo(entity,product.document_id);
        }
        handleClose();
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
                        name='available_stock'
                        type={type}
                        value={entity.available_stock}
                        onChange={handleChange}
                        label={label}
                        placeholder={label}
                        // error={entity.trim() === ''}
                        // helperText={entity.trim() === '' && "Cannot be empty"}
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
)(withStyles(styles)(React.memo(EditProductPriceEntity)));







//trial
// import React from 'react';

// //MUI
// import withStyles from '@material-ui/core/styles/withStyles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';

// //Icons
// import EditIcon from '@material-ui/icons/Edit';

// //Redux
// import { connect } from 'react-redux';
// import { editProductInfo} from '../../redux';

// const styles = {
//     textField: {
//         margin: '10px auto 10px auto',
//     },
// }

// const mapStateToProps = state => ({
//     product: state.productsData.product,
//     errors: state.UI.errors,
// });

// const mapDispatchToProps = dispatch => ({
//     editProductInfo: (newInfo ,id) => dispatch(editProductInfo(newInfo,id)),
// });

// const EditProductPriceEntity = ({ classes, editProductInfo, oldinfo}) => {

//     const [open, setOpen] = React.useState(false);
//     const [entity, setEntity] = React.useState(()=> oldinfo);
    

//     // React.useEffect(() => {
//     //     //map redux state to component state
//     //     if(open){
//     //       setOpen(true)
//     //     }   
//     // }, [open])

//     const handleOpen = () => {
//         setOpen(true);
//     }

//     const handleClose = () => {
//         setOpen(false);
//     }

//     const handleChange = event => {
//         setEntity({
//             ...entity,
//             [event.target.name] : event.target.value,
//         })
      
//     }

//     const handleSubmit = () => {
//         // // if(entity === product[infoKey] || entity.trim() === ''){
//         // //     handleClose();
//         // //     return;
//         // // }
//         // if(entity.trim() !== ''){
            
//         //     editProductInfo(entity,product.document_id);
//         // }
//         // handleClose();
//         if(
//             entity.available_stock.trim() !== '' &&
//             !(entity.available_stock === oldInfo.available_stock)
//         ){
//             editProductInfo(entity, id);
//         }
//         if(entity.available_stock === oldInfo.available_stock) handleClose();
//     }
    
//     return (
//         <>
//              <Tooltip
//             title={title}
//             placement="top"
//             onClick={handleOpen}
//             >
//                 <IconButton
//                 ><EditIcon color="primary"/></IconButton>
//             </Tooltip>
//             <Dialog
//             open={open}
//             onClose={handleClose}
//             fullWidth
//             maxWidth="sm"
//             >
//                 <DialogTitle
//                 >Change Product Unit Price</DialogTitle>
//                 <DialogContent>
//                     <form noValidate>
//                         <TextField
//                         name='available_stock'
//                         title="Change Product Unit Price"
//                         label="unit Price"
//                         type="number"
                        
//                         value={entity.available_stock}
//                         onChange={handleChange}
                        
//                         placeholder='unit Price'                        // error={entity.trim() === ''}
//                         // helperText={entity.trim() === '' && "Cannot be empty"}
//                         className={classes.textField}
//                         fullWidth
//                         />
//                     </form>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                     onClick={handleClose}
//                     variant="contained"
//                     color="secondary"
//                     >Cancel</Button>
//                     <Button
//                     onClick={handleSubmit}
//                     variant="contained"
//                     color="primary"
//                     >Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
//     }


// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(withStyles(styles)(React.memo(EditProductPriceEntity)));
