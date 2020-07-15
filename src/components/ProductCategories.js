import React from 'react';
import AddPCDialog from './dialogs/AddPCDialog';

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
import {  uploadProductCategoryImage } from '../redux';

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
    product_categories: state.productCategoriesData.product_categories,
});

const mapDispatchToProps = dispatch => ({
  uploadProductCategoryImage: (formData, id) => dispatch(uploadProductCategoryImage(formData, id)),
})

const ProductCategories = ({ classes, product_categories, uploadProductCategoryImage }) => {

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

    const createRows = (image_url, title, number_of_products, document_id) => ({
        image_url,
        title,
        number_of_products,
        document_id,
    });

  let rows = product_categories.length > 0 ? product_categories.map((category, index) => createRows(category.image_url, category.title, category.number_of_products, category.document_id)): []; 
    
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
    uploadProductCategoryImage(formData, id);
}

const selectImage = (id) => {
    const input = document.querySelector(`#input${id}`);
    input.click();
}

  return (
    <Paper className={classes.root}>
      <AddPCDialog />
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
                        <input type="file" id={`input${row.document_id}`} onChange={event => handleImageChange(event, row.document_id)} hidden="hidden"/>
                        <Tooltip
                        title="Change Category Image"
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
)(withStyles(styles)(React.memo(ProductCategories)));
