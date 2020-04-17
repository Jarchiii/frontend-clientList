import React , { useState, useEffect } from "react";
import { useLocation} from "react-router";
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import APIHandler from "../api/APIHandler";
import { NavLink } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default withRouter(function EditClient(props) {
  const classes = useStyles();
  const [user, setClient] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    genre : ""
  })

  const Settings = () => {
    let location = useLocation();
    console.log(location);
    return location.pathname
};

const pathname = Settings()

  useEffect(()=> {
    APIHandler.get(pathname)
    .then(apiRes => {
        console.log("lcient a éditer", apiRes)
        setClient(apiRes.data)
    })
    .catch(apiErr => console.log(apiErr));
    return () => {};
}, []);

  const handleChange = e => {
    console.log({ [e.target.name] : e.target.value });
    setClient({
      ...user,
      [e.target.name] : e.target.value
    });
    console.log(user);
  };




  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);

    APIHandler
    .post("/clients", user)
    .then(apiRes => {
      console.log("OK: CLIENT CREATED... ", apiRes);
      props.history.push("/clients");
    })
    .catch(apiErr => console.log("GROS FAIL... ", apiErr))
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Client
        </Typography>
        <form className={classes.form} method="post"
          onChange={handleChange} 
          onSubmit={handleSubmit}>

      <RadioGroup aria-label="gender" name="genre"  onChange={handleChange} value={user.genre}>
        <FormControlLabel value="Mme" control={<Radio />} label="Mme" />
        <FormControlLabel value="Mr" control={<Radio />} label="Mr" />
       
      </RadioGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                value={user.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                autoComplete="name"
                value={user.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mail"
                name="mail"
                autoComplete="email"
                value={user.mail}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                type="address"
                id="address"
                autoComplete="current-address"
                value={user.address}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Client
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Import Clients (from CSV file)
          </Button>
        
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  })