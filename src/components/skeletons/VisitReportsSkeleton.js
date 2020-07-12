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

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
});

const VisitReportsSkeleton = ({ classes }) => {

    const columns = [
        {
            id: 'visit_date',
            label: 'Visit Date',
            minWidth: 170,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
        },
        {
            id: 'department_name',
            label: 'Department\u00a0Name',
            minWidth: 170,
        },
        {
            id: 'customer_name',
            label: 'Customer\u00a0Name',
            minWidth: 170,
        },
        {
            id: 'number_of_tasks',
            label: 'Number\u00a0Of\u00a0Tasks',
            minWidth: 170,
            align: 'right',
        },
    ];

    const rows = [
        {
            visit_date: dayjs(Date.now()).format('h: mm a, MMMM DD YYYY'),
            status: 'pending_completion',
            department_name: 'Example Department',
            customer_name: 'Example Customer',
            number_of_tasks: 0
        },
        {
            visit_date: dayjs(Date.now()).format('h: mm a, MMMM DD YYYY'),
            status: 'pending_completion',
            department_name: 'Example Department',
            customer_name: 'Example Customer',
            number_of_tasks: 0
        },
        {
            visit_date: dayjs(Date.now()).format('h: mm a, MMMM DD YYYY'),
            status: 'pending_completion',
            department_name: 'Example Department',
            customer_name: 'Example Customer',
            number_of_tasks: 0
        },
        {
            visit_date: dayjs(Date.now()).format('h: mm a, MMMM DD YYYY'),
            status: 'pending_completion',
            department_name: 'Example Department',
            customer_name: 'Example Customer',
            number_of_tasks: 0
        },
        {
            visit_date: dayjs(Date.now()).format('h: mm a, MMMM DD YYYY'),
            status: 'pending_completion',
            department_name: 'Example Department',
            customer_name: 'Example Customer',
            number_of_tasks: 0
        },
    ];
    
    

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

export default withStyles(styles)(React.memo(VisitReportsSkeleton));
