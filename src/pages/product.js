import React from 'react';
import ProductDetails from '../components/ProductDetails';
import AddProductDialog from '../components/dialogs/AddProductDialog';


//MUI
import Grid from '@material-ui/core/Grid';

const Product = () => {
    return (
        <Grid container
        >   
            <Grid item sm={12}>
            <ProductDetails/>            
            </Grid>
        </Grid>
    );
}

export default React.memo(Product);