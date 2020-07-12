import React from 'react';
import CheckInSummariesSkeleton from './skeletons/CheckInSummariesSkeleton';
import CheckInSummaries from './CheckInSummaries';

//redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.UI.loading,
})

const CheckInSummariesContainer = ({ loading }) => {
    return (
        <>
            {
                loading ? <CheckInSummariesSkeleton />
                : <CheckInSummaries />
            }
        </>
    )
}

export default connect(mapStateToProps)(React.memo(CheckInSummariesContainer));
