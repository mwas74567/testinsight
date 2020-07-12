import React from 'react';

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

//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
});

const TerritoriesSkeleton = ({ classes }) => {

    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
        },
        {
            id: 'region',
            label: 'Region',
            minWidth: 170,
        },
        {
          id: 'town',
          label: 'Town',
          minWidth: 170,
      },
        {
            id: 'customers',
            label: 'Number\u00a0Of\u00a0Customers',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'edit',
            label: '',
            minWidth: 170,
            align: 'right',
        }
    ];

    const rows = [
        {
            name: 'First Territory',
            description: 'This is the first territory',
            region: 'Example Region',            
            town: 'Example Town',
            customers: 0,
            edit: ''
        },
        {
            name: 'Second Territory',
            description: 'This is the second territory',
            region: 'Example Region',            
            town: 'Example Town',
            customers: 0,
            edit: ''
        },
        {
            name: 'Third Territory',
            description: 'This is the third territory',
            region: 'Example Region',            
            town: 'Example Town',
            customers: 0,
            edit: ''
        },
        {
            name: 'Fourth Territory',
            description: 'This is the fourth territory',
            region: 'Example Region',
            town: 'Example Town',
            customers: 0,
            edit: ''
        },
        {
            name: 'Fifth Territory',
            description: 'This is the fifth territory',
            region: 'Example Region',
            customers: 0,
            edit: ''
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
                        {column.id === 'edit' ? (
                            <>
                            <Tooltip
                            placement="top"
                            title="Edit this territory"
                            >
                                <IconButton
                                >
                                    <EditIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                            </>
                        ) : column.format && typeof value === 'number' ? column.format(value) : value}
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

export default withStyles(styles)(React.memo(TerritoriesSkeleton));
