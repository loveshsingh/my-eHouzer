import customerFormStyles from "../customer/CustomerForm.module.css";
import AppCountryCodeSelector from "../../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import AppRoundButton from "../../../../lib/AppRoundButton";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateCustomerProfile} from "../../../../../actions/adminActions";
import {regExpEmail, regExpName, regExpNo, regExpNumber, regExpOnlyNumeric} from "../../../helpers/ValidationsRegEx";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";

/**
 * @author Vikrant
 * @since 20-02-2023
 * @description to handle the add/update customer form
 * @param onFormToggleHandle
 * @return {JSX.Element}
 * @constructor
 */
const CustomerForm = ({onFormToggleHandle}) => {

    const dataForm = useSelector((state) => state.adminReducer.dataForm);
    const dispatch = useDispatch()
    const customerDataInitial = {
        userId: '',
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        remarks: ''
    }

    const [customerData, setCustomerData] = useState(customerDataInitial);
    const [isError, setIsError] = useState(customerDataInitial);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo' || name === 'pincode') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (name === 'pincode' && newValue.length > 6) {
                setCustomerData({...customerData, [name]: newValue.slice(0, 6)});
            } else if (newValue.length > 10) {
                setCustomerData({...customerData, [name]: newValue.slice(0, 10)});
            } else {
                setCustomerData({...customerData, [name]: newValue});
            }
        } else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setCustomerData({...customerData, [name]: newValue});
        }  else {
            setCustomerData({...customerData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    useEffect(() => {
        if (dataForm) {
            const customerDetail = dataForm?.customer
            setCustomerData({
                ...customerData,
                userId: customerDetail?.userId,
                firstName: customerDetail?.firstName,
                lastName: customerDetail?.lastName,
                emailId: customerDetail?.emailId,
                contactNo: customerDetail?.contactNo,
                address: customerDetail?.address,
                pincode: customerDetail?.pincode,
                city: customerDetail?.city,
                state: customerDetail?.state,
                remarks: customerDetail?.remarks
            })
        }
    }, [dataForm]);

    /**
     * @author Vikrant
     * @since 28-03-2023
     * @description to check form validations
     */
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.userId = customerData.userId ? '' : 'This field Required*';
        newIsError.firstName = customerData.firstName ? '' : 'This field Required*';
        newIsError.lastName = customerData.lastName ? '' : 'This field Required*';
        // newIsError.emailId = customerData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (customerData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(customerData.emailId)
                ? ''
                : 'Email address is invalid';


        // newIsError.contactNo = customerData.contactNo ? '' : 'This field Required*';
        newIsError.contactNo = (customerData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(customerData.contactNo)

                ? '' : 'Enter a valid 10 digit Number';

        newIsError.address = customerData.address ? '' : 'This field Required*';
        // newIsError.pincode = customerData.pincode ? '' : 'This field Required*';
        newIsError.pincode = (customerData.pincode)?.trim() === ''
            ? "PinCode Can't be Empty"
            : regExpOnlyNumeric.test(customerData.pincode)
                ? '' : 'Enter a valid Number';


        newIsError.city = customerData.city ? '' : 'This field Required*';
        newIsError.state = customerData.state ? '' : 'This field Required*';
        newIsError.remarks = customerData.remarks ? '' : 'This field Required*';
        setIsError(newIsError);

        if (newIsError.userId === ''
            && (newIsError.firstName === '')
            && (newIsError.lastName === '')
            && (newIsError.emailId === '')
            && (newIsError.contactNo === '')
            && (newIsError.address === '')
            && (newIsError.pincode === '')
            && (newIsError.city === '')
            && (newIsError.state === '')
            && (newIsError.remarks === '')) {

            if (value === 'update') {
                dispatch(updateCustomerProfile(customerData, onSuccess))
            }

        }
    }

    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            onFormToggleHandle();
        }
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    return (
        <div className={customerFormStyles['customer__form-container']}>
            <div className={customerFormStyles['customer__form-header']}>
                <span> Update Customer</span>
            </div>
            <div className={customerFormStyles['customer__form-form-container']}>
                <div>
                    <div className={customerFormStyles["customer__form"]}>

                        <div className={customerFormStyles["customer__form-right-wrapper"]}>

                            <div className={customerFormStyles["customer__form-form"]}>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Name</div>
                                <input name={"userId"} type={"text"} placeholder={"Name"}
                                       value={customerData.userId}
                                       onChange={dataForm?.customer ? "" : handleChange}
                                       disabled={!!dataForm?.customer}
                                       style={{opacity: !!dataForm?.customer ? 0.6 : 1}}
                                       className={customerFormStyles[isError.userId.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.userId.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>First Name</div>
                                <input name={"firstName"} type={"text"} placeholder={"First Name"}
                                       value={customerData.firstName}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.firstName.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.firstName.length > 0 && (
                                        <span
                                            className={customerFormStyles["invalid__field"]}>{isError.firstName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Last Name</div>
                                <input name={"lastName"} type={"text"} placeholder={"Last Name"}
                                       value={customerData.lastName}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.lastName.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.lastName.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.lastName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Email</div>
                                <input name={"emailId"} type={"text"} placeholder={"Email"}
                                       value={customerData.emailId}
                                       onChange={dataForm?.customer ? "" : handleChange}
                                       disabled={!!dataForm?.customer}
                                       style={{opacity: !!dataForm?.customer ? 0.6 : 1}}
                                       className={customerFormStyles[isError.emailId.length > 0 ? "customer__form-email-input-outline" : "customer__form-email-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.emailId.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Address</div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       value={customerData.address}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.address.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.address.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>City</div>
                                <input name={"city"} type={"text"} placeholder={"City"}
                                       value={customerData.city}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.city.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.city.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.city}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>State</div>
                                <input name={"state"} type={"text"} placeholder={"State"}
                                       value={customerData.state}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.state.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.state.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.state}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Pincode</div>
                                <input name={"pincode"} type={"text"} placeholder={"Pincode"}
                                       value={customerData.pincode}
                                       onChange={handleChange}
                                       className={customerFormStyles[isError.pincode.length > 0 ? "customer__form-name-input-outline" : "customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.pincode.length > 0 && (
                                        <span className={customerFormStyles["invalid__field"]}>{isError.pincode}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Remarks</div>
                                <input name={"remarks"} type={"text"} placeholder={"Remarks"}
                                       value={customerData.remarks}
                                       onChange={handleChange}
                                       className={customerFormStyles["customer__form-name-input"]}/>
                                </div>
                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.remarks.length > 0 && (
                                        <span
                                            className={customerFormStyles["invalid__field"]}>{isError.remarks}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={customerFormStyles["add__customer-item-name"]}>Phone No.</div>
                                <div className={customerFormStyles["customer__form-phone-input-wrapper"]}>
                                    <div className={customerFormStyles["customer__form-country-selector"]}>
                                    {/*    <AppCountryCodeSelector textStyle={{
                                            fontSize: '0.9rem',
                                            marginLeft: '0.3rem'
                                        }}/>*/}

                                        <AppIcon name={'twemoji:flag-india'}
                                                 color={AppColors.roseGold} size={28}/>
                                        <span role="img" style={{
                                            fontSize: '0.9rem',
                                            marginLeft: '0.3rem',
                                            color: 'grey',
                                        }} aria-label="Indian Flag">+91 </span>
                                    </div>
                                    <input name={"contactNo"} type={"text"} placeholder={"Phone No."}
                                           value={customerData.contactNo}
                                           onChange={dataForm?.customer ? "" : handleChange}
                                           disabled={!!dataForm?.customer}
                                           style={{opacity: !!dataForm?.customer ? 0.6 : 1}}
                                           className={customerFormStyles[isError.contactNo.length > 0 ? "customer__form-phone-input-outline" : "customer__form-phone-input"]}/>
                                </div>
                                </div>

                                <div className={customerFormStyles["invalid__field_display"]}>
                                    <span className={customerFormStyles["empty"]}></span>
                                    {isError.contactNo.length > 0 && (
                                        <span
                                            className={customerFormStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={customerFormStyles["customer__form-send-button-wrapper"]}>
                <AppRoundButton onClick={handleUpdate} buttonText={"Update"}
                                buttonStyle={customerFormStyles["customer__form-send-button"]}
                                type={"primary"}/>
            </div>
        </div>

    )
}

export default CustomerForm
