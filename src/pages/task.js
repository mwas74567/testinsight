import React from 'react';
import TaskData from '../components/task'; 


import { connect } from 'react-redux';

const mapStateToProps = state => ({
    tasks: state.data.tasks,
});

const Task = props => {
    const { match, tasks } = props;
    let targetTask;

    tasks.forEach(task => {
        if(task.document_id === match.params.taskId) targetTask = task;
    });

    return (
        <>
        <TaskData task={targetTask} />
        </>
    );
}

export default connect(
    mapStateToProps,
)(React.memo(Task));