import * as React from "react";
import {useState} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import contactStyle from "../styles/componentStyles/contactStyles/Contact.module.css";
import AppRoundButton from "../components/lib/AppRoundButton";
import 'react-phone-number-input/style.css'
import {AppColors} from "../public/AppColors";
import AppIcon from "../components/lib/AppIcon/AppIcon";
import {regExpEmail, regExpNo, regExpNumber} from "../components/adminComponents/helpers/ValidationsRegEx";
import {UserApiService} from "../services/UserApiService";
import {messageHandlerToast} from "../helper/Utility";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";


const regionNames = new Intl.DisplayNames(
    ['en'],
    {type: 'region'}
);

export default function Contact() {
    const initialContactData = {
        name: '',
        emailId: '',
        contactNo: '',
        query: ''
    }
    const [contactData, setContactData] = useState(initialContactData)
    const [isError, setIsError] = useState(initialContactData);

    const formValidation = () => {
        let newIsError = {...isError};
        newIsError.name = contactData.name ? '' : 'This field Required*';
        newIsError.emailId = (contactData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(contactData.emailId)
                ? ''
                : 'Email address is invalid';
        newIsError.contactNo = (contactData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(contactData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';
        setIsError(newIsError);
        if (newIsError.name === ''
            && (newIsError.emailId === '')
            && (newIsError.contactNo === '')) {

            // API call here to submit details
            UserApiService.contact(contactData).then(res => {
                if (res.code === 200) {
                    messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
                    setContactData(initialContactData);
                }
            }).catch((err) => {
                const errorMsg = err.message
                messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
                // dispatch(error(errorMsg))
            })
        }
    }

    const formValChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (newValue.length > 10) {
                setContactData({...contactData, [name]: newValue.slice(0, 10)});
            } else {
                setContactData({...contactData, [name]: newValue});
            }
        } else {
            setContactData({...contactData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vikrant
     * @since 23-02-2023
     * @description to add Career
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    };

    return (
        <div>
            <Head>
                <title>Contact Us</title>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
            </Head>
            <div className={contactStyle["contact"]}>
                <div className={contactStyle["contact__left-wrapper"]}>
                    <h1 className={contactStyle["contact__heading"]}>Contact Us</h1>
                    <div className={contactStyle["contact__phone-wrapper"]}>
                        <AppIcon name={'material-symbols:call'}
                                 color={AppColors.white} size={22}/>
                        <p className={contactStyle["contact__phone"]}>980776080</p>
                    </div>
                    <div className={contactStyle["contact__email-wrapper"]}>
                        <AppIcon name={'material-symbols:mail-rounded'}
                                 color={AppColors.white} size={22}/>
                        <p className={contactStyle["contact__email"]}>candidatename@gmai.com</p>
                    </div>
                    <p className={contactStyle["contact__desc"]}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elt. Risus, erat magna maercenas purus nisi portitor blandit.</p>
                    <div className={contactStyle["contact__social-icons-wrapper"]}>
                        <AppIcon name={'bxl:facebook'}
                                 color={AppColors.white} size={22}/>
                        <AppIcon name={'akar-icons:instagram-fill'}
                                 color={AppColors.white} size={22}/>
                        <AppIcon name={'fa-brands:linkedin-in'}
                                 color={AppColors.white} size={22}/>
                    </div>
                </div>

                <div className={contactStyle["contact__right-wrapper"]}>
                    <h1 className={contactStyle["contact__get-in-touch"]}>Get In Touch</h1>
                    <h3 className={contactStyle["contact__tagline"]}>Feel free to drop us a line below</h3>

                    <div className={contactStyle["contact__form"]}>
                        <input name={"name"} type={"text"} placeholder={"Your Name"}
                               value={contactData.name}
                               className={contactStyle[isError.name.length > 0 ? "contact__name-input-outline" : "contact__name-input"]}
                               onChange={formValChange}/>
                        <div className={contactStyle["invalid__field_display"]}>
                            {isError.name.length > 0 && (
                                <span className={contactStyle["invalid__field"]}>{isError.name}</span>
                            )}
                        </div>
                        <input name={"emailId"} type={"text"} placeholder={"Your Email"}
                               value={contactData.emailId}
                               className={contactStyle[isError.emailId?.length > 0 ? "contact__email-input-outline" : "contact__email-input"]}
                               onChange={formValChange}/>
                        <div className={contactStyle["invalid__field_display"]}>
                            {isError.emailId?.length > 0 && (
                                <span className={contactStyle["invalid__field"]}>{isError.emailId}</span>
                            )}
                        </div>

                        <div className={contactStyle["contact__phone-input-wrapper"]}>
                            <div className={contactStyle["contact__country-selector"]}>
                                {/*  <AppCountryCodeSelector textStyle={{
                                    fontSize: '0.9rem',
                                    marginLeft: '0.3rem'
                                }}/>*/}

                                <AppIcon name={'twemoji:flag-india'}
                                         color={AppColors.roseGold} size={28}/>
                                <span role="img" style={{
                                    fontSize: '0.9rem',
                                    marginLeft: '0.3rem'
                                }} aria-label="Indian Flag">+91 </span>
                            </div>
                            <input name={"contactNo"} type={"string"} placeholder={"Phone No."}
                                   value={contactData.contactNo}
                                   className={contactStyle[isError.contactNo.length > 0 ? "contact__phone-input-outline" : "contact__phone-input"]}
                                   onChange={formValChange}/>
                        </div>

                        <div className={contactStyle["invalid__field_display"]}>
                            {isError.contactNo.length > 0 && (
                                <span className={contactStyle["invalid__field"]}>{isError.contactNo}</span>
                            )}
                        </div>
                        <textarea name={"query"} id="" placeholder={"Type your message here"}
                                  value={contactData.query}
                                  onChange={formValChange}
                                  className={contactStyle["contact__message-input"]}/>
                        <div className={contactStyle["contact__send-button-wrapper"]}>
                            <AppRoundButton onClick={handleSubmit} buttonText={"Send"}
                                            buttonStyle={contactStyle["contact__send-button"]}
                                            type={"primary"}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
