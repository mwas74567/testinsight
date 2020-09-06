import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip'

//Redux
import { connect } from 'react-redux';
import { setDepartment } from '../redux';

const styles = theme => ({
  root: {
    width: '100%',
    },
    container: {
    maxHeight: 600,
    [theme.breakpoints.up("sm")]: {
      minHeight: 300,
    }
    },
    tableImage: {
      width: 70,
      height: 70,
      objectFit: 'cover',
    },
    selectable: {
      cursor: 'pointer',
    },
});

const mapStateToProps = state => ({
    departments: state.departmentsData.departments,
});

const mapDispatchToProps = dispatch => ({
  setDepartment: department => dispatch(setDepartment(department)),
});


const Departments = ({ classes, departments, setDepartment }) => {

  const history = useHistory();
    const columns = [
        {
            id: 'number',
            label: 'No',
            minWidth: 170,
        },
        {
            id: 'name',
            label: 'Department\u00a0Name',
            minWidth: 170,
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
        },
        
    ];

    const createRows = (index, department) => {
      const  { name, description, document_id} = department;
      return {
        number: index + 1,
        name,
        description,
        status:'',
        id: document_id,
        department,
      }
    };

    const rows = departments.map((department, index) => createRows(index, department));    
    

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeUrl = department => {
    setDepartment(department);
    history.push(`/departments/${department.document_id}`);
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bolder' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.selectable} onClick={() => changeUrl(row.department)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20,]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Departments)));
