import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import ProductCategoriesContainer from '../components/ProductCategoriesContainer';
import ProductsContainer from '../components/ProductsContainer';

//MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//Icons
import CategoryIcon from '@material-ui/icons/Category';
import ExtensionIcon from '@material-ui/icons/Extension';

//redux
import { connect } from 'react-redux';
import { getProductCategories, getProducts } from '../redux';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    [theme.breakpoints.up('sm')]: {
        width: '100%',
    }
  },
}));

const mapStateToProps = state => ({
  product_categories: state.productCategoriesData.product_categories,
  products: state.productsData.products,
});

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => dispatch(getProductCategories()),
  getProducts: () => dispatch(getProducts()),
});

const Products = ({ product_categories, getProductCategories, getProducts, products }) => {

  React.useEffect(() => {
    document.title = "Client | Products";
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if(value === 0 && product_categories.length === 0) getProductCategories();
    if(value === 1 && products.length === 0) getProducts();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid container
    >
        <Grid item sm={12}>
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
            >
            <Tab label="Categories" {...a11yProps(0)} icon={<CategoryIcon />} />
            <Tab label="Items" {...a11yProps(1)} icon={<ExtensionIcon />}/>
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
            <ProductCategoriesContainer />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <ProductsContainer/>
            </TabPanel>
        </SwipeableViews>
        </div>
        </Grid>
    </Grid>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Products));