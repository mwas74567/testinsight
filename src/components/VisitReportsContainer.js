import React from 'react';
import VisitReportsSkeleton from './skeletons/VisitReportsSkeleton';
import VisitReports from './VisitReports';

//redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.UI.loading,
    
});

const VisitReportsContainer = ({ loading }) => {
    return (
        <>
            {
                loading ? <VisitReportsSkeleton />
                : <VisitReports />
            }
        </>
    )
}

export default connect(mapStateToProps)(React.memo(VisitReportsContainer));
