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

const ActionAnswer = ({classes, action}) => {
    return (
        <Card className={classes.card}>
        {/* <Typography variant="body2" color="textSecondary" className={classes.title}><i>This was a multiple answer action</i></Typography> */}
        <CardContent className={classes.content}>
            {
                action.action_type === 'single_selection' || action.action_type === 'multiple_selection' ?
                (<span>Available Choices:<strong>{action.action_type}</strong></span>) :
                (<span>Action Type :<strong>{action.action_type}</strong></span>)

            }
            {
                action.answer_choices.map((answer, index) => {
                     return <Typography variant="h6" color="primary">{index + 1}: {answer}</Typography>
                })
            }
        </CardContent>
    </Card>
    )
}

export default withStyles(styles)(React.memo(ActionAnswer));
