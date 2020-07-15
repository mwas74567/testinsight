import React from 'react';
import EditDepartmentDialog from './dialogs/EditDepartmentDialog';

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

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
});

const mapStateToProps = state => ({
    departments: state.departmentsData.departments,
});


const Departments = ({ classes, departments }) => {

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
        {
          id: 'edit',
          label: '',
          minWidth: 170,
          align: 'right',
      }
    ];
    // const [status, setStatus] = React.useState(department.status ? department.status: "active");

    // const disableAgent = () => {
    //     changeAgentStatus(department.document_id, { status: "expired"});
    //     setStatus("expired");
    // }

    // const activateAgent = () => {
    //     changeAgentStatus(department.document_id, { status: "active"});
    //     setStatus("active");
    // }

    const createRows = (index, name, description,id) => ({
        number: index + 1,
        name,
        description,
        edit: '',
        status:'',
        id,

    });

    const rows = departments.map((department, index) => createRows(index, department.name, department.description,department.document_id));    
    

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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'edit' ? (
                            <>
                            <Tooltip
                            placement="top"
                            title="Edit this Department"
                            >
                                <EditDepartmentDialog
                                oldInfo={{
                                  name: row.name,
                                  description: row.description,
                                }}
                                id={row.id}
                                />
                            </Tooltip>
                            </>
                        ) : column.format && typeof value === 'number' ? column.format(value) : value}
                       {/* {
                    status === "active" ?
                    <Button
                    color="secondary"
                    variant="contained"
                    onClick={disableAgent}
                    className={classes.buttons}
                    >Disable</Button> :
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={activateAgent}
                    className={classes.buttons}
                    >Activate</Button>
                } */}
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
)(withStyles(styles)(React.memo(Departments)));
