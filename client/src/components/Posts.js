import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'

import JWT from 'jwt-client'

import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'
import PostInfo from './PostInfo'
// import NewPost from './NewPost'
// import AppovePosts from './ApprovePosts'

const styles = theme => ({
  paper: {
    maxWidth: 1236,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: '40px 16px'
  }
})


function Content(props) {
  const { classes } = props

  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const [inital, setInital] = React.useState(0)
  const [posts, setPosts] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('loading');
  const [isAdmin, setIsAdmin] = React.useState(0)
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(0)

  const handleClickOpen = (value) => {
    setSelectedValue(value)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (inital == 0) {
    getPosts()
    setInital(1)
  }

  function getPosts() {
    const token = JWT.get()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axios
      .get('/post')
      .then(response => {
        setPosts(response.data)
        console.log(response)
      })
      .catch(error => {
      })
    // axios
    //   .get('/admin')
    //   .then(response => {
    //     setIsAdmin(response.data.isAdmin)
    //   })
    //   .catch(error => {
    //   })

    // axios
    //   .get('/superAdmin')
    //   .then(response => {
    //     setIsSuperAdmin(response.data.isAdmin)
    //   })
    //   .catch(error => {
    //   })
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClickPop = post => {
    setAnchorEl(post.currentTarget)
  }

  const handleClosePop = () => {
    setAnchorEl(null)
  }

  const openPop = Boolean(anchorEl);
  const idPop = open ? 'simple-popover' : undefined;

  function Posts(props) {
    const classes = useStyles();


    if (posts.length != 0) {
      var postFeed = posts || []
      console.log(postFeed[0].file = postFeed[0].url)
      return (
        // <img src={postFeed[0].file} alt="W3Schools.com"></img>
        <Grid container spacing={3}>
          {postFeed.map((item, index) =>
            <Grid key={item.body._id} item md={4} onClick={(e) => { console.log(item.body._id); handleClickOpen(item.body._id) }}>
              <Card color="primary" className={classes.card}>
                <CardContent align="center">
                  <div style={{height: '200px',width: '200px', maxWidth: '400px', overflow: "hidden"}}>
                    <img src={item.url} alt={item.body._id} style={{width: '200px'}}></img>
                  </div>
                  <Typography variant="h5" component="h2" align="center">
                    {item.body.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>)
          }
          <PostInfo selectedValue={selectedValue} open={open} onClose={handleClose} />
        </Grid >
      )
    }
    return (<Typography color="textSecondary" align="center">
      No posts found
  </Typography>)

  }

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            </Grid>
            <Grid item xs>
              Post Feed
            </Grid>
            <Grid item >
              {/* {(isSuperAdmin == 1) && <AppovePosts getPosts={getPosts} />} */}
            </Grid>
            <Grid item >
              {/* {(isAdmin == 1) && <NewPost />} */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.addUser}
                onClick={getPosts}
              >
                Refresh
              </Button>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Posts />
      </div>
    </Paper>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Content)
