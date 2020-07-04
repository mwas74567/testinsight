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

//redux
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
    width: '100%',
    },
    container: {
    maxHeight: 440,
    },
    tableImage: {
      width: 70,
      height: 70,
      objectFit: 'cover',
    }
});

const mapStateToProps = state => ({
    customers: state.data.customers,
});
const CustomerSkeleton = ({ classes, customers }) => {

    const columns = [
        {
            id: 'image_url',
            label: 'Photo',
            minWidth: 170,
        },
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
        },
        {
          id: 'phone_number',
          label: 'Phone',
          minWidth: 170,
        },
        {
          id: 'county',
          label: 'County',
          minWidth: 170,
        },
        {
          id: 'town',
          label: 'Town',
          minWidth: 170,
        },
        {
          id: 'potential',
          label: 'Class',
          minWidth: 170,
        },
    ];

    const createRows = (customer) => ({
        image_url: customer.image_url,
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        county: customer.county,
        town: customer.town,
        potential: customer.potential,
        document_id: customer.document_id,
    });

    const rows = customers.length > 0 ? customers.map(customer => createRows(customer)) : [];
    
    

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
                  {columns.map((column, columnIndex) => {
                    if(columnIndex === 0) {
                      return (
                        <TableCell key={column.id} align={column.align}>
                        <img src={row.image_url} alt="customer" className={classes.tableImage}/>
                        </TableCell>
                      )
                    }
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
)(withStyles(styles)(React.memo(CustomerSkeleton)));
