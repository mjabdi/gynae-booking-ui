import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GlobalState from './GlobalState';
import PersonsBox from './PersonsBox';
import AntiBodyComponent from './AntiBodyComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "justify",
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    }

  }));

export default function AddressForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    
    const [sameAddress, setSameAddress] = React.useState(false);
    
    const sameAddressChanged = (event) =>
    {
      setSameAddress(event.target.checked);
    }

    const [phone, setPhone] = React.useState(state.phone ?? '');
    const [postCode, setPostCode] = React.useState(state.postCode ?? '');
    const [address, setAddress] = React.useState(state.address ?? '');
    const [notes, setNotes] = React.useState(state.notes ?? '');

    const [passportNumber, setPassportNumber] = React.useState(state.passportNumber ?? '');
    const [passportNumber2, setPassportNumber2] = React.useState(state.passportNumber2 ?? '');


    const [certificate, setCertificate] = React.useState(state.certificate ?? false);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);


    useEffect( () => {

      if (state.persons && state.persons.length > 0)
      {
        setSameAddress(true);
      }

    } , [state.persons])

    const certificateChanged = (event) => {
            setCertificate(event.target.checked);
            setState(state => ({...state, certificate: event.target.checked}));
        };



    const phoneChanged = (event) =>
    {
        setPhone(event.target.value);
        setState(state => ({...state, phone : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 6)
        {
          setState(state => ({...state, phoneError : false}));
        } 
    }

    const postCodeChanged = (event) =>
    {
        setPostCode(event.target.value);
        setState(state => ({...state, postCode : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 5)
        {
          setState(state => ({...state, postCodeError : false}));
        }
    }

    const addressChanged = (event) =>
    {
        setAddress(event.target.value);
        setState(state => ({...state, address : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 10)
        {
          setState(state => ({...state, addressError : false}));
        }
    }

    const notesChanged = (event) =>
    {
        setNotes(event.target.value);
        setState(state => ({...state, notes : event.target.value }));
    }

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


  return (
    <React.Fragment>

      {/* <AntiBodyComponent/> */}
      
      <PersonsBox/>

      {state.persons.length === 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Enter your Address 
          </Typography>
       }

      {state.persons.length > 0 &&
            <Typography className={classes.FormTitle} variant="h6" gutterBottom>
                Enter your Address 
            </Typography>
      }



  

      <Grid container spacing={3} alignItems="baseline">

      <Grid hidden={ !(state.persons && state.persons.length > 0)} item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl} 
            control={<Checkbox className={classes.formControl}  color="secondary" name="sameAddress" checked={sameAddress} onChange={sameAddressChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`Use the Same Address`} 
             </span>}
          />
        </Grid>


        <Grid item xs={12} md={6}>
             <TextField 
                        error={state.phoneError ? true : false}
                        disabled = {sameAddress}
                        required id="phone" label="Phone Number" 
                        fullWidth autoComplete="tel" 
                        value = {phone}
                        onChange = {phoneChanged} 
             />  
        </Grid>
        <Grid item xs={12} md={6}>
             <TextField 
                        error={state.postCodeError ? true : false}
                        disabled = {sameAddress}
                        required id="postCode" label="Postal Code" 
                        fullWidth autoComplete="postal-code"
                        value = {postCode}
                        onChange = {postCodeChanged} 
             />  
        </Grid>
        <Grid item xs={12}>
             <TextField 
                        error={state.addressError ? true : false}
                        required id="address" label="Address" 
                        disabled = {sameAddress}
                        multiline rowsMax={2} 
                        fullWidth autoComplete="street-address" 
                        value = {address}
                        onChange = {addressChanged} 
             />  
        </Grid>
        <Grid hidden="true" item xs={12}>
             <TextField 
                placeholder={`Must include flight date & flight time also If there's anything you want to tell the doctor beforehand, enter it here`} 
                id="notes"
                label="Notes (optional)" 
                helperText={`MUST include flight date & flight time`} 
                multiline rowsMax={2} rows={2} fullWidth autoComplete=""
                value = {notes}
                onChange = {notesChanged} 
            />  
        </Grid>

        <Grid  item xs={12}>

            <AntiBodyComponent/>
        </Grid>

        {/* <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl} 
            control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I also require a medical certificate signed by a doctor declaring me 'fit-to-fly'.`} 
             
             <span  style={{ fontSize: '1rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}>  + £50.00 </span> 

             </span>}
          />
        <div style={{paddingTop:"10px"}}>
        {'If your requirements make any mention of a passport number, you will need a certificate. Laboratories do not note passport numbers on their results. If you are going to Spain, you need a certificate.'}
        </div>
        </Grid>
        <Grid item xs={12} hidden={!certificate} >
             <TextField 
                        error={state.passportNumberError ? true : false}
                        required id="passport" label="Passport Number" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="" 
                        value = {passportNumber}
                        onChange = {passportNumberChanged} 
             />  
        </Grid>
        <Grid item xs={12} hidden={!certificate} >
             <TextField 
                        // error={state.passportNumberError ? true : false}
                        id="passport2" label="Second Passport Number (optional)" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="" 
                        value = {passportNumber2}
                        onChange = {passportNumberChanged2} 
             />  
        </Grid> */}
      </Grid>
    
      
    </React.Fragment>
  );
}

