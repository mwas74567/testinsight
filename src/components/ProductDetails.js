import React from 'react';
import { useCountUp } from 'react-countup';
import EditProductPriceEntity from './dialogs/EditProductPriceEntity';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//Icons
import EditIcon from '@material-ui/icons/Edit';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import Timeline from '@material-ui/icons/Timeline';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

//redux
import { connect } from 'react-redux';

const styles = theme => ({
  paper: {
    padding: 40,
    // position: 'fixed',
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      paddingLeft: '42%',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  imageIcon: {
      backgroundColor: 'rgba(0,0,0,.8)',
  },
  actionButtons: {
    margin: '5px 5px 5px 0px',
  },
  distance:{
    cursor:'pointer',
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const mapStateToProps = state => ({
    product: state.productsData.product,

});

const mapDispatchToProps = dispatch => ({
  
});


const ProductDetails = ({ classes, product }) => {

    dayjs.extend(relativeTime);
    const {product_description, product_title, image_url, available_stock, unit_price, } = product;
    


    const { countUp, start, pauseResume, reset, update } = useCountUp({
        end: 5, 
        duration: 5,
        startOnMount: true,
    });

    // const handleImageChange = event => {
    //     const imageFile = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('image', imageFile, imageFile.name);
    //     uploadImage(formData);
    // }

    const selectImage = () => {
        const input = document.querySelector("#imageInput");
        input.click();
    }


    
 

    return (
        <>
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={image_url} alt="profile"/>
                        <input type="file" id="imageInput" onChange={event => {}} hidden="hidden"/>
                        
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                
                    <MailIcon color="primary" /><span>Product Name: <strong>{product_title}</strong></span>
                     <hr/> 


                    <AddShoppingCartIcon color="primary" /><span>Product Description: <strong>{product_description}</strong></span>
                   
                    <hr/>

                    
                    <AttachMoneyIcon color="primary" /> <span>Unit Price: <strong>{unit_price}</strong></span>  
                    <EditProductPriceEntity
                        title="Change Product Unit Price"
                        label="unit Price"
                        type="number"
                    />
                  
                    <hr/>
                    <AssignmentIcon color="primary" /><span>Available Stock: <strong>{available_stock}</strong></span>
                    <EditProductPriceEntity
                        title="Change Product Description"
                        label="Available Stock"                       
                        type="number"
                    />
                    <hr/>
                    </div> 
                </div>
                <Divider />
                <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/products"
                className={classes.actionButtons}
                >Back</Button>
            </Paper>
        </>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(ProductDetails)));
