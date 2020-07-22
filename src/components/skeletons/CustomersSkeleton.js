import React from 'react';
import image from '../../images/no-item.png';

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
    tableImage: {
      width: 70,
      height: 70,
      objectFit: 'cover',
    }
});

const CustomerSkeleton = ({ classes }) => {

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
    ];

    const rows = [
        {
            image_url: image,
            name: 'First Customer',
            email: 'firstcustomer@email.com',
            phone_number: '0712345678',
        },
        {
          image_url: image,
          name: 'Second Customer',
          email: 'secondcustomer@email.com',
          phone_number: '0712345678',
        },
        {
          image_url: image,
          name: 'Third Customer',
          email: 'thirdcustomer@email.com',
          phone_number: '0712345678',
        },
        {
          image_url: image,
          name: 'Fourth Customer',
          email: 'fourthcustomer@email.com',
          phone_number: '0712345678',
        },
        {
          image_url: image,
          name: 'Fifth Customer',
          email: 'fifthcustomer@email.com',
          phone_number: '0712345678',
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

export default withStyles(styles)(React.memo(CustomerSkeleton));
