import * as EmailValidator from 'email-validator';

export default function ValidateStep (state,setState, step) 
  {
    var error = false;

    if (step === 0)
    {
      if (!state.bookingDate || !state.bookingDate.getTime())
      {
        setState(state => ({...state, bookingDateError : true}));
        error = true;
      }
    }
    if (step === 1)
    {
      /// Validate time
      
      if (!state.bookingTime)
      {
        setState(state => ({...state, bookingTimeError : true}));
        error = true;
      }
    } else if (step === 2){
      ///validate Basic Info
      if (!state.gender)
      {
        setState(state => ({...state, genderError : true}));
        error = true;
      }
      if (!state.title)
      {
        setState(state => ({...state, titleError : true}));
        error = true;
      }
      if (!state.firstname || state.firstname.trim().length < 1)
      {
        setState(state => ({...state, firstnameError : true}));
        error = true;
      }
      if (!state.lastname || state.lastname.trim().length < 1)
      {
        setState(state => ({...state, lastnameError : true}));
        error = true;
      }
      if (!state.birthDate || state.birthDate.length !== 10)
      {
        setState(state => ({...state, birthDateError : true}));
        error = true;
      }
      if (!state.email || !EmailValidator.validate(state.email))
      {
        setState(state => ({...state, emailError : true}));
        error = true;
      }

      if (!state.retypeEmail || !EmailValidator.validate(state.retypeEmail) || state.email !== state.retypeEmail)
      {
        setState(state => ({...state, retypeEmailError : true}));
        error = true;
      }

      if (!state.emailConfirmed)
      {
        setState(state => ({...state, emailConfirmedError : true}));
        error = true;
      }

      if (state.certificate && (!state.passportNumber || state.passportNumber.trim().length < 6))
      {
        setState(state => ({...state, passportNumberError : true}));
        error = true;
      }

    }
    else if (step === 3){
      ///validate Address Info
      if (!state.phone || state.phone.trim().length < 6)
      {
        setState(state => ({...state, phoneError : true}));
        error = true;
      }
      if (!state.postCode || state.postCode.trim().length < 5)
      {
        setState(state => ({...state, postCodeError : true}));
        error = true;
      }
      if (!state.address || state.address.trim().length < 10)
      {
        setState(state => ({...state, addressError : true}));
        error = true;
      }    
      // if (state.certificate && (!state.passportNumber || state.passportNumber.trim().length < 6))
      // {
      //   setState(state => ({...state, passportNumberError : true}));
      //   error = true;
      // }

      if (!error){
        setState(state => ({...state, proceedToSubmit: false}));
      }
    }

      return !error;   
  }