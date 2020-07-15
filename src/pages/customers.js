import React from 'react';
import CustomersSkeleton from '../components/skeletons/CustomersSkeleton';
import CustomersData from '../components/Customers';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getCustomers } from '../redux';


const mapStateToProps = state => ({
    customers: state.customersData.customers,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getCustomers: () => dispatch(getCustomers()),
});

const Customers = ({ getCustomers, customers, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Customers';
        if(customers.length === 0) getCustomers();
    }, []);

    const component = loading ? <CustomersSkeleton /> : <CustomersData />;

    return (
        <Grid 
        container
        >
            <Grid item sm={12}>
                {component}
            </Grid>
        </Grid>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(React.memo(Customers));
