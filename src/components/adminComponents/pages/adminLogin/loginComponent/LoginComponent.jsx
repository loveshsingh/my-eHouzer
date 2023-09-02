import * as React from 'react'
import {useEffect, useState} from 'react'
import loginComponentStyles from "./LoginComponent.module.css";
// import AppRoundButton from "../../../lib/AppRoundButton";
// import {login} from "../../../../actions/login";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import AppRoundButton from "../../../../lib/AppRoundButton";
import {login} from "../../../../../actions/login";
import {TOAST_MESSAGES} from "../../../constants/Constant";
import {messageHandlerToast} from "../../../../../helper/Utility";


/**
 * @author Vikrant
 * @since 04-03-2022.
 * @description to render top Admin tab.
 * @return {JSX.Element}
 */
const LoginComponent = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            onLoginSuccess(isLoggedIn, userDetails);
        }
    }, [])

    const onPressLogin = async (e) => {
        e.preventDefault();
        const data = {
            userId: userName,
            password: password
        }

        /*  if (userName != '' && password != '') {
              dispatch(login(JSON.stringify(data), (value) => {
                  if (value) {
                      router.push("/profile")
                  }
              }))
          }*/
        if (userName !== '' && password !== '') {
            dispatch(login(JSON.stringify(data), onLoginSuccess))
        }
    }

    const onLoginSuccess = (isLogged, userDetails, response) => {
        if (isLogged) {
            if (userDetails.userRoleList[0].name === 'ADMIN') {
                router.push("/admin").then();
            }
            if (userDetails.userRoleList[0].name === 'RM') {
                // router.replace("/admin/rm").then(() => router.reload());
                router.push("/admin/rm").then(() => {
                });
            }
            if (userDetails.userRoleList[0].name === 'CE') {
                router.push("/admin/ce").then(() => {
                });
            }
            /* if (userDetails.userRoleList[0].name === 'CUSTOMER') {
                 router.replace("/builder").then(() => router.reload());
             }*/
            if (userDetails.userRoleList[0].name === 'DEVELOPER') {
                router.push("/admin/builder").then(() => {
                });
            }
            if (userDetails.userRoleList[0].name === 'AGENT') {
                router.push("/admin/agent").then(() => {
                });
            }
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, response?.message);
        }
    }

    return (
        <div className={loginComponentStyles["login"]}>

            <h1 className={loginComponentStyles["login__heading"]}>Login</h1>
            <p className={loginComponentStyles["login__desc"]}>Get the best home buying experience with
                eHouzer</p>

            <form className={loginComponentStyles["login__inputs-wrapper"]}>
                <div className={loginComponentStyles["login__inputs-container"]}>

                    <input type={"text"} className={loginComponentStyles["login__input"]}
                           onChange={e => setUserName(e.target.value)} placeholder={"UserName"}/>
                    <input type={"text"} className={loginComponentStyles["login__input"]}
                           onChange={e => setPassword(e.target.value)} placeholder={"Password"}/>
                </div>

                <div className={loginComponentStyles["login__button-wrapper"]}>
                    <AppRoundButton onClick={onPressLogin} buttonText={"Continue"}
                                    buttonStyle={loginComponentStyles["login__button"]}
                                    type={"primary"}/>
                </div>
            </form>

        </div>
    )
}

export default LoginComponent;


