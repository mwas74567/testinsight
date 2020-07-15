import React from 'react';
import dayjs from 'dayjs';

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

//redux
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
});

const mapStateToProps = state => ({
    checkInReports: state.data.checkInReports,
})

const CheckInReports = ({ classes, checkInReports }) => {

    const columns = [
        {
            id: 'agent_name',
            label: 'Agent',
            minWidth: 170,
        },
        {
            id: 'customer_name',
            label: 'Customer',
            minWidth: 170,
        },
        {
            id: 'created_at',
            label: 'Created \u00a0At',
            minWidth: 170,
        },
        {
            id: 'department_name',
            label: 'Department',
            minWidth: 170,
        },
        
        {
            id: 'proximity_in_meters',
            label: 'Proximity\u00a0(meters)',
            minWidth: 170,
            align: 'right',
        },
    ];

    const createRows = report => {
        const { agent_name, customer_name, created_at, department_name, proximity_in_meters } = report;
        
        return ({
            agent_name,
            customer_name,
            created_at: dayjs(created_at._seconds * 1000).format('h: mm a, MMMM DD YYYY'),
            department_name,
            proximity_in_meters,
        });
    }

    const rows = checkInReports.length > 0 ? checkInReports.map(report => createRows(report)) : [];
    
    

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
)(withStyles(styles)(React.memo(CheckInReports)));