import * as React from 'react';
import {useEffect, useState} from 'react';
import addCEStyles from './AddCE.module.css'
import AppRoundButton from "../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {addCE, deleteCE, updateCE} from "../../../../../actions/adminActions";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../helpers/confirmationBox/ConfirmationDialog";
import AppCountryCodeSelector from "../../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import {regExpEmail, regExpName, regExpNo, regExpNumber, regExpOnlyNumeric} from "../../../helpers/ValidationsRegEx";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import addRMStyles from "../rm/addRM/AddRM.module.css";

const AddCE = ({onFormToggleHandle}) => {

    const dataForm = useSelector((state) => state.adminReducer.dataForm);
    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });

    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to delete?</span>);
    }

    const dispatch = useDispatch()

    /**
     * @author Vipul
     * @since 29-03-2023
     * @description to initialize the state
     * @type {{firstName: string, lastName: string, pincode: string, address: string, role: string, city: string, emailId: string, state: string, userId: string, remarks: string, contactNo: string}}
     */
    const ceFormDataInitialState = {
        userId: '',
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        remarks: '',
        role: 'UR_000004',
    };

    const [ceFormData, setCEFormData] = useState(
        ceFormDataInitialState
    );
    const [isError, setIsError] = useState(ceFormDataInitialState);

    /**
     * @author Vikrant
     * @since 24-02-2023
     * @description to handle changes at input value onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'contactNo' || name === 'pincode') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (name === 'pincode' && newValue.length > 6) {
                setCEFormData({...ceFormData, [name]: newValue.slice(0, 6)});
            } else if (name === 'contactNo' && newValue.length > 10) {
                setCEFormData({...ceFormData, [name]: newValue.slice(0, 10)});
            } else {
                setCEFormData({...ceFormData, [name]: newValue});
            }

        }else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setCEFormData({...ceFormData, [name]: newValue});
        } else {
            setCEFormData({...ceFormData, [name]: value});
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
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.userId = ceFormData.userId ? '' : 'This field Required*';
        newIsError.firstName = ceFormData.firstName ? '' : 'This field Required*';
        newIsError.lastName = ceFormData.lastName ? '' : 'This field Required*';

        // newIsError.emailId = ceFormData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (ceFormData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(ceFormData.emailId)
                ? ''
                : 'Email address is invalid';


        // newIsError.contactNo = ceFormData.contactNo ? '' : 'This field Required*';
        newIsError.contactNo = (ceFormData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(ceFormData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        newIsError.address = ceFormData.address ? '' : 'This field Required*';

        // newIsError.pincode = ceFormData.pincode ? '' : 'This field Required*';
        newIsError.pincode = (ceFormData.pincode)?.trim() === ''
            ? "PinCode Can't be Empty"
            : regExpOnlyNumeric.test(ceFormData.pincode)
                ? '' : 'Enter a valid Number';

        newIsError.city = ceFormData.city ? '' : 'This field Required*';
        newIsError.state = ceFormData.state ? '' : 'This field Required*';
        newIsError.remarks = ceFormData.remarks ? '' : 'This field Required*';

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
                dispatch(addCE(ceFormData, onSuccess))
            } else {
                dispatch(updateCE(ceFormData, onSuccess));
            }

        }

    }

    /**
     * @author Vikrant
     * @since 20-03-2023
     * @description after success the forms
     * @param isSuccess
     */
    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setCEFormData(ceFormDataInitialState);
            onFormToggleHandle();
        }
    }

    /**
     * @author Vikrant
     * @since 23-02-2023
     * @description to add CE
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation('add');
    };

    useEffect(() => {
        if (dataForm) {
            const ceDetail = dataForm?.ce
            setCEFormData({
                ...ceFormData,
                userId: ceDetail?.userId,
                firstName: ceDetail?.firstName,
                lastName: ceDetail?.lastName,
                emailId: ceDetail?.emailId,
                contactNo: ceDetail?.contactNo,
                address: ceDetail?.address,
                pincode: ceDetail?.pincode,
                city: ceDetail?.city,
                state: ceDetail?.state,
                remarks: ceDetail?.remarks,
                role: 'UR_000004',
            })
        }
    }, [dataForm]);

    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    const onDeleteCE = (ceId) => {
        setConfirmationDialogState({visible: true, action: ConfirmationDialogAction.DELETE_CE, data: {ceId}});
    }

    return (
        <div className={addCEStyles['add__ce-container']}>
            <div className={addCEStyles['add__ce-header']}>
                <span>{dataForm?.ce ? "Update" : "Add"} CE</span>
            </div>
            <div className={addCEStyles['add__ce-form-container']}>
                <div>
                    <div className={addCEStyles["add__ce"]}>

                        <div className={addCEStyles["add__ce-right-wrapper"]}>

                            <div className={addCEStyles["add__ce-form"]}
                                 onSubmit={dataForm?.ce ? handleUpdate : handleSubmit}>

                              {/*  <div className={addCEStyles["did-floating-label-content"]}>
                                    <input name={"userId"} type={"text"} placeholder={""}
                                           value={ceFormData.userId}
                                           onChange={dataForm?.ce ? "" : handleChange}
                                           disabled={!!dataForm?.ce}
                                           style={{opacity: !!dataForm?.ce ? 0.6 : 1}}
                                           className={addCEStyles[isError.userId?.length > 0 ? "add__ce-name-input-outline" : "did-floating-input"]}/>
                                        <label className={addCEStyles["did-floating-label"]}>Employee ID</label>
                                </div>*/}
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Employee ID</div>
                                <input name={"userId"} type={"text"} placeholder={"Employee ID"}
                                       value={ceFormData.userId}
                                       onChange={dataForm?.ce ? "" : handleChange}
                                       disabled={!!dataForm?.ce}
                                       style={{opacity: !!dataForm?.ce ? 0.6 : 1}}
                                       className={addCEStyles[isError.userId?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.userId && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>First Name</div>
                                <input name={"firstName"} type={"text"} placeholder={"First Name"}
                                       value={ceFormData.firstName}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.firstName?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.firstName && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.firstName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Last Name</div>
                                <input name={"lastName"} type={"text"} placeholder={"Last Name"}
                                       value={ceFormData.lastName}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.lastName?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.lastName && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.lastName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Email</div>
                                <input name={"emailId"} type={"text"} placeholder={"Email"}
                                       value={ceFormData.emailId}
                                       onChange={dataForm?.ce ? "" : handleChange}
                                       disabled={!!dataForm?.ce}
                                       style={{opacity: !!dataForm?.ce ? 0.6 : 1}}
                                       className={addCEStyles[isError.emailId?.length > 0 ? "add__ce-email-input-outline" : "add__ce-email-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.emailId && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Address</div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       value={ceFormData.address}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.address?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.address && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>City</div>
                                <input name={"city"} type={"text"} placeholder={"City"}
                                       value={ceFormData.city}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.city?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.city && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.city}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>State</div>
                                <input name={"state"} type={"text"} placeholder={"State"}
                                       value={ceFormData.state}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.state?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.state && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.state}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Pincode</div>
                                <input name={"pincode"} type={"text"} placeholder={"Pincode"}
                                       value={ceFormData.pincode}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.pincode?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.pincode && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.pincode}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Remarks</div>
                                <input name={"remarks"} type={"text"} placeholder={"Remarks"}
                                       value={ceFormData.remarks}
                                       onChange={handleChange}
                                       className={addCEStyles[isError.remarks?.length > 0 ? "add__ce-name-input-outline" : "add__ce-name-input"]}/>
                                </div>
                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.remarks && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.remarks}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addCEStyles["add__ce-item-name"]}>Mobile No.</div>
                                <div className={addCEStyles["add__ce-phone-input-wrapper"]}>
                                    <div className={addCEStyles["add__ce-country-selector"]}>
                                    {/*    <AppCountryCodeSelector textStyle={{
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
                                    <input name={"contactNo"} type={"text"} placeholder={"Mobile No."}
                                           value={ceFormData.contactNo}
                                           onChange={dataForm?.ce ? "" : handleChange}
                                           disabled={!!dataForm?.ce}
                                           style={{opacity: !!dataForm?.ce ? 0.6 : 1}}
                                           className={addCEStyles[isError.contactNo?.length > 0 ? "add__ce-phone-input-outline" : "add__ce-phone-input"]}/>
                                </div>
                                </div>

                                <div className={addCEStyles["invalid__field_display"]}>
                                    <span className={addCEStyles["empty"]}></span>
                                    {isError.contactNo && (
                                        <span className={addCEStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>

                                {/*<div className={addCEStyles["add__ce-send-button-wrapper"]}>*/}
                                {/*    <AppRoundButton onClick={dataForm?.ce ? handleUpdate : handleSubmit}*/}
                                {/*                    buttonText={dataForm?.ce ? "Update" : "Add"}*/}
                                {/*                    buttonStyle={addCEStyles["add__ce-send-button"]}*/}
                                {/*                    type={"primary"}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*{dataForm?.ce &&*/}
                                {/*    <div className={addCEStyles["add__ce-send-button-wrapper"]}>*/}
                                {/*        <AppRoundButton onClick={() => {*/}
                                {/*            onDeleteCE(ceFormData.userId);*/}
                                {/*        }}*/}
                                {/*                        buttonText={"delete"}*/}
                                {/*                        buttonStyle={addCEStyles["add__ce-send-button"]}*/}
                                {/*                        type={"primary"}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='Delete' title={title} state={confirmationDialogState}
                                                onClick={({visible, action, data}) => {
                                                    if (action === ConfirmationDialogAction.DELETE_CE && visible) {
                                                        const {ceId} = data;
                                                        dispatch(deleteCE(ceId, onSuccess))
                                                    }
                                                    setConfirmationDialogState({visible: false, action: undefined});
                                                }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={addCEStyles["add__ce-send-button-wrapper"]}>
                <AppRoundButton onClick={dataForm?.ce ? handleUpdate : handleSubmit}
                                buttonText={dataForm?.ce ? "Update" : "Add"}
                                buttonStyle={addCEStyles["add__ce-send-button"]}
                                type={"primary"}
                />


            {dataForm?.ce &&
                // <div className={addCEStyles["add__ce-send-button-wrapper"]}>
                    <AppRoundButton onClick={() => {
                        onDeleteCE(ceFormData.userId);
                    }}
                                    buttonText={"Delete"}
                                    buttonStyle={addCEStyles["add__ce-send-button"]}
                                    type={"primary"}
                    />
                // </div>
            }
            </div>
        </div>
    );
};

export default AddCE;
