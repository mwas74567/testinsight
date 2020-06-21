import React from 'react';
import DepartmentsSkeleton from '../components/skeletons/DepartmentsSkeleton';
import DepartmentsData from '../components/Departments';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getDepartments } from '../redux';


const mapStateToProps = state => ({
    departments: state.data.departments,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getDepartments: () => dispatch(getDepartments()),
})

const Departments = ({ getDepartments, departments, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Departments';
        if(departments.length === 0) getDepartments();
    }, []);

    const component = loading ? <DepartmentsSkeleton/> : <DepartmentsData/>;

    return (
        <Grid container
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
)(React.memo(Departments));
