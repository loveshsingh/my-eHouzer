import * as React from 'react'
import {useState} from 'react'
import PaymentOfflineStyle from "./MakePaymentOffline.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useStepper} from "../../../../base/contexts/StepperProvider";
import {setActiveSteps} from "../../../../actions/payment";
import {useDispatch, useSelector} from "react-redux";
import {BookingApiService} from "../../../../services/BookingApiService";
import {regExpNumber} from "../../../adminComponents/helpers/ValidationsRegEx";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const MakePaymentOffline = () => {
    const {
        currentStep,
        incrementCurrentStep, decrementCurrentStep,
    } = useStepper();
    const {bookingId} = useSelector((state) => state.bookingReducer)
    const [selectedImages, setSelectedImages] = useState('');
    const [imageFormData, setImageFormData] = useState();
    const [accountType, setAccountType] = useState("savings");

    const dispatch = useDispatch()
    const onPressStep = (tabId) => {
        let clickedTabId = tabId;
        let newArray = [];

        while (clickedTabId > 1) {
            clickedTabId--;
            newArray.push(clickedTabId)
        }
        newArray.push(tabId)
        dispatch(setActiveSteps(newArray));
        if (tabId < currentStep + 1) {
            decrementCurrentStep()
        } else if (tabId > currentStep + 1) {
            incrementCurrentStep();
        }
    }


    const initialState = {
        // Cheque
        paymentMethod: 'Cheque',
        amount: '',
        accountHoldersName: '',
        bankName: '',
        branchName: '',
        chequeNo: '',
        issueDate: '',
        accountType: accountType,
        // according to Offline or Online
        paymentMode: 'Offline',
        chequeImg: '',
    }

    const [bookingFormData, setBookingFormData] = useState(initialState);
    const [isError, setIsError] = useState(initialState);

    /**
     * @author Vikrant
     * @since 01-05-2023
     * @description to handle changes at input value onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;

        if (name === 'amount' || name === 'chequeNo') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (name === 'chequeNo' && newValue.length > 7) {
                setBookingFormData({...bookingFormData, [name]: newValue.slice(0, 7)});
            } else if (name === 'amount' && newValue.length > 7) {
                setBookingFormData({...bookingFormData, [name]: newValue.slice(0, 7)});
            } else {
                setBookingFormData({...bookingFormData, [name]: newValue});
            }
        } else if (name === 'chequeImg') {

            const selectedFile = event.target.files[0];

                if (selectedFile && (selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")) {
                    const image = URL?.createObjectURL(selectedFile);
                    setBookingFormData({...bookingFormData, [name]: selectedFile.name});
                    setSelectedImages(image);
                    setImageFormData(selectedFile);
                }
        } else if (name === 'accountType') {
            setAccountType(event.target.value);
            setBookingFormData({...bookingFormData, [name]: event.target.value});
        } else {
            setBookingFormData({...bookingFormData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
            if (name === 'chequeImg' && selectedImages !== '') {
                setIsError({...isError, [name]: ''});
            }
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vikrant
     * @since 01-05-2023
     * @description to check form validations
     */
    const formValidation = () => {
        let newIsError = {...isError};
        let isValid = true;
        if (!bookingFormData.amount) {
            newIsError.amount = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.accountHoldersName) {
            newIsError.accountHoldersName = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.bankName) {
            newIsError.bankName = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.branchName) {
            newIsError.branchName = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.chequeNo) {
            newIsError.chequeNo = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.issueDate) {
            newIsError.issueDate = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.accountType) {
            newIsError.accountType = "This field Required*"
            isValid = false;
        }
        if (!bookingFormData.chequeImg) {
            newIsError.chequeImg = "This field Required*"
            isValid = false;
        }

        setIsError(newIsError);

        if (isValid) {

            const formData = new FormData();
            formData.append('bookingId', bookingId);
            formData.append('amount', bookingFormData.amount);
            formData.append('accountHoldersName', bookingFormData.accountHoldersName);
            formData.append('bankName', bookingFormData.bankName);
            formData.append('branchName', bookingFormData.branchName);
            formData.append('chequeNo', bookingFormData.chequeNo);
            formData.append('issueDate', bookingFormData.issueDate);
            formData.append('accountType', bookingFormData.accountType);
            formData.append('paymentMethod', bookingFormData.paymentMethod);
            formData.append('paymentMode', bookingFormData.paymentMode);
            formData.append('file', imageFormData);

            BookingApiService.offlineBookingPayment(formData).then(res => {
                if (res.code === 200) {
                    onPressStep(3)
                }
            })
        }

    }

    /**
     * @author Vikrant
     * @since 01-05-2023
     * @description to submit booking
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    };


    return (
        <div className={PaymentOfflineStyle["payment-offline"]}>
            <div className={PaymentOfflineStyle["payment-offline__info-card"]}>
                <h1 className={PaymentOfflineStyle["payment-offline__info-heading"]}>INFO:</h1>
                <p className={PaymentOfflineStyle["payment-offline__info-detail"]}>If paying by cheque / bank transfer,
                    please deposit / transfer
                    your payment to below account. The payment should be received in the bank account within 3 days.</p>

                <div className={PaymentOfflineStyle["payment-offline__account-detail-wrapper"]}>
                    <ul className={PaymentOfflineStyle["payment-offline__account-detail-container"]}>
                        <li className={PaymentOfflineStyle["payment-offline__account-detail-text"]}>Account Name:</li>
                        <li className={PaymentOfflineStyle["payment-offline__account-detail-text"]}>Bank Name:</li>
                    </ul>
                    <ul className={PaymentOfflineStyle["payment-offline__account-detail-container"]}>
                        <li className={PaymentOfflineStyle["payment-offline__account-detail-text"]}>Account No.:</li>
                        <li className={PaymentOfflineStyle["payment-offline__account-detail-text"]}>Bank IFSC Code:</li>
                    </ul>
                </div>

                <p className={PaymentOfflineStyle["payment-offline__note"]}>After you have made the bank transfer,
                    please complete the
                    information below so that we can track your payment.</p>
            </div>

            <div>
                <div className={PaymentOfflineStyle["payment-offline__inputs-wrapper"]}>
                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Account Holder Name
                            *</label>
                        <input
                            name={"accountHoldersName"}
                            value={bookingFormData.accountHoldersName}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__input"]} type={"text"}/>
                        {isError.accountHoldersName.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.accountHoldersName}
                            </div>
                        )}
                    </div>

                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Bank Name *</label>
                        <input
                            name={"bankName"}
                            value={bookingFormData.bankName}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__input"]} type={"text"}/>
                        {isError.bankName.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.bankName}
                            </div>
                        )}
                    </div>

                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Branch Name *</label>
                        <input
                            name={"branchName"}
                            value={bookingFormData.branchName}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__input"]} type={"text"}/>
                        {isError.branchName.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.branchName}
                            </div>
                        )}
                    </div>

                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Date of Issue *</label>
                        <input
                            name={"issueDate"}
                            value={bookingFormData.issueDate}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__input"]} type={"date"}/>
                        {isError.issueDate.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.issueDate}
                            </div>
                        )}
                    </div>

                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Value in Rupees *</label>
                        <input name={"amount"}
                               value={bookingFormData.amount}
                               onChange={handleChange}
                               className={PaymentOfflineStyle["payment-offline__input"]} type={"text"}/>
                        {isError.amount.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.amount}
                            </div>
                        )}
                    </div>

                    <div className={PaymentOfflineStyle["payment-offline__input-container"]}>
                        <label className={PaymentOfflineStyle["payment-offline__input-label"]}>Cheque / DD no. *</label>
                        <input
                            name={"chequeNo"}
                            value={bookingFormData.chequeNo}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__input"]} type={"text"}/>
                        {isError.chequeNo.length > 0 && (
                            <div className={PaymentOfflineStyle["invalid__field"]}>
                                {isError.chequeNo}
                            </div>
                        )}
                    </div>
                </div>

                <div className={PaymentOfflineStyle["payment-offline__radio-inputs-wrapper"]}>

                    <label className={PaymentOfflineStyle["payment-offline__radio-input-container"]}>
                        <input
                            name={"accountType"}
                            value={"savings"}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__radio-input"]}
                            type="radio"
                            checked={accountType === "savings"}
                        />
                        Saving Account
                    </label>

                    <label className={PaymentOfflineStyle["payment-offline__radio-input-container"]}>
                        <input
                            name={"accountType"}
                            value={"current"}
                            onChange={handleChange}
                            className={PaymentOfflineStyle["payment-offline__radio-input"]}
                            type="radio"
                            checked={accountType === "current"}
                        />
                        Current Account
                    </label>
                </div>


                <div className={PaymentOfflineStyle["payment-offline__file-upload-wrapper"]}>
                    <div className={PaymentOfflineStyle["payment-offline__upload-box"]}>
                        <label className={PaymentOfflineStyle["payment-offline__file-upload-input"]}>
                            <input
                                accept=".jpg, .jpeg, .png"
                                onChange={handleChange}
                                name={"chequeImg"}
                                type={"file"} hidden={true}/>
                            Upload Cheque
                        </label>
                    </div>
                    <p className={PaymentOfflineStyle["payment-offline__file-upload-text"]}>
                        {selectedImages ? '1' : 'No'} file Selected
                    </p>

                </div>

                {isError.chequeImg.length > 0 && (
                    <div className={PaymentOfflineStyle["invalid__field"]}>
                        {isError.chequeImg}
                    </div>
                )}
                <p className={PaymentOfflineStyle["payment-offline__file-upload-type-text"]}>Allowed File Type: jpg,
                    png</p>
                {selectedImages &&
                    <div className={PaymentOfflineStyle["payment-offline__img"]}>
                        <img src={selectedImages} height={'100%'} alt="image"/>
                    </div>
                }

                <div className={PaymentOfflineStyle["payment-offline_proceed-button-wrapper"]}>
                    <AppRoundButton buttonText={"Back"}
                                    disabled={true}
                                    buttonStyle={PaymentOfflineStyle["payment-offline_proceed-button"]} type={"primary"}
                                    onClick={() => {
                                        onPressStep(1)
                                    }}/>
                    <AppRoundButton buttonText={"Proceed"}
                                    buttonStyle={PaymentOfflineStyle["payment-offline_proceed-button"]} type={"primary"}
                                    onClick={(handleSubmit)}/>
                </div>

            </div>
        </div>
    )
}

export default MakePaymentOffline;
