import customerLeadFormStyles from "./CustomerLead.module.css";
import AppRoundButton from "../../../../lib/AppRoundButton";
import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {regExpEmail, regExpName, regExpNo, regExpNumber} from "../../../helpers/ValidationsRegEx";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {addCustomerLead} from "../../../../../actions/adminActions";

const CustomerLead = ({onFormToggleHandle}) => {

    const dispatch = useDispatch()
    const {onFormSubmit} = useSelector((state) => state.adminReducer);

    const initialCustLeadData = {
        customerName: '',
        emailId: '',
        contactNo: '',
        address: ''
    }
    const [customerLeadData, setCustomerLeadData] = useState(initialCustLeadData);
    const [isError, setIsError] = useState(initialCustLeadData);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (newValue.length > 10) {
                setCustomerLeadData({...customerLeadData, [name]: newValue.slice(0, 10)});
            } else {
                setCustomerLeadData({...customerLeadData, [name]: newValue});
            }
        } else if (name === 'customerName') {
            const newValue = event.target.value.replace(regExpName, '');
            setCustomerLeadData({...customerLeadData, [name]: newValue});
        } else {
            setCustomerLeadData({...customerLeadData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vikrant
     * @since 28-03-2023
     * @description to check form validations
     */
    const formValidation = () => {
        let newIsError = {...isError};
        newIsError.customerName = customerLeadData.customerName ? '' : 'This field Required*';
        newIsError.address = customerLeadData.address ? '' : 'This field Required*';
        newIsError.emailId = (customerLeadData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(customerLeadData.emailId)
                ? ''
                : 'Email address is invalid';

        newIsError.contactNo = (customerLeadData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(customerLeadData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';
        setIsError(newIsError);

        if (newIsError.customerName === ''
            && (newIsError.emailId === '')
            && (newIsError.contactNo === '')
            && (newIsError.address === '')) {
            dispatch(addCustomerLead(customerLeadData, onSuccess))
        }

    }

    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            onFormSubmit({data: customerLeadData, isSuccess: isSuccess});
            setCustomerLeadData(initialCustLeadData)
            onFormToggleHandle()
        }
    }

    const handleAddLead = (e) => {
        e.preventDefault();
        formValidation();
    }

    return (
        <div className={customerLeadFormStyles['customer_lead__form-container']}>
            <div className={customerLeadFormStyles['customer_lead__form-header']}>
                <span> Customer Lead</span>
            </div>
            <div className={customerLeadFormStyles['customer_lead__form-form-container']}>
                <div>
                    <div className={customerLeadFormStyles["customer_lead__form"]}>

                        <div className={customerLeadFormStyles["customer_lead__form-right-wrapper"]}>

                            <div className={customerLeadFormStyles["customer_lead__form-form"]}>

                                <input name={"customerName"} type={"text"} placeholder={"Customer Name"}
                                       value={customerLeadData.customerName}
                                       onChange={handleChange}
                                       className={customerLeadFormStyles[isError.customerName.length > 0 ? "customer_lead__form-name-input-outline" : "customer_lead__form-name-input"]}/>
                                <div className={customerLeadFormStyles["invalid__field_display"]}>
                                    {isError.customerName.length > 0 && (
                                        <span
                                            className={customerLeadFormStyles["invalid__field"]}>{isError.customerName}</span>
                                    )}
                                </div>
                                <input name={"emailId"} type={"text"} placeholder={"Customer Email"}
                                       value={customerLeadData.emailId}
                                       onChange={handleChange}
                                       className={customerLeadFormStyles[isError.emailId.length > 0 ? "customer_lead__form-email-input-outline" : "customer_lead__form-email-input"]}/>
                                <div className={customerLeadFormStyles["invalid__field_display"]}>
                                    {isError.emailId.length > 0 && (
                                        <span
                                            className={customerLeadFormStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       value={customerLeadData.address}
                                       onChange={handleChange}
                                       className={customerLeadFormStyles[isError.address.length > 0 ? "customer_lead__form-name-input-outline" : "customer_lead__form-name-input"]}/>
                                <div className={customerLeadFormStyles["invalid__field_display"]}>
                                    {isError.address.length > 0 && (
                                        <span
                                            className={customerLeadFormStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div className={customerLeadFormStyles["customer_lead__form-phone-input-wrapper"]}>
                                    <div className={customerLeadFormStyles["customer_lead__form-country-selector"]}>
                                        {/*   <AppCountryCodeSelector textStyle={{
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
                                    <input name={"contactNo"} type={"text"} placeholder={"Phone No."}
                                           value={customerLeadData.contactNo}
                                           onChange={handleChange}
                                           className={customerLeadFormStyles[isError.contactNo.length > 0 ? "customer_lead__form-phone-input-outline" : "customer_lead__form-phone-input"]}/>
                                </div>

                                <div className={customerLeadFormStyles["invalid__field_display"]}>
                                    {isError.contactNo.length > 0 && (
                                        <span
                                            className={customerLeadFormStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>

                                <div className={customerLeadFormStyles["customer_lead__form-send-button-wrapper"]}>
                                    <AppRoundButton onClick={handleAddLead} buttonText={"Send"}
                                                    buttonStyle={customerLeadFormStyles["customer_lead__form-send-button"]}
                                                    type={"primary"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CustomerLead
