import React from 'react';
import dayjs from 'dayjs';
import ExpandCheckInSummaryDialog from './dialogs/ExpandCheckInSummaryDialog';

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
import {connect} from 'react-redux';

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
    selectable: {
      cursor: 'pointer',
    },
});

const mapStateToProps = state => ({
  checkInSummaryReports: state.data.checkInSummaryReports,
})

const CheckInSummaries = ({ classes, checkInSummaryReports }) => {

    const columns = [
        {
            id: 'agent_name',
            label: 'Agent',
            minWidth: 170,
        },
        {
            id: 'department_name',
            label: 'Department',
            minWidth: 170,
        },
        {
            id: 'customer_name',
            label: 'Customer',
            minWidth: 170,
        },
        {
          id: 'last_check_in_time',
          label: 'Last\u00a0Check\u00a0In',
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
      const {agent_name, department_name, customer_name, last_check_in_time, proximity_in_meters} = report;
      return({
        agent_name,
        department_name,
        customer_name,
        last_check_in_time: dayjs(last_check_in_time._seconds).format('h: mm a, MMMM DD YYYY'),
        proximity_in_meters, 
        report,
      });
    }

    const rows = checkInSummaryReports.length > 0 ? checkInSummaryReports.map(report => createRows(report)) : [];
    
    

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
    <ExpandCheckInSummaryDialog open={open} handleClose={handleClose} report={selectedReport} />
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name} className={classes.selectable} onClick={() => handleOpen(row.report)}>
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
    </>
  );
}

export default connect(
  mapStateToProps
)(withStyles(styles)(React.memo(CheckInSummaries)));
