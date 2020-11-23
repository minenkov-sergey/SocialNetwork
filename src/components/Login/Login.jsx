import React from 'react';
import styles from './Login.module.css'
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormComponents/FormComponents';
import { connect } from 'react-redux';
import { loginTC } from '../../Redux/auth-Reducer';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'email',
        'password',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const Login = (props) => {


    const onSubmit = (formdata) => {
        props.loginTC(formdata.email, formdata.password, formdata.rememberMe, formdata.captcha)
    }
    if (props.isLogged) return <Redirect to={'/profile'} />
    return (

        <div>
            <SignInReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isLogged: state.authData.isLogged,
    captchaUrl: state.authData.captchaUrl
})

export default connect(mapStateToProps, { loginTC })(Login);

const SignIn = (props) => {
    const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom
    }) => (<TextField label={label} placeholder={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />)

    const renderCheckbox = ({ input, label }) => (
        <div>
            <FormControlLabel
                control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} />}
                label={label}
            />
        </div>
    )

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={styles.form} noValidate={false} onSubmit={props.handleSubmit} >
                    <Field
                        component={renderTextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <Field
                        component={renderTextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        component={renderCheckbox}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <div className={styles.errorBox}>
                        {props.error}
                    </div>
                    {props.captchaUrl && <img src={props.captchaUrl} alt={''} />}
                    {props.captchaUrl && <Field name='captcha' component={Input} placeholder='enter captcha' type='text' />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}>
                        Sign In
                    </Button>
                    <Grid container className={styles.gridCont}>
                        <Grid item xs>
                            <Link href="https://social-network.samuraijs.com/login" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="https://social-network.samuraijs.com/signUp" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const SignInReduxForm = reduxForm({
    form: 'loginForm',
    validate
})(SignIn)