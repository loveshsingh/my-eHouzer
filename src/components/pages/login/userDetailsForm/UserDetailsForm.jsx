import React, {useRef, useState} from "react";
import userDetailsFormStyle from "./UserDetailsForm.module.css"
import AppCountryCodeSelector from "../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import {regExpEmail, regExpName, regExpNo, regExpNumber} from "../../../adminComponents/helpers/ValidationsRegEx";
import RegisterComponentStyle from "../registerComponent/RegisterComponent.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {setUserDetails} from "../../../../actions/adminActions";
import {useDispatch} from "react-redux";
import {emailSignup, mobileSignup} from "../../../../actions/login";
import {CONSTANTS} from "../../../adminComponents/constants/Constant";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";

/**
 * @author Vikrant
 * @since 18-04-2023
 * @description to register user details for login
 * @returns {JSX.Element}
 * @constructor
 */
const UserDetailsForm = ({activeLogin, emailId, isShowOtpSection, contactNo}) => {
    const userDetailsInitialState = {
        firstName: '',
        lastName: '',
        emailId: emailId ?? '',
        contactNo: contactNo ?? '',
    }
    const dispatch = useDispatch();
    const [userFormData, setUserFormData] = useState(userDetailsInitialState)

    const userFormDataTemp = useRef(userDetailsInitialState)
    const [isError, setIsError] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
    })

    // Within your component:
    const style = {
        opacity: userFormData.emailId ? 0.6 : 1,
        background: "lightgrey",
    };


    /**
     * @author Vikrant
     * @since 18-04-2023
     * @description to handle input values at onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (newValue.length > 10) {
                setUserFormData({...userFormData, [name]: newValue.slice(0, 10)});
            } else {
                setUserFormData({...userFormData, [name]: newValue});
            }
        } else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setUserFormData({...userFormData, [name]: newValue});
        } else {
            setUserFormData({...userFormData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }

    };

    const formValidation = () => {
        let newIsError = {...isError};
        newIsError.firstName = userFormData.firstName ? '' : 'This field Required*';
        newIsError.lastName = userFormData.lastName ? '' : 'This field Required*';

        // newIsError.emailId = rmFormData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (userFormData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(userFormData.emailId)
                ? ''
                : 'Email address is invalid';


        // newIsError.contactNo = rmFormData.contactNo ? '' : 'This field Required*';
        newIsError.contactNo = (userFormData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(userFormData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        setIsError(newIsError);

        if ((newIsError.firstName === '')
            && (newIsError.lastName === '')
            && (newIsError.emailId === '')
            && (newIsError.contactNo === '')) {
            if (activeLogin === CONSTANTS.EMAIL) {
                dispatch(emailSignup(userFormData, onSuccess))
            } else {
                dispatch(mobileSignup(userFormData, onSuccess))
            }
        }
    }

    /**
     * @author Vikrant
     * @since 18-04-2023
     * @description to handle success response
     * @param isSuccess
     * @param response
     */
    const onSuccess = (isSuccess, response) => {

        /*if (response.code === 209) {
            // setUserFormData(userDetailsInitialState);
        } else */
        if (response.code === 250) {
            dispatch(setUserDetails(userFormData))
            isShowOtpSection();
        }
    }


    /**
     * @author Vikrant
     * @since 18-04-2023
     * @description to register user
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    };

    return (
        <div>
            <div className={userDetailsFormStyle["user__details-inputs-container"]}>

                {/*Start email form field*/}
                <label className={userDetailsFormStyle["user__details-input-heading"]}>Email Address *</label>
                <input type={"email"} className={userDetailsFormStyle["user__details-input"]}
                       name={"emailId"}
                       value={userFormData.emailId}
                       disabled={activeLogin === CONSTANTS.EMAIL}
                       style={activeLogin === CONSTANTS.EMAIL ? style : null}
                       onChange={handleChange} placeholder={"Email address"}/>
                {isError.emailId && (
                    <div
                        className={`${userDetailsFormStyle["user__details-input-heading"]} ${userDetailsFormStyle["invalid__field"]}`}>{isError.emailId}</div>
                )}

                {/*End email form field*/}

                {/*Start mobile form field*/}
                <label className={userDetailsFormStyle["user__details-input-heading"]}>Mobile Number *</label>
                <div className={userDetailsFormStyle['user__details-contact-wrapper']}>
                    <div className={userDetailsFormStyle["user__details-country-dropdown"]}>
                        {/* <AppDropdown name={"+91"} nameStyle={""} icon={""} iconStyle={""} dropdownComponent={<></>}
                                     dropdownComponentStyle={""}/>*/}
                        {/* <AppCountryCodeSelector textStyle={{
                            fontSize: '0.9rem',
                            color: '#A3A3A3',
                            marginLeft: '0.3rem'
                        }}/>*/}

                        <AppIcon name={'twemoji:flag-india'}
                                 color={AppColors.roseGold} size={28}/>
                        <span role="img" style={{
                            fontSize: '0.9rem',
                            marginLeft: '0.3rem'
                        }} aria-label="Indian Flag">+91 </span>
                    </div>
                    <input type={"text"} className={userDetailsFormStyle["user__details-input"]}
                           name={"contactNo"}
                           value={userFormData.contactNo}
                           disabled={activeLogin === CONSTANTS.MOBILE}
                           style={activeLogin === CONSTANTS.MOBILE ? style : null}
                           maxLength={10}
                           onChange={handleChange}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   handleSubmit(e);
                               }
                           }}
                           placeholder={"Phone No."}/>

                </div>
                {isError.contactNo && (
                    <div
                        className={`${userDetailsFormStyle["user__details-input-heading"]} ${userDetailsFormStyle["invalid__field"]}`}>{isError.contactNo}</div>
                )}
                {/*End mobile form field*/}

                {/*Start firstname form field*/}
                <input type={"text"} className={userDetailsFormStyle["user__details-input"]}
                       name={"firstName"}
                       value={userFormData.firstName}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               handleSubmit(e);
                           }
                       }}
                       onChange={handleChange} placeholder={"Firstname"}/>
                {isError.firstName && (
                    <div
                        className={`${userDetailsFormStyle["user__details-input-heading"]} ${userDetailsFormStyle["invalid__field"]}`}>{isError.firstName}</div>
                )}
                {/*End firstname form field*/}

                {/*Start lastname form field*/}
                <input type={"text"} className={userDetailsFormStyle["user__details-input"]}
                       name={"lastName"}
                       value={userFormData.lastName}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               handleSubmit(e);
                           }
                       }}
                       onChange={handleChange} placeholder={"Lastname"}/>
                {isError.lastName && (
                    <div
                        className={`${userDetailsFormStyle["user__details-input-heading"]} ${userDetailsFormStyle["invalid__field"]}`}>{isError.lastName}</div>
                )}
                {/*End lastname form field*/}

            </div>
            <div className={RegisterComponentStyle["register__button-wrapper"]}>
                <AppRoundButton onClick={handleSubmit} buttonText={"Continue"}
                                buttonStyle={RegisterComponentStyle["register__button"]}
                                type={"primary"}/>
            </div>
        </div>
    )
}

export default UserDetailsForm;
