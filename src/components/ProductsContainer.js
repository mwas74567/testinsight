import React from 'react';
import ProductSkeleton from './skeletons/ProductSkeleton';
import Products from './Products';

//redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.UI.loading,
})

const ProductCategoriesContainer = ({ loading }) => {
    return (
        <>
            {
                loading ? <ProductSkeleton />
                : <Products />
            }
        </>
    )
}

export default connect(mapStateToProps)(React.memo(ProductCategoriesContainer));
