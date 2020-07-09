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

const ProductSkeleton = ({ classes }) => {

    const columns = [
        {
            id: 'image_url',
            label: 'Product\u00a0Photo',
            minWidth: 170,
        },
        {
            id: 'product_title',
            label: 'Product\u00a0Title',
            minWidth: 170,
        },
        {
            id: 'product_description',
            label: 'Product\u00a0Description',
            minWidth: 170,
        },
    ];

    const rows = [
        {
            image_url: image,
            product_title: 'First Product',
            product_description: 'This is the first product',
        },
        {
          image_url: image,
          product_title: 'Second Product',
          product_description: 'This is the second product',
        },
        {
          image_url: image,
          product_title: 'Third Product',
          product_description: 'This is the third product',
        },
        {
        image_url: image,
        product_title: 'Fourth Product',
        product_description: 'This is the fourth product',
        },
        {
        image_url: image,
        product_title: 'Fifth Product',
        product_description: 'This is the fifth product',
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
                        <img src={row.image_url} alt="category" className={classes.tableImage}/>
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

export default withStyles(styles)(React.memo(ProductSkeleton));
