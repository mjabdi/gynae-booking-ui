import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GlobalState from "./GlobalState";
import PaymentForm from "./PaymentForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import dateformat from "dateformat";
import { Backdrop } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "justify",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  boxTitle: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "10px",
    top: -20,
    left: 10,
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  boxTime: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#333",
    padding: "30px 30px 0px 20px",
    textAlign: "left",
    marginTop: "20px",
    position: "relative",
  },
}));

export default function PayForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [loaded, setLoaded] = React.useState(false);
  const [personInfo, setPersonInfo] = React.useState(null);
  const [submiting, setSubmitting] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
       setLoaded(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);

    loadPersonInfo();
  }, []);

  const loadPersonInfo = () => {
    let referrer = window.location.pathname;
    if (referrer && referrer.startsWith("/id")) {
      referrer = "/";
    }

    const _personInfo = {
      fullname: state.fullname,
      email: state.email,
      phone: state.phone,
      notes: state.notes,
      service: state.package,
      bookingDate: dateformat(
        new Date(state.bookingDate.toUTCString().slice(0, -4)),
        "yyyy-mm-dd"
      ),
      bookingTime: state.bookingTime,
      bookingRef: state.bookingRef,
      referrer: referrer,
    };

    setPersonInfo(_personInfo);
  };

  const onComplete = (res) => {
    setState((state) => ({ ...state, finalResults: [res] }));
    setState((state) => ({ ...state, activeStep: state.activeStep + 1 }));
    setSubmitting(false);
  };

  const onError = (err) => {
    console.log(err);
    setSubmitting(false);
  };

  const onStart = () => {
    setSubmitting(true);
  };

  return (
    <React.Fragment>
      <Typography
        className={classes.pageTitle}
        variant="h6"
        gutterBottom
        style={{ marginBottom: "30px" }}
      >
        Pay Deposit
      </Typography>

      {(!loaded || !personInfo) && (
        <React.Fragment>
          {" "}
          <CircularProgress color="primary" />
        </React.Fragment>
      )}

      {personInfo && (
        <div hidden={!loaded}>

          <div>

            <Alert severity="info" style={{marginBottom:"15px", fontSize:"0.95rem" ,lineHeight:"1.5rem", textAlign:"justify"}}>
            This is the deposit to secure your appointment, you can cancel anytime up-to 24 hours of your appointment.

            </Alert>

          </div>

          <div className={classes.boxTime}>
          <div className={classes.boxTitle}>Card Info</div>
            <PaymentForm
              personInfo={personInfo}
              onStart={onStart}
              onComplete={onComplete}
              onError={onError}
            />
          </div>

        
        </div>
      )}

      <Backdrop className={classes.backdrop} open={submiting}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid item>
            <span style={{ textAlign: "center", color: "#fff" }}>
              {" "}
              Please wait ...{" "}
            </span>
          </Grid>
        </Grid>
      </Backdrop>
    </React.Fragment>
  );
}
