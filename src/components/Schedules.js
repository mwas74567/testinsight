import React from 'react';
import dayjs from 'dayjs';
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


//redux
import { connect } from 'react-redux';
import { setSchedule } from '../redux';

const mapStateToProps = state => ({
    schedules: state.schedulesData.schedules,
});

const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule)),
});

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

const Schedules = ({ classes, schedules, setSchedule }) => {
  const history = useHistory();

   const changeUrl = (schedule) => {
     setSchedule(schedule);
    history.push(`/schedules/${schedule.document_id}`);
   }

    const columns = [
        {
            id: 'visit_date',
            label: 'Visit\u00a0Date',
            minWidth: 180,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 180,
        },
        {
          id: 'department_name',
          label: 'Department',
          minWidth: 180,
          align: 'left',
        },
        
        {
            id: 'customer_name',
            label: 'Customer',
            minWidth: 180,
            align: 'right',
        },
        {
            id: 'number_of_tasks',
            label: 'Number\u00a0Of\u00a0Tasks',
            minWidth: 180,
            align: 'right',
        }
    ];

    const createRows = schedule => {
        const { visit_date, status, customer_name, number_of_tasks,department_name} = schedule;
        return ({
            visit_date: dayjs(visit_date._seconds * 1000).format('h: mm a, MMMM DD YYYY'),
            status, 
            customer_name,
            number_of_tasks,
            schedule,
            department_name,
        });
    }

    const rows = schedules.length > 0 ? schedules.map(schedule => createRows(schedule)): [];
    
    

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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={() => changeUrl( row.schedule)} className={classes.selectable}>
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
)(withStyles(styles)(React.memo(Schedules)));
