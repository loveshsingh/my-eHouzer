import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import RegisterComponentStyle from "./RegisterComponent.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {emailSignupLogin, mobileSignupLogin} from "../../../../actions/login";
import {useDispatch} from "react-redux";
import AppCountryCodeSelector from "../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import OtpComponent from "../otpComponent/OtpComponent";
import {CONSTANTS} from "../../../adminComponents/constants/Constant";
import UserDetailsForm from "../userDetailsForm/UserDetailsForm";
import {regExpEmail, regExpNo, regExpNumber} from "../../../adminComponents/helpers/ValidationsRegEx";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const RegisterComponent = () => {

    const [isCredentialsForm, setIsCredentialsForm] = useState(true);
    const [isUserDetailsForm, setIsUserDetailsForm] = useState(false);
    const [isOtpForm, setIsOtpForm] = useState(false);
    const [activeLogin, setActiveLogin] = useState(CONSTANTS.EMAIL)
    const [emailId, setEmailId] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [isError, setIsError] = useState({
        emailId: '',
        contactNo: ''
    });
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'emailId') {
            setEmailId(value);
        } else {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (newValue.length > 10) {
                setContactNo(newValue.slice(0, 10));
            } else {
                setContactNo(newValue);
            }
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    const showOtpSection = () => {
        setIsOtpForm(!isOtpForm);
        setIsUserDetailsForm(!isUserDetailsForm);
    }

    const onSuccess = (isSuccess, response) => {
        if (response.code === 202) {
            // redirect to signup page (e.g. firstname lastname form)
            setIsCredentialsForm(false);
            setIsUserDetailsForm(true);

        } else if (response.code === 210 || response.code === 250) {
            // redirect to OTP page
            setIsCredentialsForm(false);
            setIsOtpForm(true);
        }
    }

    const onEmailLogin = (e) => {

        let newIsError = {...isError};
        newIsError.emailId = (emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(emailId)
                ? ''
                : 'Email address is invalid';


        setIsError(newIsError);
        if (newIsError.emailId === '') {
            dispatch(emailSignupLogin(emailId, onSuccess))
        }
    }

    const onPhoneLogin = async (e) => {
        let newIsError = {...isError};
        newIsError.contactNo = (contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        setIsError(newIsError);
        if (newIsError.contactNo === '') {
            // code to dispatch the hit
            dispatch(mobileSignupLogin(contactNo, onSuccess))
        }
    }

    return (
        <div className={RegisterComponentStyle["register"]}>
            <h1 className={RegisterComponentStyle["register__heading"]}>Register/Login</h1>
            <p className={RegisterComponentStyle["register__desc"]}>Get the best home buying experience with eHouzer</p>

            {/*Start login switch*/}
            {isCredentialsForm && (
                <div className={RegisterComponentStyle["register__switch"]}>
                    <div className={RegisterComponentStyle["register__switch-wrapper"]}>

                        <div
                            className={`${RegisterComponentStyle["register__switch-box"]} ${activeLogin === CONSTANTS.EMAIL ? RegisterComponentStyle["register__switch-box-active"] : ""}`}
                            onClick={() => setActiveLogin("email")}>
                            <p className={`${RegisterComponentStyle["register__switch-box-text"]} ${activeLogin === CONSTANTS.EMAIL ? RegisterComponentStyle["register__switch-box-text-active"] : ""}`}>Email
                                Login</p>
                        </div>

                        <div
                            className={`${RegisterComponentStyle["register__switch-box"]} ${activeLogin === CONSTANTS.MOBILE ? RegisterComponentStyle["register__switch-box-active"] : ""}`}
                            onClick={() => setActiveLogin("mobile")}>
                            <p className={`${RegisterComponentStyle["register__switch-box-text"]} ${activeLogin === CONSTANTS.MOBILE ? RegisterComponentStyle["register__switch-box-text-active"] : ""}`}>Mobile
                                Login</p>
                        </div>
                    </div>
                </div>
            )}

            {/*End login switch*/}

            {isCredentialsForm && (
                <div className={RegisterComponentStyle["register__inputs-wrapper"]}>

                    {/*Start email input*/}
                    {activeLogin === CONSTANTS.EMAIL && (
                        <div className={RegisterComponentStyle["register__inputs-container"]}>

                            <label className={RegisterComponentStyle["register__input-heading"]}>Email Address *</label>
                            <input type={"email"} className={RegisterComponentStyle["register__input"]}
                                   ref={inputRef}
                                   name="emailId"
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                           (activeLogin === CONSTANTS.EMAIL) ? onEmailLogin(e) : onPhoneLogin(e);
                                       }
                                   }}
                                   onChange={handleChange} placeholder={"Email address"}/>
                            {isError.emailId && (
                                <div
                                    className={`${RegisterComponentStyle["register__details-input-heading"]} ${RegisterComponentStyle["invalid__field"]}`}>{isError.emailId}</div>
                            )}
                        </div>
                    )}

                    {/*End email input*/}


                    {/*Start mobile number input*/}
                    {activeLogin === CONSTANTS.MOBILE && (
                        <div className={RegisterComponentStyle["register__inputs-container"]}
                             onChange={handleChange}>

                            <label className={RegisterComponentStyle["register__input-heading"]}>Mobile Number *</label>
                            <div className={RegisterComponentStyle['register__details-contact-wrapper']}>
                                <div className={RegisterComponentStyle["register__country-dropdown"]}>
                                    {/*<AppDropdown name={"+91"} nameStyle={""} icon={""} iconStyle={""} dropdownComponent={<></>}
                                         dropdownComponentStyle={""}/>*/}
                                    <AppIcon name={'twemoji:flag-india'}
                                             color={AppColors.roseGold} size={25}/>
                                    <span role="img" style={{
                                        fontSize: '0.9rem',
                                        color: '#545454',
                                        marginLeft: '0.3rem'
                                    }} aria-label="Indian Flag">+91 </span>

                                   {/* <AppCountryCodeSelector textStyle={{
                                        fontSize: '0.9rem',
                                        color: '#A3A3A3',
                                        marginLeft: '0.3rem'
                                    }}/>*/}
                                </div>
                                <input type={"text"} className={RegisterComponentStyle["register__input"]}
                                       name="contactNo"
                                       value={contactNo}
                                       onKeyDown={(e) => {
                                           if (e.key === 'Enter') {
                                               (activeLogin === CONSTANTS.EMAIL) ? onEmailLogin(e) : onPhoneLogin(e);
                                           }
                                       }}
                                       onChange={handleChange}
                                       placeholder={"Phone No."}/>
                            </div>

                            {isError.contactNo && (
                                <div
                                    className={`${RegisterComponentStyle["register__details-input-heading"]} ${RegisterComponentStyle["invalid__field"]}`}>{isError.contactNo}</div>
                            )}

                        </div>
                    )}

                    {/*End mobile number input*/}

                    <div className={RegisterComponentStyle["register__button-wrapper"]}>
                        <AppRoundButton onClick={(activeLogin === CONSTANTS.EMAIL) ? onEmailLogin : onPhoneLogin}
                                        buttonText={"Continue"}
                                        buttonStyle={RegisterComponentStyle["register__button"]}
                                        type={"primary"}/>
                    </div>
                </div>
            )}


            {/*Start UserDetails form*/}
            {isUserDetailsForm && (
                <div className={RegisterComponentStyle["register__inputs-wrapper"]}>
                    <UserDetailsForm activeLogin={activeLogin} emailId={emailId} isShowOtpSection={showOtpSection}
                                     contactNo={contactNo}/>
                </div>
            )}
            {/*End UserDetails form*/}

            {/*Start OTP section*/}
            {isOtpForm && (
                <div className={RegisterComponentStyle["register__inputs-wrapper"]}>
                    <OtpComponent activeLogin={activeLogin} emailId={emailId} contactNo={contactNo}/>
                </div>
            )}
            {/*End OTP section*/}

        </div>
    )
}

export default RegisterComponent;
