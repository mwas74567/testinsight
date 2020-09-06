import React from 'react';
import dayjs from 'dayjs';
import SingleAnswer from './SingleAnswer';
import MultipleAnswers from './MultipleAnswers';
import Pictures from './Pictures';
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
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

//Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Typography } from '@material-ui/core';

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

const Row = ({row, columns, classes}) => {
  
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
        {columns.map((column, index) => {
          const value = row[column.id];
          if(index !== 0){
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
              </TableCell>
            );
          }
          return (
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          )
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              {
                (row.answer_type === 'open_single' || row.answer_type === 'single_selection') ?
                <SingleAnswer report={row.report} /> : (row.answer_type === 'multiple_selection' || row.answer_type === 'open_multiple') ?
                <MultipleAnswers report={row.report} /> :
                <Pictures attachments ={row.attachments} />
              }
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const mapStateToProps = state => ({
    actionReports: state.actionReportsData.action_reports,
});

const ActionReports = ({ classes, actionReports }) => {

    const columns = [
        {

        },
        {
          id: 'action_name',
          label: 'Name',
          minWidth: 340,
        },
        {
            id: 'answer_type',
            label: 'Type',
            minWidth: 340,
        },
    ];

    const createRows = report => {
        const { action_name, answer_type, department_name,attachments } = report;
        return({
            action_name,
            answer_type,
            department_name,
            report,
            attachments,
        });
    }

    const rows = actionReports.length > 0 ? actionReports.map(report => createRows(report)) : [];
    
    

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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                if(index === 0) {
                  return (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bolder' }}
                  />
                  )
                }
                return (
                  <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bolder' }}
                >
                  {column.label}
                </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <Row
                index={index}
                row={row}
                columns={columns}
                classes={classes}
                />
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
)(withStyles(styles)(React.memo(ActionReports)));
