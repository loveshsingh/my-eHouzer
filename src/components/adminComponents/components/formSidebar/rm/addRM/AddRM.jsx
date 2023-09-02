import * as React from 'react';
import {useEffect, useState} from 'react';
import addRMStyles from './AddRM.module.css'
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {addRM, deleteRM, updateRm} from "../../../../../../actions/adminActions";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import AppCountryCodeSelector from "../../../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import {regExpEmail, regExpName, regExpNo, regExpNumber, regExpOnlyNumeric} from "../../../../helpers/ValidationsRegEx";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";

const AddRM = ({onFormToggleHandle}) => {

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
    const rmFormDataInitialState = {
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
        role: 'UR_000002',
    };

    const [rmFormData, setRmFormData] = useState(
        rmFormDataInitialState
    );

    const [isError, setIsError] = useState(rmFormDataInitialState);

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
                setRmFormData({...rmFormData, [name]: newValue.slice(0, 6)});
            } else if (name === 'contactNo' && newValue.length > 10) {
                setRmFormData({...rmFormData, [name]: newValue.slice(0, 10)});
            } else {
                setRmFormData({...rmFormData, [name]: newValue});
            }
        } else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setRmFormData({...rmFormData, [name]: newValue});

        } else {
            setRmFormData({...rmFormData, [name]: value});
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
        newIsError.userId = rmFormData.userId ? '' : 'This field Required*';
        newIsError.firstName = rmFormData.firstName ? '' : 'This field Required*';
        newIsError.lastName = rmFormData.lastName ? '' : 'This field Required*';

        // newIsError.emailId = rmFormData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (rmFormData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(rmFormData.emailId)
                ? ''
                : 'Email address is invalid';


        // newIsError.contactNo = rmFormData.contactNo ? '' : 'This field Required*';
        newIsError.contactNo = (rmFormData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(rmFormData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        newIsError.address = rmFormData.address ? '' : 'This field Required*';

        // newIsError.pincode = rmFormData.pincode ? '' : 'This field Required*';
        newIsError.pincode = (rmFormData.pincode)?.trim() === ''
            ? "PinCode Can't be Empty"
            : regExpOnlyNumeric.test(rmFormData.pincode)
                ? '' : 'Enter a valid Number';

        newIsError.city = rmFormData.city ? '' : 'This field Required*';
        newIsError.state = rmFormData.state ? '' : 'This field Required*';
        newIsError.remarks = rmFormData.remarks ? '' : 'This field Required*';

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
                dispatch(addRM(rmFormData, onSuccess))
            } else {
                dispatch(updateRm(rmFormData, onSuccess));
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
            setRmFormData(rmFormDataInitialState);
            onFormToggleHandle();
        }
    }

    /**
     * @author Vikrant
     * @since 23-02-2023
     * @description to add RM
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation('add');
    };

    useEffect(() => {
        if (dataForm) {
            const rmDetail = dataForm?.rm
            setRmFormData({
                ...rmFormData,
                userId: rmDetail?.rmId,
                firstName: rmDetail?.firstName,
                lastName: rmDetail?.lastName,
                emailId: rmDetail?.emailId,
                contactNo: rmDetail?.contactNo,
                address: rmDetail?.address,
                pincode: rmDetail?.pincode,
                city: rmDetail?.city,
                state: rmDetail?.state,
                remarks: rmDetail?.remarks,
                role: 'UR_000002',
            })
        }
    }, [dataForm]);

    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    const onDeleteRm = (rmId) => {
        setConfirmationDialogState({visible: true, action: ConfirmationDialogAction.DELETE_RM, data: {rmId}});
    }

    return (
        <div className={addRMStyles['add__rm-container']}>
            <div className={addRMStyles['add__rm-header']}>
                <span>{dataForm?.rm ? "Update" : "Add"} RM</span>
            </div>
            <div className={addRMStyles['add__rm-form-container']}>
                <div>
                    <div className={addRMStyles["add__rm"]}>

                        <div className={addRMStyles["add__rm-right-wrapper"]}>

                            <div className={addRMStyles["add__rm-form"]}
                                 onSubmit={dataForm?.rm ? handleUpdate : handleSubmit}>
                                <div style={{display:"flex"}}>
                                <div className={addRMStyles["add__rm-item-name"]}>Employee ID</div>
                                <input name={"userId"} type={"text"} placeholder={"Employee ID"}
                                       value={rmFormData.userId}
                                       onChange={dataForm?.rm ? "" : handleChange}
                                       disabled={!!dataForm?.rm}
                                       style={{opacity: !!dataForm?.rm ? 0.6 : 1}}
                                       className={addRMStyles[isError.userId?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.userId && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>First Name</div>
                                <input name={"firstName"} type={"text"} placeholder={"First Name"}
                                       value={rmFormData.firstName}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.firstName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.firstName && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.firstName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Last Name</div>
                                <input name={"lastName"} type={"text"} placeholder={"Last Name"}
                                       value={rmFormData.lastName}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.lastName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.lastName && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.lastName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Email</div>
                                <input name={"emailId"} type={"text"} placeholder={"Email"}
                                       value={rmFormData.emailId}
                                       onChange={dataForm?.rm ? "" : handleChange}
                                       disabled={!!dataForm?.rm}
                                       style={{opacity: !!dataForm?.rm ? 0.6 : 1}}
                                       className={addRMStyles[isError.emailId?.length > 0 ? "add__rm-email-input-outline" : "add__rm-email-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.emailId && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Address</div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       value={rmFormData.address}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.address?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.address && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>City</div>
                                <input name={"city"} type={"text"} placeholder={"City"}
                                       value={rmFormData.city}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.city?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.city && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.city}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>State</div>
                                <input name={"state"} type={"text"} placeholder={"State"}
                                       value={rmFormData.state}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.state?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.state && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.state}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Pincode</div>
                                <input name={"pincode"} type={"text"} placeholder={"Pincode"}
                                       value={rmFormData.pincode}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.pincode?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.pincode && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.pincode}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Remarks</div>
                                <input name={"remarks"} type={"text"} placeholder={"Remarks"}
                                       value={rmFormData.remarks}
                                       onChange={handleChange}
                                       className={addRMStyles[isError.remarks?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.remarks && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.remarks}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addRMStyles["add__rm-item-name"]}>Phone No.</div>
                                <div className={addRMStyles["add__rm-phone-input-wrapper"]}>
                                    <div className={addRMStyles["add__rm-country-selector"]}>
                                        {/*  <AppCountryCodeSelector textStyle={{
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
                                           value={rmFormData.contactNo}
                                           onChange={dataForm?.rm ? "" : handleChange}
                                           disabled={!!dataForm?.rm}
                                           style={{opacity: !!dataForm?.rm ? 0.6 : 1}}
                                           className={addRMStyles[isError.contactNo?.length > 0 ? "add__rm-phone-input-outline" : "add__rm-phone-input"]}/>
                                </div>
                                </div>

                                <div className={addRMStyles["invalid__field_display"]}>
                                    <span className={addRMStyles["empty"]}></span>
                                    {isError.contactNo && (
                                        <span className={addRMStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>



                                {/*{dataForm?.rm &&*/}
                                {/*    <div className={addRMStyles["add__rm-send-button-wrapper"]}>*/}
                                {/*        <AppRoundButton onClick={() => {*/}
                                {/*            onDeleteRm(rmFormData.userId);*/}
                                {/*        }}*/}
                                {/*                        buttonText={"delete"}*/}
                                {/*                        buttonStyle={addRMStyles["add__rm-send-button"]}*/}
                                {/*                        type={"primary"}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='delete' title={title} state={confirmationDialogState}
                                                onClick={({visible, action, data}) => {
                                                    if (action === ConfirmationDialogAction.DELETE_RM && visible) {
                                                        const {rmId} = data;
                                                        dispatch(deleteRM(rmId, onSuccess))
                                                    }
                                                    setConfirmationDialogState({visible: false, action: undefined});
                                                }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={addRMStyles["add__rm-send-button-wrapper"]}>
                <AppRoundButton onClick={dataForm?.rm ? handleUpdate : handleSubmit}
                                buttonText={dataForm?.rm ? "Update" : "Add"}
                                buttonStyle={addRMStyles["add__rm-send-button"]}
                                type={"primary"}
                />
                {dataForm?.rm &&
                    // <div className={addRMStyles["add__rm-send-button-wrapper"]}>
                        <AppRoundButton onClick={() => {
                            onDeleteRm(rmFormData.userId);
                        }}
                                        buttonText={"Delete"}
                                        buttonStyle={addRMStyles["add__rm-send-button"]}
                                        type={"primary"}
                        />
                    // </div>
                }
            </div>
        </div>
    );
};

export default AddRM;
