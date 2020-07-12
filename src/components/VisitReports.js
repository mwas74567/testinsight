import React from 'react';
import dayjs from 'dayjs';
import ExpandVisitReportDialog from './dialogs/ExpandVisitReportDialog';

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
    selectable: {
      cursor: 'pointer',
    }
});

const mapStateToProps = state => ({
    visitReports: state.data.visitReports,
});


const Row = ({ classes, row, columns, handleOpen}) => {
  return (
    <>
    <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={handleOpen} className={classes.selectable}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number' ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
    </>
  )
}

const VisitReports = ({ classes, visitReports }) => {

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

    const createRows = report => {
        const { visit_date, status, department_name, customer_name, number_of_tasks } = report;
        return({
            visit_date: dayjs(visit_date._seconds * 1000).format('h: mm a, MMMM DD YYYY'),
            status,
            department_name,
            customer_name,
            number_of_tasks,
            report,
        });
    }
    
    const rows = visitReports.length > 0 ? visitReports.map(report => createRows(report)) : [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //dialog
  const [open, setOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState({});
  const handleOpen = report => {
    setOpen(true);
    setSelectedReport(report);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <ExpandVisitReportDialog open={open} handleClose={handleClose} report={selectedReport}/>
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
                <Row
                classes={classes}
                row={row}
                columns={columns}
                handleOpen={() => handleOpen(row.report)}
                />
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
    </>
  );
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(VisitReports)));
