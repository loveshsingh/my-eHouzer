import * as React from 'react';
import {useEffect, useState} from 'react';
import updatePaymentStyles from './UpdatePayment.module.css'
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import propertyVariantStyles from "../../property/propertyVariant/PropertyVariantForm.module.css";
import {PaymentConstants, StatusConstants} from "../../../../../../constants/StatusConstants";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import {updatePaymentStatus} from "../../../../../../actions/adminActions";

/**
 * @author Vikrant
 * @since 11-04-2023
 * @description to update Customer remarks form
 * @param onFormToggleHandle
 * @returns {JSX.Element}
 * @constructor
 */
const UpdatePayment = ({onFormToggleHandle}) => {

    const {dataForm, onFormSubmit} = useSelector((state) => state.adminReducer);
    const dispatch = useDispatch()
    const [displayStatus, setDisplayStatus] = useState('')
    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });
    const [prevLevel, setPrevLevel] = useState('')
    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to Update Status to {displayStatus}?</span>);
    }

    /**
     * @author Vikrant
     * @since 24-05-2023
     * @description to initialize the state
     * @type {{userId: string, remarks: string}}
     */
    const paymentFormDataInitialState = {
        paymentId: '',
        transactionId: '',
        paymentStatus: '',
    };
    const [paymentFormData, setPaymentFormData] = useState(
        paymentFormDataInitialState
    );

    const [isError, setIsError] = useState(paymentFormDataInitialState);

    useEffect(() => {

        if (dataForm) {
            const payment = dataForm?.payment
            if (payment?.transactionId === null) {
                setPaymentFormData({
                    transactionId: '',
                    paymentId: payment?.paymentId,
                    paymentStatus: payment?.paymentStatus
                })
            } else {
                setPaymentFormData({
                    transactionId: payment?.transactionId,
                    paymentId: payment?.paymentId,
                    paymentStatus: payment?.paymentStatus
                })
            }
            setPrevLevel(PaymentConstants.find(obj => obj.name === payment?.paymentStatus).level)

        }
    }, [dataForm]);

    /**
     * @author Vikrant
     * @since 24-05-2023
     * @description to handle changes at input value onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPaymentFormData({...paymentFormData, [name]: value});
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            if (name === 'paymentStatus') {
                setDisplayStatus(value);
            }
            setIsError({...isError, [name]: ''});

        }
    };

    /**
     * @author Vikrant
     * @since 24-05-2023
     * @description to check form validations
     */
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.paymentId = paymentFormData.paymentId ? '' : 'This field Required*';
        newIsError.transactionId = paymentFormData.transactionId ? '' : 'This field Required*';
        newIsError.paymentStatus = paymentFormData.paymentStatus ? '' : 'This field Required*';
        setIsError(newIsError);

        if (newIsError.paymentId === '' && (newIsError.transactionId === '') && (newIsError.paymentStatus === '')) {
            setConfirmationDialogState({
                visible: true,
                action: ConfirmationDialogAction.UPDATE,
                data: {value: paymentFormData?.paymentStatus}
            });
        }

    }

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description after success the forms
     * @param isSuccess
     */
    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            onFormSubmit({data: paymentFormData, isSuccess: isSuccess});
            setPaymentFormData(paymentFormDataInitialState);
            onFormToggleHandle();
        }
    }


    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description to handle update RM customer remarks
     * @param e
     */
    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    const handleStatusChange = (statusData) => {
        const {visible, action, data} = statusData
        if (action === ConfirmationDialogAction.UPDATE && visible) {
            // setStatusValue(data.value)
            setPrevLevel(StatusConstants.find(obj => obj.name === data.value).level)
            const details = {
                paymentId: paymentFormData.paymentId,
                transactionId: paymentFormData.transactionId,
                status: paymentFormData.paymentStatus
            }
            dispatch(updatePaymentStatus(details, onSuccess))
        }
        setConfirmationDialogState({visible: false, action: undefined});
    }

    return (
        <div className={updatePaymentStyles['update__payment-container']}>
            <div className={updatePaymentStyles['update__payment-header']}>
                <span>Update Payment</span>
            </div>
            <div className={updatePaymentStyles['update__payment-form-container']}>
                <div>
                    <div className={updatePaymentStyles["update__payment"]}>

                        <div className={updatePaymentStyles["update__payment-right-wrapper"]}>

                            <div className={updatePaymentStyles["update__payment-form"]}
                                 onSubmit={handleUpdate}>
                                <div style={{display:"flex"}}>
                                    <div className={updatePaymentStyles["update__payment-item-name"]}>Payment ID</div>
                                <input name={"paymentId"} type={"text"} placeholder={"Payment ID"}
                                       value={paymentFormData.paymentId}
                                       onChange={dataForm?.payment ? "" : handleChange}
                                       disabled={!!dataForm?.payment}
                                       style={{opacity: !!dataForm?.payment ? 0.6 : 1}}
                                       className={updatePaymentStyles[isError.paymentId?.length > 0 ? "update__payment-name-input-outline" : "update__payment-name-input"]}/>
                                </div>
                                <div className={updatePaymentStyles["invalid__field_display"]}>
                                    {isError.paymentId && (
                                        <span
                                            className={updatePaymentStyles["invalid__field"]}>{isError.paymentId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={updatePaymentStyles["update__payment-item-name"]}>Transaction ID</div>
                                <input name={"transactionId"} type={"text"} placeholder={"Transaction Id"}
                                       value={paymentFormData.transactionId}
                                       onChange={(dataForm?.payment?.transactionId) ? "" : handleChange}
                                       disabled={dataForm?.payment?.transactionId}
                                       style={{opacity: !!dataForm?.payment?.transactionId ? 0.6 : 1}}
                                       className={updatePaymentStyles[isError.transactionId?.length > 0 ? "update__payment-name-input-outline" : "update__payment-name-input"]}/>
                                </div>
                                <div className={updatePaymentStyles["invalid__field_display"]}>
                                    {isError.transactionId && (
                                        <span
                                            className={updatePaymentStyles["invalid__field"]}>{isError.transactionId}</span>
                                    )}
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={updatePaymentStyles["update__payment-item-name"]}>Payment Status</div>
                                    <select className={propertyVariantStyles["property__variant-selector"]}
                                            placeholder="Payment Status"
                                            name="paymentStatus"
                                            value={paymentFormData?.paymentStatus}
                                            onChange={handleChange}
                                    >
                                        {PaymentConstants?.map((option) => (
                                            <option key={option.level} value={option.name}
                                                    disabled={(option.level < prevLevel || prevLevel === 700 || prevLevel === 800)}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={propertyVariantStyles["invalid__field_display"]}>
                                        {isError.paymentStatus && (
                                            <span
                                                className={propertyVariantStyles["invalid__field"]}>{isError.paymentStatus}</span>
                                        )}
                                    </div>
                                </div>


                                <div className={updatePaymentStyles["update__payment-send-button-wrapper"]}>
                                    <AppRoundButton
                                        onClick={(prevLevel === 700 || prevLevel === 800) ? (() => ({})) : handleUpdate}
                                        buttonText={"Update"}
                                        buttonStyle={updatePaymentStyles["update__payment-send-button"]}
                                        type={"primary"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='update' title={title} state={confirmationDialogState}
                                                onClick={(value) => handleStatusChange(value)}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayment;
