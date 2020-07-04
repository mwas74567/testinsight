import React from 'react';
import EditTerritoryDialog from './dialogs/EditTerritoryDialog';

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
    territories: state.data.territories,
})

const Territories = ({ classes, territories }) => {

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

    const createRows = territory => ({
        name: territory.name,
        description: territory.description,
        region: territory.region,
        customers: territory.customer_ids.length,
        document_id: territory.document_id,
        edit: '',
    })

  const rows = territories.length > 0 ? territories.map( territory => createRows(territory)) : [];

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
                                <EditTerritoryDialog
                                oldInfo={{
                                  name: row.name,
                                  description: row.description,
                                  region: row.region,
                                }}
                                id={row.document_id}
                                />
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

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(Territories)));
