import React from 'react';
import AddProductDialog from './dialogs/AddProductDialog';

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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//redux
import { connect } from 'react-redux';
import {  uploadProductImage } from '../redux';

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
    products: state.productsData.products,
});

const mapDispatchToProps = dispatch => ({
  uploadProductImage: (formData, id) => dispatch(uploadProductImage(formData, id)),
})

const Products = ({ classes, products, uploadProductImage }) => {

    const columns = [
        {
            id: 'image_url',
            label: 'Product Photo',
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

    const createRows = (image_url, product_title, product_description, document_id) => ({
        image_url,
        product_title,
        product_description,
        document_id,
    });

  let rows = products.length > 0 ? products.map((product, index) => createRows(product.image_url, product.product_title, product.product_description, product.document_id)): []; 
    
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleImageChange = (event, id) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    uploadProductImage(formData, id);
}

const selectImage = (id) => {
    const input = document.querySelector(`#input${id}`);
    input.click();
}

  return (
    <Paper className={classes.root}>
      <AddProductDialog />
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
                        <img src={row.image_url} alt="product" className={classes.tableImage}/>
                        <input type="file" id={`input${row.document_id}`} onChange={event => handleImageChange(event, row.document_id)} hidden="hidden"/>
                        <Tooltip
                        title="Change Product Image"
                        placement="top"
                        >
                            <IconButton
                            onClick={() => selectImage(row.document_id)}
                            className={classes.imageIcon}
                            ><EditIcon color="primary" /></IconButton>
                        </Tooltip>
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
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Products)));
