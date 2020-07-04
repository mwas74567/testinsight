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

const CategoriesSkeleton = ({ classes }) => {

    const columns = [
        {
            id: 'image_url',
            label: 'Category Photo',
            minWidth: 170,
        },
        {
            id: 'title',
            label: 'Category\u00a0Title',
            minWidth: 170,
        },
        {
            id: 'number_of_products',
            label: 'Number\u00a0of\u00a0Products',
            align: 'right',
            minWidth: 170,
        },
    ];

    const rows = [
        {
            image_url: image,
            title: 'First Category',
            number_of_products: 0,
        },
        {
          image_url: image,
          title: 'Second Category',
          number_of_products: 0,
        },
        {
          image_url: image,
          title: 'Third Category',
          number_of_products: 0,
        },
        {
        image_url: image,
        title: 'Fourth Category',
        number_of_products: 0,
        },
        {
        image_url: image,
        title: 'Fifth Category',
        number_of_products: 0,
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

export default withStyles(styles)(React.memo(CategoriesSkeleton));
