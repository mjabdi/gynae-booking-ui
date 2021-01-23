import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Icon from '@material-ui/core/Icon';
import dateformat from 'dateformat';

import {calculatePrice, calculateTotalPrice} from './PriceCalculator';

import ValidateStep from './Validation';
import { FormatDateFromString } from './DateFormatter';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor : "#444",
    color: "#fff",
    padding : "8px",
    borderRadius : "4px",
    textAlign: "justify",
    // paddingRight: "40px"
  },

  boxRed: {
    backgroundColor : "#dc2626",
    color: "#fff",
    padding : "1px",
    borderRadius : "4px",
    textAlign: "justify",
    paddingRight: "40px"
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor : "#fafafa",
    color: "#333",
    // padding : "1px",
    borderRadius : "4px",
    // paddingRight: "40px",
    border: "1px solid #eee",
  },


  

  ul: {
     listStyle: "none",
     padding: "0",
     margin: "0"
  },

  li: {
    marginBottom : "5px"
  },


  icon: {
    marginRight : "8px"
  },

  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails:{
    textAlign: "left"
  },

  infoTitle:{
    fontWeight: "800",
    marginRight: "10px"
  },

  infoData:{
    fontWeight: "400",
  },

  title:
  {
    textAlign : "left",
    fontWeight : "500",
    // marginBottom: "5px",
    marginTop: "5px",
    padding : "10px",
    borderRadius : "4px"

  },

  Accordion:{
    backgroundColor : "#f5f5f5",
    color: "#111"
  },

  terms: {
    fontWeight: "500",
    textAlign: "justify",
    marginTop: "10px",
    padding: "10px",
  },

  link:{
    color: "#dc2626",
    textDecoration: "none",
  },

  AddAnother:{
    marginTop: "10px",
    marginBottom: "10px",
  }

}));


export default function ReviewForm() {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);

    const [totalPrice, setTotalPrice] =  React.useState(0);

    const [expanded, setExpanded] = React.useState('panel10');

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const dataConfirmedChanged = (event) =>
    {
      setState(state => ({...state, dataConfirmed : event.target.checked }));
      if (event.target.checked)
      {
        setState(state => ({...state, dataConfirmedError : false }));
      }
    }

    useEffect( () => {
      
      var total = 0;
      
      if (!state.proceedToSubmit)
      {
        total += calculatePrice(state);
      }

      if (state.persons)
      {
        total += calculateTotalPrice(state.persons);
      }

      setTotalPrice(total);


    }, [...state.persons, state]);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const addAnotherPerson = () => {

      if (ValidateStep(state, setState, 2) && ValidateStep(state, setState, 3))
      {

        const personInfo = {
          gender: state.gender,
          title: state.title,
          firstname: state.firstname,
          lastname: state.lastname,
          birthDate: state.birthDate,
          email: state.email,
          phone: state.phone,
          postCode: state.postCode,
          address: state.address,
          notes: state.notes,
          certificate: state.certificate ?? false,
          passportNumber: state.passportNumber,
          passportNumber2: state.passportNumber2,
          antiBodyTest: state.antiBodyTest ?? false
        }
          var newPersons = state.persons;
          newPersons.push(personInfo);
          setState(state => ({activeStep: 2, 
            getStarted: true,
            agreed : true,
            bookingDate: state.bookingDate, 
            bookingTime: state.bookingTime,
            address: state.address,
            phone: state.phone,
            postCode: state.postCode,
            persons: newPersons
          }));       
      }else {
        setState(state => ({...state, activeStep : 2 }));
      }

  }
  
   

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Your Data
      </Typography>

      <Grid container direction="column" spacing={1} justify="flex-start"  alignItems="stretch">

          <div className={classes.title}> Appointment is for the following people :</div>

          {state.persons.map((person,index) => (
   
                  <Grid item xs={12} md={12}>
                  <div className={classes.root}>
                      <Accordion className={classes.Accordion} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id={`panel${index}bh-header`}
                      >
                          <Typography className={classes.heading}> {`#${index+1}`} </Typography>
                          <Typography className={classes.secondaryHeading}>
                          {`${person.firstname} ${person.lastname}`}
                          </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.infoDetails}>
                          
                          <ul className={classes.ul}>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Gender</span> <span className={classes.infoData}>{person.gender}</span>   
                              </li>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Title</span>  <span className={classes.infoData}>{person.title}</span>   
                              </li>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Forename</span> <span className={classes.infoData}>{person.firstname}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Surname</span> <span className={classes.infoData}>{person.lastname}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Email</span> <span className={classes.infoData}>{person.email}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>D.O.B</span> <span className={classes.infoData}>{FormatDateFromString(person.birthDate)}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Telephone</span> <span className={classes.infoData}>{person.phone}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Post Code</span> <span className={classes.infoData}>{person.postCode}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Address</span> <span className={classes.infoData}>{person.address}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Passport No.</span> <span className={classes.infoData}>{person.passportNumber ?? 'N/A'}</span>  
                              </li>
                              <li className={classes.li} hidden={!person.passportNumber2 || person.passportNumber2.length === 0}>
                                <span className={classes.infoTitle}>Second Passport No.</span> <span className={classes.infoData}>{person.passportNumber2 ?? 'N/A'}</span>  
                            </li>

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Request for Certificate</span> <span className={classes.infoData}>{person.certificate ? 'Yes' : 'No'}</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Request for Antibody Test</span> <span className={classes.infoData}>{person.antiBodyTest ? 'Yes' : 'No'}</span>  
                            </li>

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Price</span> <span className={classes.infoData}>{`£${calculatePrice(person)}`}</span>  
                            </li>

                          </ul>
                          
                          </AccordionDetails>
                          </Accordion>
                      </div>
                    </Grid> 
                    ))}

            { (!state.proceedToSubmit) && 
                      <Grid item xs={12} md={12}>
                      <div className={classes.root}>
                          <Accordion className={classes.Accordion} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel10bh-content"
                              id="panel10bh-header"
                            >
                              <Typography className={classes.heading}> {`#${state.persons.length + 1}`} </Typography>
                              <Typography className={classes.secondaryHeading}>
                                {`${state.firstname} ${state.lastname}`}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.infoDetails}>
                              
                                <ul className={classes.ul}>
                                  <li className={classes.li}>
                                    <span className={classes.infoTitle}>Gender</span> <span className={classes.infoData}>{state.gender}</span>   
                                  </li>
                                  <li className={classes.li}>
                                    <span className={classes.infoTitle}>Title</span>  <span className={classes.infoData}>{state.title}</span>   
                                  </li>
                                  <li className={classes.li}>
                                    <span className={classes.infoTitle}>Forename</span> <span className={classes.infoData}>{state.firstname}</span>   
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Surname</span> <span className={classes.infoData}>{state.lastname}</span>   
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Email</span> <span className={classes.infoData}>{state.email}</span>   
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>D.O.B</span> <span className={classes.infoData}>{FormatDateFromString(state.birthDate)} </span>  
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Telephone</span> <span className={classes.infoData}>{state.phone}</span>  
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Post Code</span> <span className={classes.infoData}>{state.postCode}</span>  
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Address</span> <span className={classes.infoData}>{state.address}</span>  
                                  </li>
                                  <li className={classes.li}>
                                     <span className={classes.infoTitle}>Passport No.</span> <span className={classes.infoData}>{state.passportNumber ?? 'N/A'}</span>  
                                  </li>
                                  <li className={classes.li} hidden={!state.passportNumber2 || state.passportNumber2.length === 0}>
                                      <span className={classes.infoTitle}>Second Passport No.</span> <span className={classes.infoData}>{state.passportNumber2 ?? 'N/A'}</span>  
                                  </li>

                                  <li className={classes.li}>
                                    <span className={classes.infoTitle}>Request for Certificate</span> <span className={classes.infoData}>{state.certificate ? 'Yes' : 'No'}</span>  
                                </li>
                                <li className={classes.li}>
                                    <span className={classes.infoTitle}>Request for Antibody Test</span> <span className={classes.infoData}>{state.antiBodyTest? 'Yes' : 'No'}</span>  
                                </li>

                                <li className={classes.li}>
                                  <span className={classes.infoTitle}>Price</span> <span className={classes.infoData}>{`£${calculatePrice(state)}`}</span>  
                               </li>
                                  
                                </ul>
                              
                            </AccordionDetails>
                          </Accordion>
                        </div>
                  </Grid> 
               }
                  {(!state.persons || (state.persons && state.persons.length < 4)) && (

                    <div className={classes.AddAnother}>
                          <Button 
                                  variant="contained"
                                  startIcon={<PersonAddIcon />}
                                  color="secondary"
                                  onTouchTap = {addAnotherPerson} 
                                  onClick={addAnotherPerson} className={classes.button}>
                            Add Another Person
                          </Button>
                    </div>
 
                  )}



          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faCalendarAlt} className={classes.icon} />
                    { dateformat(new Date(state.bookingDate.toUTCString().slice(0, -4)),'dd/mm/yyyy')}
                </li>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faHourglassHalf} className={classes.icon} />
                   Check-up Duration: 5 minutes
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faClock} className={classes.icon} />
                   Time: {state.bookingTime}
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                    Package : In-Clinic Test
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                   Total Price : {`£${totalPrice}`}
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                In order to aid social distancing during the coronavirus pandemic, there may be a slight delay to your appointment time. Thank you for understanding.
                </li>
              </ul>
            </div>
          </Grid> 

        
        <div className={classes.terms}>
            By clicking on submit button you are agreeing with our <a className={classes.link}  target="_blank" href="https://www.medicalexpressclinic.co.uk/terms-and-conditions">terms and condition.</a> 
        </div>

        <div style={{textAlign:"left", color: "#111", marginLeft:"10px"}}>
        <FormControlLabel className={classes.formControl}  style={ {color: state.dataConfirmedError ? "red" : ''}} 
            control={<Checkbox className={classes.formControl} style={ {color: state.dataConfirmedError ? "red" : ''}} 
             color="secondary" name="emailConfirmCheckBox" checked={state.dataConfirmed} onChange={dataConfirmedChanged} />}
             label={<span style={{ fontSize: '0.9rem' , fontWeight:"500"}}>{`I confirm that the details in this form are correct, and I am happy for them to appear as written above on my results and certificate if ordered.`} </span>}
             />
        </div>

    
      </Grid>
    </React.Fragment>
  );
}

