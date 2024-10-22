import React , { useState, useEffect } from "react";
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
import Autocomplete from '@material-ui/lab/Autocomplete';

import Axios from 'axios'
import Copyright from "../components/Copyright"
import FileReader from "../components/FileReader"




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

export default withRouter(function AddClient(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    genre : ""
  })


  const [addressChoice, setAddressChoice] = useState(["Paris"])
  const [uploadData, setUpload] = useState(null);


  const handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    setUpload(e.target.files[0]);
  }


  const handleChange = e => {
    console.log({ [e.target.name] : e.target.value });
    setUser({
      ...user,
      [e.target.name] : e.target.value
    });
 

    
    console.log(user);
    Axios
     .get(`https://api-adresse.data.gouv.fr/search/?q=${user.address}&limit=15`)
     .then(apiRes => {
      console.log(apiRes.data.features)
      const choice = []
      apiRes.data.features.map(element => choice.push(element.properties.label))
      setAddressChoice(choice)
      console.log("choix d'adresse", addressChoice)
  })
  .catch(apiErr => console.log("GROS FAIL... ", apiErr))
  };




 const handleClickAutocomplete = e => {
    const address = e.target.value
    console.log("click", address)
    e.preventDefault();

    setUser({
        ...user,
        [e.target.name]  : address
      })
 }
 



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
          <AddIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          New Client
        </Typography>
        <form className={classes.form} method="post"
          onChange={handleChange} 
          onSubmit={handleSubmit}>

      <RadioGroup aria-label="gender" name="genre"  onChange={handleChange}>
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
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mail"
                label="Email Address"
                name="mail"
                autoComplete="email"
              />
            </Grid>
           
            <Grid item xs={12}>
            <Autocomplete 
                    id="combo-box-demo"
                    options={addressChoice}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params}
                    onClick={handleClickAutocomplete}
                    variant="outlined"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                   autoComplete="current-address"

              />}
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
        </form>
          <FileReader/>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  })