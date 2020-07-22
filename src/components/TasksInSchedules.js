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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Redux
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
    tasks: state.schedulesData.schedule.tasks ? state.schedulesData.schedule.tasks : [],
    schedule: state.schedulesData.schedule,
});

const TasksInSchedules = ({ classes, tasks, schedule }) => {

    const columns = [
        {
            id: 'task_name',
            label: 'Name',
            minWidth: 170,
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
        },
        {
            id: 'assigned_at',
            label: 'Assigned\u00a0At',
            minWidth: 170,
        },
        {
          id: 'assigned_by',
          label: 'Assigned\u00a0By',
          minWidth: 170,
        },
    ];
    
    const createRows = task => {
        const { assigned_at, assigned_by, task_name, description, department_name, status, number_of_actions, document_id} = task;
        return {
            assigned_at: dayjs(assigned_at._seconds * 1000).format('h: mm a, MMMM DD YYYY'),
            assigned_by: schedule.agent_id === assigned_by ? 'Agent' : 'Office',
            task_name,
            description,
            department_name,
            status,
            number_of_actions, 
            document_id, 
            task
        }
    }

    const rows = tasks.length > 0 ? tasks.map(task => createRows(task)) : [];

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
   <>
   <Typography
   color="textSecondary"
   variant="h6"
   ><i>Tasks</i></Typography>
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
   </>
  );
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(TasksInSchedules)));
