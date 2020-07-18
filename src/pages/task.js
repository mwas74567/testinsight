// import React from 'react';


// import { connect } from 'react-redux';

// const mapStateToProps = state => ({
//     tasks: state.tasksData.tasks,
// });

// const Task = props => {
//     const { match, tasks } = props;
//     let targetTask;

//     tasks.forEach(task => {
//         if(task.document_id === match.params.taskId) targetTask = task;
//     });

//     return (
//         <>
//         <TaskData task={targetTask} />
//         </>
//     );
// }

// export default connect(
//     mapStateToProps,
// )(React.memo(Task));