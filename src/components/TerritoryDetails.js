import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditTerritory from './dialogs/EditTerritoryDialog';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Looks4Icon from '@material-ui/icons/Looks4';
import DnsIcon from '@material-ui/icons/Dns';
import MoreIcon from '@material-ui/icons/More';

//redux
import { connect } from 'react-redux';

const styles = theme => ({
    detailsContainer: {
        marginBottom: 10,
    },
    infoContainer: {
        position: 'relative',
        marginBottom: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    lightTitle: {
        position: 'absolute',
        right: 10,
        marginBottom: 20,
        [theme.breakpoints.down("md")]: {
            display: 'none'
        }
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        width: '40%',
    },
    note: {
        marginLeft: 20,
    },
});

const mapStateToProps = state => ({
    territory: state.territoriesData.territory,
});

const TerritoryDetails = ({classes, territory}) => {
    dayjs.extend(relativeTime);

    const {name, description, region, status, customer_ids} = territory;
    return (
        <Card className={classes.detailsContainer}>
                    <CardContent className={classes.infoContainer}>
                        <Typography vairant="body2" color="textSecondary" className={classes.lightTitle}>
                            <i>Territory Details </i>
                        </Typography>
        
                        <div className={classes.item}>
                            <DnsIcon color="primary" /> <span className={classes.note}>Name <strong>{name}</strong></span>
                        </div>
                        <div className={classes.item}>
                            <MoreIcon color="primary" /> <span className={classes.note}> Description <strong>{description}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <Looks4Icon color="primary" /> <span className={classes.note}> Number of Customers <strong>{customer_ids.length}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <LocationOnIcon color="primary" /> <span className={classes.note}> Region <strong>{region}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <PersonPinIcon color="primary" /> <span className={classes.note}> Status <strong>{status}</strong> </span>
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/territories"
                        >Back</Button>
                        <EditTerritory oldInfo={territory} id={territory.document_id}/>
                    </CardActions>
                </Card>
    )
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(TerritoryDetails)));
