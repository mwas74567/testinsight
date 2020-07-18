import React from 'react';
import CustomerDetails from '../components/CustomerDetails';

const Customer = () => {
    return (
        <>
        <CustomerDetails />
        </>
    );
}

export default React.memo(Customer);