import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import OtpComponentStyle from "./OtpComponent.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {verifyEmailLogin, verifyEmailSignup, verifyMobileLogin, verifyMobileSignup} from "../../../../actions/login";
import {useRouter} from "next/router";
import {CONSTANTS} from "../../../adminComponents/constants/Constant";


/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const OtpComponent = ({activeLogin, emailId, contactNo}) => {
    const [encryptedEmail, setEncryptedEmail] = useState("");
    const [encryptedMobile, setEncryptedMobile] = useState("");
    const {userDetailsForm} = useSelector(((state) => state.adminReducer));
    console.log("inside OTP components", emailId)
    const dispatch = useDispatch();
    const router = useRouter();
    const inputRef = useRef(null);

    const [inputStates, setInputStates] = useState({
        value: '',
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
        disable: false,
    });


    const handleChange = (value, event) => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            const inputValue = event.target.value.slice(0, 1); // Splice the value to keep only the first digit
            setInputStates({
                ...inputStates,
                [value]: inputValue,
            });
        }
    };

    const inputFocus = (elem) => {
        console.log("element: ", elem)
        if (elem.key === "Delete" || elem.key === "Backspace") {
            const next = elem.target.tabIndex - 2;
            if (next > -1) {
                elem.target.form.elements[next].focus()
            }
        } else {
            console.log("next");
            const next = elem.target.tabIndex;
            if (next < 4) {
                elem.target.form.elements[next].focus()
            }
        }
    }

    const encryptEmail = () => {
        const emailParts = emailId.split("@");
        const encryptedEmail = `${emailParts[0].slice(0, 3)}*****@${emailParts[1]}`;
        setEncryptedEmail(encryptedEmail);
    }
    const encryptMobile = () => {
        const encryptedPart = contactNo.slice(2, 8).replace(/\d/g, "*");
        const maskedNumber = contactNo.slice(0, 2) + encryptedPart + contactNo.slice(8);
        setEncryptedMobile(maskedNumber);
    }

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        encryptEmail();
    }, [emailId])

    useEffect(() => {
        encryptMobile();
    }, [contactNo])

    const onSuccess = (isSuccess, userDetails, response) => {
        // redirect to home page or main page
        console.log("otp success...")

        if (isSuccess) {

            if (userDetails.userRoleList[0].name === 'CUSTOMER') {
                router.replace("/").then(() => router.push('/'));
            }
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

            // messageHandlerToast(TOAST_MESSAGES.SUCCESS, response?.message);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const Otp = inputStates.otp1 + inputStates.otp2 + inputStates.otp3 + inputStates.otp4;
        if (Object.keys(userDetailsForm).length > 0) {
            if (activeLogin === CONSTANTS.EMAIL) {
                dispatch(verifyEmailSignup({
                    firstName: userDetailsForm?.firstName,
                    lastName: userDetailsForm?.lastName,
                    contactNo: userDetailsForm?.contactNo,
                    emailId: userDetailsForm?.emailId, Otp
                }, onSuccess))
            } else {
                dispatch(verifyMobileSignup({
                    firstName: userDetailsForm?.firstName,
                    lastName: userDetailsForm?.lastName,
                    contactNo: userDetailsForm?.contactNo,
                    emailId: userDetailsForm?.emailId, Otp
                }, onSuccess))
            }
        } else {
            if (activeLogin === CONSTANTS.EMAIL) {
                dispatch(verifyEmailLogin({emailId, Otp}, onSuccess))
            } else {
                dispatch(verifyMobileLogin({contactNo, Otp}, onSuccess))
            }
        }
    }

    return (
        <div className={OtpComponentStyle["otp"]}>

            <h1 className={OtpComponentStyle["otp__heading"]}>Enter OTP</h1>
            <p className={OtpComponentStyle["otp__info"]}>Please check the OTP sent to {activeLogin}</p>

            <p className={OtpComponentStyle["otp__info-number"]}>{activeLogin === CONSTANTS.EMAIL ? encryptedEmail : encryptedMobile}</p>

            <div className={OtpComponentStyle["otp__inputs-wrapper"]}>
                <form className={OtpComponentStyle["otp__inputs-container"]}>
                    <input
                        ref={inputRef}
                        name="otp1"
                        type="number"
                        autoComplete="off"
                        tabIndex={1}
                        maxLength={1}
                        value={inputStates.otp1}
                        onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                        pattern={'[0-9]{1}'}
                        onChange={e => handleChange("otp1", e)}
                        onKeyUp={e => inputFocus(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        className={OtpComponentStyle["otp__input"]}
                    />
                    <input
                        name="otp2"
                        type="number"
                        autoComplete="off"
                        tabIndex={2}
                        maxLength={1}
                        value={inputStates.otp2}
                        onChange={e => handleChange("otp2", e)}
                        onKeyUp={e => inputFocus(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        className={OtpComponentStyle["otp__input"]}
                    />
                    <input
                        name="otp3"
                        type="number"
                        autoComplete="off"
                        tabIndex={3}
                        maxLength={1}
                        value={inputStates.otp3}
                        onChange={e => handleChange("otp3", e)}
                        onKeyUp={e => inputFocus(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        className={OtpComponentStyle["otp__input"]}
                    />
                    <input
                        name="otp4"
                        type="number"
                        autoComplete="off"
                        tabIndex={4}
                        maxLength={1}
                        value={inputStates.otp4}
                        onChange={e => handleChange("otp4", e)}
                        onKeyUp={e => inputFocus(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        className={OtpComponentStyle["otp__input"]}
                    />

                    {/*<p className={OtpComponentStyle["otp__time"]}>00:30s</p>*/}
                </form>
                <p className={OtpComponentStyle["otp__validation-text"]}>Invalid OTP. Please try again</p>
                <div className={OtpComponentStyle["otp__button-wrapper"]}>
                    <AppRoundButton buttonText={"Continue"} buttonStyle={OtpComponentStyle["otp__button"]}
                                    type={"primary"} onClick={handleSubmit
                    }/>
                </div>
            </div>
        </div>
    )
}

export default OtpComponent;
