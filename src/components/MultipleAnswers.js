import React from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        margin: 20,
    },
    title: {

    },
    content: {
        padding: 20,
    }
})

const SingleAnswer = ({classes, report}) => {
    return (
        <Card className={classes.card}>
            {/* <Typography variant="body2" color="textSecondary" className={classes.title}><i>This was a multiple answer action</i></Typography> */}
            <CardContent className={classes.content}>
                <span>Action Name <strong>{report.action_name}</strong></span> <br />
                {
                    report.answers.map((answer, index) => {
                         return <Typography variant="h6" color="primary">Answer No {index + 1}: {answer}</Typography>
                    })
                }
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(React.memo(SingleAnswer));
