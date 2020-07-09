import React from 'react';
import ProductsSkeleton from './skeletons/ProductsSkeleton';
import Products from './Products';

//redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.UI.loading,
})

const ProductsContainer = ({ loading }) => {
    return (
        <>
            {
                loading ? <ProductsSkeleton />
                : <Products />
            }
        </>
    )
}

export default connect(mapStateToProps)(React.memo(ProductsContainer));
