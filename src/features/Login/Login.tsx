import React from "react";
import { useFormik } from 'formik';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "./auth-reducer";
import { AppRootStateType } from "../../app/store";
import { Redirect } from "react-router-dom";

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const formik = useFormik({
        validate: values => {
            if(!values.email){
                return {
                    email: "Email is required!"
                }
            }
            if(!values.password) {
                return {
                    password: "Password is required!"
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
           dispatch(loginTC(values))
        },
    });

    if(isLoggedIn){
        return <Redirect to={"/"}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel></FormLabel>
                    <FormGroup>
                        <TextField label="email" margin="normal" {...formik.getFieldProps("email")}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type={"password"} label="Password"
                                   margin="normal" {...formik.getFieldProps("password")}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={"rememberMe"} control={<Checkbox name={"rememberMe"}
                                                                                  {...formik.getFieldProps("rememberMe")}/>}/>
                        < Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};