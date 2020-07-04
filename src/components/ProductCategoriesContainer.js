import React from 'react';
import CategoriesSkeleton from './skeletons/CategoriesSkeleton';
import ProductCategories from './ProductCategories';

//redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.UI.loading,
})

const ProductCategoriesContainer = ({ loading }) => {
    return (
        <>
            {
                loading ? <CategoriesSkeleton />
                : <ProductCategories />
            }
        </>
    )
}

export default connect(mapStateToProps)(React.memo(ProductCategoriesContainer));
