import * as React from 'react';
import {useEffect, useState} from 'react';
import addAgentStyles from './AddAgent.module.css'
import AppCountryCodeSelector from "../../../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {addAgent, deleteAgent, updateAgent} from "../../../../../../actions/adminActions";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import {regExpEmail, regExpName, regExpNo, regExpNumber, regExpPincode} from "../../../../helpers/ValidationsRegEx";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";

const AddAgent = ({onFormToggleHandle}) => {

    const dataForm = useSelector((state) => state.adminReducer.dataForm);
    const dispatch = useDispatch()

    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });

    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to delete?</span>);
    }

    const onDeleteAgent = (userId) => {
        setConfirmationDialogState({visible: true, action: ConfirmationDialogAction.DELETE_AGENT, data: {userId}});
    }

    const agentFormDataInitialState = {
        userId: '',
        firstName: '',
        lastName: '',
        emailId: '',
        companyName: '',
        contactNo: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        remarks: '',
        role: 'UR_000005',
    }

    const [agentFormData, setAgentFormData] = useState(
        agentFormDataInitialState
    );

    const [selectedOption, setSelectedOption] = useState('');


    const [isError, setIsError] = useState({
        agentFormDataInitialState
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo' || name === 'pincode') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (name === 'pincode' && newValue.length > 6) {
                setAgentFormData({...agentFormData, [name]: newValue.slice(0, 6)});
            } else if (name === 'contactNo' && newValue.length > 10) {
                setAgentFormData({...agentFormData, [name]: newValue.slice(0, 10)});
            } else {
                setAgentFormData({...agentFormData, [name]: newValue});
            }

        } else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setAgentFormData({...agentFormData, [name]: newValue});
        } else {
            setAgentFormData({...agentFormData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (dataForm) {
            const agent = dataForm?.agent
            setAgentFormData({
                ...agentFormData,
                userId: agent?.userId,
                firstName: agent?.firstName,
                lastName: agent?.lastName,
                emailId: agent?.emailId,
                contactNo: agent?.contactNo,
                companyName: agent?.companyName,
                address: agent?.address,
                pincode: agent?.pincode,
                city: agent?.city,
                state: agent?.state,
                remarks: agent?.remarks,
                role: 'UR_000005',
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
        newIsError.userId = agentFormData.userId ? '' : 'This field Required*';
        newIsError.firstName = agentFormData.firstName ? '' : 'This field Required*';
        newIsError.companyName = agentFormData.companyName ? '' : 'This field Required*';
        newIsError.lastName = agentFormData.lastName ? '' : 'This field Required*';
        // newIsError.emailId = agentFormData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (agentFormData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(agentFormData.emailId)
                ? ''
                : 'Email address is invalid';

        // newIsError.contactNo = agentFormData.contactNo ? '' : 'This field Required*';
        newIsError.contactNo = (agentFormData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(agentFormData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        newIsError.address = agentFormData.address ? '' : 'This field Required*';

        // newIsError.pincode = agentFormData.pincode ? '' : 'This field Required*';
        newIsError.pincode = (agentFormData.pincode)?.trim() === ''
            ? "PinCode Can't be Empty"
            : regExpPincode.test(agentFormData.pincode)
                ? '' : 'Enter a valid Number';

        newIsError.city = agentFormData.city ? '' : 'This field Required*';
        newIsError.state = agentFormData.state ? '' : 'This field Required*';
        newIsError.remarks = agentFormData.remarks ? '' : 'This field Required*';
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

            if (value === 'add') {
                dispatch(addAgent(agentFormData, onSuccess));
            } else {
                dispatch(updateAgent(agentFormData, onSuccess));
            }
        }

    }

    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setAgentFormData(agentFormDataInitialState);
            onFormToggleHandle()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation('add');

    };

    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };


    return (
        <div className={addAgentStyles['add__agent-container']}>
            <div className={addAgentStyles['add__agent-header']}>
                <span>{dataForm?.agent ? "Update" : "Add"} Agent</span>
            </div>
            <div className={addAgentStyles['add__agent-form-container']}>
                <div>
                    <div className={addAgentStyles["add__agent"]}>

                        <div className={addAgentStyles["add__agent-right-wrapper"]}>

                            <div className={addAgentStyles["add__agent-form"]}>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>User Name</div>
                                    <input name={"userId"} type={"text"} placeholder={"User Name"}
                                           value={agentFormData.userId}
                                           onChange={dataForm?.agent ? "" : handleChange}
                                           disabled={!!dataForm?.agent}
                                           style={{opacity: !!dataForm?.agent ? 0.6 : 1}}
                                           className={addAgentStyles[isError.userId?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.userId && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Company Name</div>
                                <input name={"companyName"} type={"text"} placeholder={"Company Name"}
                                       value={agentFormData.companyName}
                                       onChange={handleChange}
                                       className={addAgentStyles[isError.companyName?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.companyName && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.companyName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>First Name</div>
                                <input name={"firstName"} type={"text"} placeholder={"First Name"}
                                       value={agentFormData.firstName}
                                       onChange={handleChange}
                                       className={addAgentStyles[isError.firstName?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.firstName && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.firstName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Last Name</div>
                                <input name={"lastName"} type={"text"} placeholder={"Last Name"}
                                       value={agentFormData.lastName}
                                       onChange={handleChange}
                                       className={addAgentStyles[isError.lastName?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.lastName && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.lastName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Email</div>
                                <input name={"emailId"} type={"text"} placeholder={"Email"}
                                       value={agentFormData.emailId}
                                       onChange={dataForm?.agent ? "" : handleChange}
                                       disabled={!!dataForm?.agent}
                                       style={{opacity: !!dataForm?.agent ? 0.6 : 1}}
                                       className={addAgentStyles[isError.emailId?.length > 0 ? "add__agent-email-input-outline" : "add__agent-email-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.emailId && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Address</div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       onChange={handleChange}
                                       value={agentFormData.address}
                                       className={addAgentStyles[isError.address?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.address && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>City</div>
                                <input name={"city"} type={"text"} placeholder={"City"}
                                       onChange={handleChange}
                                       value={agentFormData.city}
                                       className={addAgentStyles[isError.city?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.city && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.city}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>State</div>
                                <input name={"state"} type={"text"} placeholder={"State"}
                                       onChange={handleChange}
                                       value={agentFormData.state}
                                       className={addAgentStyles[isError.state?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.state && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.state}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Remarks</div>
                                <input name={"remarks"} type={"text"} placeholder={"Remarks"}
                                       onChange={handleChange}
                                       value={agentFormData.remarks}
                                       className={addAgentStyles[isError.remarks?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.remarks && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.remarks}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Pincode</div>
                                <input name={"pincode"} type={"text"} placeholder={"Pincode"}
                                       onChange={handleChange}
                                       value={agentFormData.pincode}
                                       className={addAgentStyles[isError.pincode?.length > 0 ? "add__agent-name-input-outline" : "add__agent-name-input"]}/>
                                </div>
                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.pincode && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.pincode}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addAgentStyles["add__agent-item-name"]}>Phone No.</div>
                                <div className={addAgentStyles["add__agent-phone-input-wrapper"]}>
                                    <div className={addAgentStyles["add__agent-country-selector"]}>
                                        {/*   <AppCountryCodeSelector textStyle={{
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
                                           value={agentFormData.contactNo}
                                           maxLength={10}
                                           onChange={dataForm?.agent ? "" : handleChange}
                                           disabled={!!dataForm?.agent}
                                           style={{opacity: !!dataForm?.agent ? 0.6 : 1}}
                                           className={addAgentStyles[isError.contactNo?.length > 0 ? "add__agent-phone-input-outline" : "add__agent-phone-input"]}/>
                                </div>
                                </div>

                                <div className={addAgentStyles["invalid__field_display"]}>
                                    <span className={addAgentStyles["empty"]}></span>
                                    {isError.contactNo && (
                                        <span className={addAgentStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>

                                {/*<div className={addAgentStyles["add__agent-send-button-wrapper"]}>*/}
                                {/*    <AppRoundButton onClick={dataForm?.agent ? handleUpdate : handleSubmit}*/}
                                {/*                    buttonText={dataForm?.agent ? "Update" : "Add"}*/}
                                {/*                    buttonStyle={addAgentStyles["add__agent-send-button"]}*/}
                                {/*                    type={"primary"}/>*/}
                                {/*</div>*/}
                                {/*{dataForm?.agent && <div className={addAgentStyles["add__agent-send-button-wrapper"]}>*/}
                                {/*    <AppRoundButton onClick={() => onDeleteAgent(agentFormData.userId)}*/}
                                {/*                    buttonText={"delete"}*/}
                                {/*                    buttonStyle={addAgentStyles["add__agent-send-button"]}*/}
                                {/*                    type={"primary"}/>*/}
                                {/*</div>*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='delete' title={title} state={confirmationDialogState}
                                                onClick={({visible, action, data}) => {
                                                    if (action === ConfirmationDialogAction.DELETE_AGENT && visible) {
                                                        const {userId} = data;
                                                        dispatch(deleteAgent(userId, onSuccess))
                                                    }
                                                    setConfirmationDialogState({visible: false, action: undefined});
                                                }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={addAgentStyles["add__agent-send-button-wrapper"]}>
                <AppRoundButton onClick={dataForm?.agent ? handleUpdate : handleSubmit}
                                buttonText={dataForm?.agent ? "Update" : "Add"}
                                buttonStyle={addAgentStyles["add__agent-send-button"]}
                                type={"primary"}/>

            {dataForm?.agent &&
                // <div className={addAgentStyles["add__agent-send-button-wrapper"]}>
                <AppRoundButton onClick={() => onDeleteAgent(agentFormData.userId)}
                                buttonText={"Delete"}
                                buttonStyle={addAgentStyles["add__agent-send-button"]}
                                type={"primary"}/>
            // </div>
            }
            </div>
        </div>
    );
};

export default AddAgent;
