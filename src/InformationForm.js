import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import GlobalState from './GlobalState';
import * as EmailValidator from 'email-validator';

import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PersonsBox from './PersonsBox';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import AntiBodyComponent from './AntiBodyComponent';


import { format, addMinutes } from 'date-fns';


import dateformat from 'dateformat';
import { enGB, } from 'date-fns/locale'
import DateField from './DateField';

class UTCUtils extends DateFnsUtils {
 
  locale = enGB;
  // format(date, formatString) {
  //   return format(new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 ), formatString,enGB);
  // }

  // getCalendarHeaderText(date){
  //   return dateformat(date, 'mmmm yyyy');
  // }

  // getDayText(date)
  // {
  //   return dateformat(date, 'd');
  // }

}

const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "left"
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    },
    Box:{
      backgroundColor : "#f1f1f1",
      padding: "10px",
      //maxWidth: "300px",
      borderRadius  : "10px",
      boxShadow: "2px 4px #ddd",
      marginTop: "5px",
      marginBottom : "15px",
      textAlign: "left"
      
    
    },

  }));

export default function InformationForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    const [birthDate, setBirthDate] = React.useState(state.birthDate ?? null);
    const [firstname, setFirstname] = React.useState(state.firstname ?? '');
    const [lastname, setLastname] = React.useState(state.lastname ?? '');
    const [email, setEmail] = React.useState(state.email ?? '');
    const [retypeEmail, setRetypeEmail] = React.useState(state.retypeEmail ?? '');
    
    const [gender, setGender] = React.useState(state.gender ?? '');
    const [title, setTitle] = React.useState(state.title ?? '');

    const [emailConfirmed, setEmailConfirmed] = React.useState(state.emailConfirmed ?? false);

    const [passportNumber, setPassportNumber] = React.useState(state.passportNumber ?? '');
    const [passportNumber2, setPassportNumber2] = React.useState(state.passportNumber2 ?? '');


    const [certificate, setCertificate] = React.useState(state.certificate ?? false);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const certificateChanged = (event) => {
      setCertificate(event.target.checked);
      setState(state => ({...state, certificate: event.target.checked}));
  };

  const passportNumberChanged = (event) =>
  {
      setPassportNumber(event.target.value);
      setState(state => ({...state, passportNumber : event.target.value }));
      if (event.target.value && event.target.value.trim().length >= 6)
      {
        setState(state => ({...state, passportNumberError : false}));
      }
  }

  const passportNumberChanged2 = (event) =>
  {
      setPassportNumber2(event.target.value);
      setState(state => ({...state, passportNumber2 : event.target.value}));
  }



    const emailConfirmedChanged = (event) => {
      setEmailConfirmed(event.target.checked);
      setState(state => ({...state, emailConfirmed: event.target.checked}));
      setState(state => ({...state, emailConfirmedError: false}));
  };

    const titleChanged = (event) => {
            setTitle(event.target.value);
            setState(state => ({...state, title: event.target.value}));
            setState(state => ({...state, titleError : false}));
        };

    const genderChanged = (event) => {
            setGender(event.target.value);
            setState(state => ({...state, gender: event.target.value}));
            setState(state => ({...state, genderError : false}));
        };

    const birthDateChanged = (dateStr) =>
    {
      // if (date)
      // {
      //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);
      

      //   date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
      //   console.log(date);
      // }
        
        console.log(dateStr);


        setBirthDate(dateStr);
        setState(state => ({...state, birthDate: dateStr}));
        setState(state => ({...state, birthDateError : false}));
    }  

    const firstnameChanged = (event) =>
    {
        setFirstname(event.target.value);
        setState(state => ({...state, firstname : event.target.value }));
        if (event.target.value && event.target.value.trim().length > 0)
        {
          setState(state => ({...state, firstnameError : false}));
        }
    }

    const lastnameChanged = (event) =>
    {
        setLastname(event.target.value);
        setState(state => ({...state, lastname : event.target.value }));
        if (event.target.value && event.target.value.trim().length > 0)
        {
          setState(state => ({...state, lastnameError : false}));
        }
    }

    const emailChanged = (event) =>
    {
        setEmail(event.target.value);
        setState(state => ({...state, email : event.target.value }));
        if (event.target.value && EmailValidator.validate(event.target.value))
        {
          setState(state => ({...state, emailError : false}));
        }
    }

    
    const retypeEmailChanged = (event) =>
    {
        setRetypeEmail(event.target.value);
        setState(state => ({...state, retypeEmail : event.target.value }));
        if (event.target.value && EmailValidator.validate(event.target.value))
        {
          setState(state => ({...state, retypeEmailError : false}));
        }
    }

  return (


    <React.Fragment>

      {/* <AntiBodyComponent/> */}

      <PersonsBox/>

    {state.persons.length === 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Enter your Info
          </Typography>
    }

    {state.persons.length > 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Enter your Info
          </Typography>
    }

      
   

      <Grid container spacing={3} alignItems="baseline">

      <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="gender-label-id">Gender</InputLabel>
                <Select
                    error={state.genderError ? true : false}
                    fullWidth
                    labelId="gender-label-id"
                    id="gender-id"
                    value={gender}
                    onChange={genderChanged}
                >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="title-label-id">Title</InputLabel>
                <Select
                    error={state.titleError ? true : false}
                    fullWidth
                    labelId="title-label-id"
                    id="title-id"
                    value={title}
                    onChange={titleChanged}
                >
                    <MenuItem value={'Mr'}>Mr</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs</MenuItem>
                    <MenuItem value={'Miss'}>Miss</MenuItem>
                    <MenuItem value={'Ms'}>Ms</MenuItem>
                    <MenuItem value={'Dr'}>Dr</MenuItem>
                </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
                    error={state.firstnameError ? true : false}
                    required id="firstName" label="First Name" 
                    fullWidth autoComplete="given-name" 
                    value = {firstname}
                    onChange = {firstnameChanged} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
         <TextField 
                    error={state.lastnameError ? true : false}
                    required id="lastName" label="Last Name" 
                    fullWidth autoComplete="family-name" 
                    value = {lastname}
                    onChange = {lastnameChanged} 
        />  
        </Grid>
        <Grid item xs={12} md={12}>
        {/* <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
            <KeyboardDatePicker  
                        error={state.birthDateError ? true : false}
                        autoOk
                        fullWidth
                        variant="inline"
                        label="Birthdate"
                        format="dd/MM/yyyy"
                        disableFuture
                        InputAdornmentProps={{ position: "start" }}
                        helperText="dd/MM/yyyy"
                        value={birthDate}
                        onChange={birthDateChanged}
                        />
             </MuiPickersUtilsProvider> */}
               <DateField
                error={state.birthDateError}
                title="Date of Birth"
                value={birthDate}
                dateChanged={birthDateChanged}
             >

             </DateField>
        </Grid>
        <Grid item xs={12} md={6}>
             <TextField
                        error={state.emailError ? true : false}
                        required id="email" label="Email Address" 
                        fullWidth autoComplete="email"  type="email"
                        value = {email}
                        onChange = {emailChanged} 
                        helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
             />  
        </Grid>

        <Grid item xs={12} md={6}>
             <TextField
                        error={state.retypeEmailError ? true : false}
                        required id="retypeEmail" label="Retype Email Address" 
                        fullWidth autoComplete="none"  type="email"
                        value = {retypeEmail}
                        onChange = {retypeEmailChanged} 
                        // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
             />  
        </Grid>

        <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl}  style={ {color: state.emailConfirmedError ? "red" : ''}} 
            control={<Checkbox className={classes.formControl} style={ {color: state.emailConfirmedError ? "red" : ''}}  color="secondary" name="emailConfirmCheckBox" checked={emailConfirmed} onChange={emailConfirmedChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I confirm that this is a private email address to which I am happy for you to send my results.`} </span>}
          />
          <p>{'* Please take care when entering your information, and double check that everything entered on this form is correct.'}</p>
        </Grid>

        <Grid item xs={12}>
               
              
               <div className={classes.Box}>

                    <div className= {classes.Label}>
                        Add to your Appointment...
                    </div>

                    <div className= {classes.CheckBox}>
                    <FormControlLabel className={classes.formControl} 
                  control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
                  label={<span style={{ fontSize: '0.8rem' }}>{`I also require a medical certificate signed by a doctor declaring me 'fit-to-fly'.`} 
                  
                  <span  style={{ fontSize: '1rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}>  + £50.00 </span> 

                  </span>}
                />
              <div style={{paddingTop:"10px"}}>
              {'If your requirements make any mention of a passport number, you will need a certificate. Laboratories do not note passport numbers on their results. If you are going to Spain, you need a certificate.'}
              </div>
        
        {/* <div style={{marginTop: "10px"}}  hidden={!certificate} >
             <TextField 
                        error={state.passportNumberError ? true : false}
                        required id="passport" label="Passport Number" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="" 
                        value = {passportNumber}
                        onChange = {passportNumberChanged} 
             />  
        </div>
        <div  style={{marginTop: "10px"}} hidden={!certificate} >
             <TextField 
                        // error={state.passportNumberError ? true : false}
                        id="passport2" label="Second Passport Number (optional)" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="" 
                        value = {passportNumber2}
                        onChange = {passportNumberChanged2} 
             />  
        </div>       */}
              </div>


              </div>
        </Grid>

        <Grid item xs={12} hidden={!certificate} >
             <TextField 
                        error={state.passportNumberError ? true : false}
                        required id="passport" label="Passport Number" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="none" 
                        value = {passportNumber}
                        onChange = {passportNumberChanged} 
             />  
        </Grid>
        <Grid item xs={12} hidden={!certificate} >
             <TextField 
                        // error={state.passportNumberError ? true : false}
                        id="passport2" label="Second Passport Number (optional)" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="none"  
                        value = {passportNumber2}
                        onChange = {passportNumberChanged2} 
             />  
        </Grid>
     
      </Grid>
    
      
    </React.Fragment>
  );
}

