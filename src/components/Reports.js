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
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

//redux
import { connect } from 'react-redux'

// const styles = theme => ({
//     root: {
//     width: '100%',
//     },
//     container: {
//     maxHeight: 440,
//     },
//     tableImage: {
//       width: 70,
//       height: 70,
//       objectFit: 'cover',
//     }
// });
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const mapStateToProps = state => ({
    tasks: state.data.tasks,
});
// const ReportsSkeleton = ({ classes, tasks }) => {

//     const columns = [
//         {
//             id: 'name',
//             label: 'Name',
//             minWidth: 170,
//         },
//         {
//             id: 'status',
//             label: 'status',
//             minWidth: 170,
//         },
//         {
//           id: 'actions',
//           label: 'actions',
//           minWidth: 170,
//         },
//         {
//           id: 'department_name',
//           label: 'phone number',
//           minWidth: 170,
//         },
//     ];

//     const createRows = (task) => ({
//         name: task.name,
//         status: task.status,
//         actions:task.number_of_actions,
//         department_name: task.department_name,
//     });

//     const rows = tasks.length > 0 ? tasks.map(task => createRows(task)) : [];
    
    

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map(column => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth, fontWeight: 'bolder' }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                   {columns.map((column, columnIndex) => {
//                     // if(columnIndex === 0) {
//                     //   return (
//                     //     <TableCell key={column.id} align={column.align}>
//                     //     <img src={row.image_url} alt="customer" className={classes.tableImage}/>
//                     //     </TableCell>
//                     //   )
//                     // }
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20,]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
function createData(department_name, territory, customer_name, tasks, created_by) {
  return {
    department_name,
    territory,
    customer_name,
    tasks,
    created_by,
    history: [
      { department: 'Petrol Station Branch Workers', tasks :159, territory: 'thika', issue:'thomas' },
      { department: 'Ukwala', tasks :54, territory: 'kiambu', issue:'trump' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.department_name}
        </TableCell>
        <TableCell align="right">{row.territory}</TableCell>
        <TableCell align="right">{row.customer_name}</TableCell>
        <TableCell align="right">{row.tasks}</TableCell>
        <TableCell align="right">{row.created_by}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Detailed Visit Reports
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Department Name</TableCell>
                    <TableCell>Number of tasks</TableCell>
                    <TableCell align="right">Territory</TableCell>
                    <TableCell align="right">Issued By:</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.department}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.tasks}
                      </TableCell>
                      <TableCell>{historyRow.territory}</TableCell>
                      <TableCell align="right">{historyRow.issue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Petrol Station Branch Workers', 159, 'thika', 'completed',),
  createData('Ukwala markets', 237, 'kiambu', 'pending',),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Department Name</TableCell>
            <TableCell align="right">Number of tasks</TableCell>
            <TableCell align="right">Territory</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// export default connect(
//     mapStateToProps,
// )(withStyles(styles)(React.memo(ReportsSkeleton)));
