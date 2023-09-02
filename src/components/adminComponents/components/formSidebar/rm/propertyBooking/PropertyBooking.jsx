import * as React from 'react';
import {useEffect, useState} from 'react';
import propertyBookingStyles from './PropertyBooking.module.css'
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {addPropertyBooking} from "../../../../../../actions/adminActions";
import {regExpNumber} from "../../../../helpers/ValidationsRegEx";
import AppChooser from "../../../../../lib/AppChooser/AppChooser";
import PaymentOfflineStyle from "../../../../../pages/payment/makePaymentOffline/MakePaymentOffline.module.css";
import AppToggleSwitchStyle from "../../../../../../styles/libComponentsStyles/AppToggleSwitch.module.css";
import AppToggleSwitch from "../../../../../lib/AppToggleSwitch";
import AccountTypeToggleSwitch from "../../../../../lib/AppAccountTypeToggleSwitch";

const PropertyBooking = ({onFormToggleHandle}) => {
    const [selectedImages, setSelectedImages] = useState();
    const [imageFormData, setImageFormData] = useState();
    const dataForm = useSelector((state) => state.adminReducer.dataForm);
    const {propertyVariants} = useSelector((state) => state.adminReducer);
    const dispatch = useDispatch()
    const {userDetails} = useSelector((state) => state.authReducer);
    const [accountType, setAccountType] = useState("savings");
    console.log("accountType",accountType)
    const [bookingFormData, setBookingFormData] = useState(
        {
            userId: '',
            propertyId: '',
            variantId: '',
            accountHoldersName: '',
            bankName: '',
            branchName: '',
            chequeNo: '',
            accountType: accountType,
            issueDate: '',
            bookingAmt: '',
            file: '',
            rmId: userDetails?.userId,
        }
    );

    const [isError, setIsError] = useState(bookingFormData);

    /**
     * @author Vipul Garg
     * @since 04-05-2023
     * @description to handle changes at input value onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;

        if (name === 'accountType') {
            // setAccountType(event.target.value);
            // setBookingFormData({...bookingFormData, [name]: event.target.value});
            const newAccountType = accountType === "savings" ? "current" : "savings";
            setAccountType(newAccountType);
            setBookingFormData({ ...bookingFormData, accountType: newAccountType });

        } else if (name === 'bookingAmt') {
            const newValue = event.target.value.replace(regExpNumber, '');
            setBookingFormData({...bookingFormData, [name]: newValue});
        } else if (name === 'file') {
            const selectedFile = event.target.files[0];
            if (selectedFile && (selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")) {
                const image = URL?.createObjectURL(selectedFile);
                setBookingFormData({...bookingFormData, [name]: selectedFile.name});
                setSelectedImages(image);
                setImageFormData(selectedFile);
            }
        } else {
            setBookingFormData({...bookingFormData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vipul Garg
     * @since 04-05-2023
     * @description to check form validations
     */
    const formValidation = () => {
        let newIsError = {...isError};
        newIsError.userId = bookingFormData.userId ? '' : 'This field Required*';
        newIsError.propertyId = bookingFormData.propertyId ? '' : 'This field Required*';
        newIsError.variantId = bookingFormData.variantId ? '' : 'This field Required*';
        newIsError.accountHoldersName = bookingFormData.accountHoldersName ? '' : 'This field Required*';
        newIsError.bankName = bookingFormData.bankName ? '' : 'This field Required*';
        newIsError.branchName = bookingFormData.branchName ? '' : 'This field Required*';
        newIsError.chequeNo = bookingFormData.chequeNo ? '' : 'This field Required*';
        newIsError.issueDate = bookingFormData.issueDate ? '' : 'This field Required*';
        newIsError.bookingAmt = bookingFormData.bookingAmt ? '' : 'This field Required*';
        newIsError.file = bookingFormData.file ? '' : 'This field Required*';

        setIsError(newIsError);

        if (newIsError.userId === ''
            && (newIsError.propertyId === '')
            && (newIsError.variantId === '')
            && (newIsError.accountHoldersName === '')
            && (newIsError.bankName === '')
            && (newIsError.branchName === '')
            && (newIsError.chequeNo === '')
            && (newIsError.issueDate === '')
            && (newIsError.bookingAmt === '')
            && (newIsError.file === '')) {


            const formData = new FormData();
            formData.append('userId', bookingFormData.userId);
            formData.append('propertyId', bookingFormData.propertyId);
            formData.append('variantId', bookingFormData.variantId);
            formData.append('accountHoldersName', bookingFormData.accountHoldersName);
            formData.append('bankName', bookingFormData.bankName);
            formData.append('amount', bookingFormData.bookingAmt);
            formData.append('branchName', bookingFormData.branchName);
            formData.append('chequeNo', bookingFormData.chequeNo);
            formData.append('accountType', bookingFormData.accountType);
            formData.append('issueDate', bookingFormData.issueDate);
            formData.append('rmId', bookingFormData.rmId);
            formData.append('file', imageFormData);

            dispatch(addPropertyBooking(formData, onSuccess))


        }

    }

    /**
     * @author Vipul Garg
     * @since 04-05-2023
     * @description after success the forms
     * @param isSuccess
     */
    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setBookingFormData({
                userId: '',
                propertyId: '',
                variantId: '',
                accountHoldersName: '',
                bankName: '',
                branchName: '',
                chequeNo: '',
                accountType: '',
                issueDate: '',
                bookingAmt: '',
                file: '',
                rmId: '',
            });
            onFormToggleHandle();
        }
    }

    /**
     * @author Vipul Garg
     * @since 04-05-2023
     * @description to add booking
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    };

    useEffect(() => {
        if (dataForm) {
            const rmDetail = dataForm
            setBookingFormData({
                ...bookingFormData,
                userId: rmDetail?.userId,
                propertyId: rmDetail?.propertyId,
            })
        }
    }, [dataForm]);

    return (
        <div className={propertyBookingStyles['add__rm-container']}>
            <div className={propertyBookingStyles['add__rm-header']}>
                <span>Property Booking</span>
            </div>
            <div className={propertyBookingStyles['add__rm-form-container']}>
                <div>
                    <div className={propertyBookingStyles["add__rm"]}>

                        <div className={propertyBookingStyles["add__rm-right-wrapper"]}>

                            <div className={propertyBookingStyles["add__rm-form"]}
                                 onSubmit={handleSubmit}>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>User Name</div>
                                <input name={"userId"} type={"text"} placeholder={"User Name"}
                                       value={dataForm.userName}
                                       onChange={dataForm?.userId ? "" : handleChange}
                                       disabled={!!dataForm?.userId}
                                       style={{opacity: !!dataForm?.userId ? 0.6 : 1}}
                                       className={propertyBookingStyles[isError.userId?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.userId && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Property Name</div>
                                <input name={"propertyId"} type={"text"} placeholder={"Property Name"}
                                       value={dataForm.propertyName}
                                       onChange={dataForm?.userId ? "" : handleChange}
                                       disabled={!!dataForm?.userId}
                                       style={{opacity: !!dataForm?.userId ? 0.6 : 1}}
                                       className={propertyBookingStyles[isError.firstName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.propertyId && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.propertyId}</span>
                                    )}
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={propertyBookingStyles["add__rm-item-name"]}>Variant Name</div>
                                    <select className={propertyBookingStyles["property__variant-selector"]}
                                            placeholder="Type"
                                            name="variantId"
                                            onChange={handleChange}
                                    >
                                        <option value={""} selected disabled hidden>{
                                            "Select Variant Name"}</option>
                                        {propertyVariants?.map((propertyVariant) => (
                                            <option key={propertyVariant.id} value={propertyVariant.id}>
                                                {propertyVariant.name} {propertyVariant.type}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={propertyBookingStyles["invalid__field_display"]}>
                                        <span className={propertyBookingStyles["empty"]}></span>
                                        {isError.type && (
                                            <span
                                                className={propertyBookingStyles["invalid__field"]}>{isError.type}</span>
                                        )}
                                    </div>
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Account Holder Name</div>
                                <input name={"accountHoldersName"} type={"text"} placeholder={"Account Holder Name"}
                                       value={bookingFormData.accountHoldersName}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.accountHoldersName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.accountHoldersName && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.accountHoldersName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Bank Name</div>
                                <input name={"bankName"} type={"text"} placeholder={"Bank Name"}
                                       value={bookingFormData.bankName}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.bankName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.bankName && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.bankName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Branch Name</div>
                                <input name={"branchName"} type={"text"} placeholder={"Branch Name"}
                                       value={bookingFormData.branchName}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.branchName?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.branchName && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.branchName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Cheque No.</div>
                                <input name={"chequeNo"} type={"text"} placeholder={"Cheque No"}
                                       value={bookingFormData.chequeNo}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.chequeNo?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.chequeNo && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.chequeNo}</span>
                                    )}
                                </div>

                                {/*<input name={"accountType"} type={"text"} placeholder={"Account Type"}*/}
                                {/*       value={bookingFormData.accountType}*/}
                                {/*       onChange={handleChange}*/}
                                {/*       className={propertyBookingStyles[isError.accountType?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>*/}
                                {/*<div className={propertyBookingStyles["invalid__field_display"]}>*/}
                                {/*    {isError.accountType && (*/}
                                {/*        <span className={propertyBookingStyles["invalid__field"]}>{isError.accountType}</span>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Account Type</div>
                                <div className={propertyBookingStyles["payment-offline__radio-inputs-wrapper"]}>

                                    {/*<label className={propertyBookingStyles["payment-offline__radio-input-container"]}>*/}
                                    {/*    <input*/}
                                    {/*        name={"accountType"}*/}
                                    {/*        value={"savings"}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        className={propertyBookingStyles["payment-offline__radio-input"]}*/}
                                    {/*        type="radio"*/}
                                    {/*        checked={accountType === "savings"} // Use state to determine checked state*/}

                                    {/*    />*/}
                                    {/*    Saving Account*/}
                                    {/*</label>*/}

                                    {/*<label className={propertyBookingStyles["payment-offline__radio-input-container"]}>*/}
                                    {/*    <input*/}
                                    {/*        name={"accountType"}*/}
                                    {/*        value={"current"}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        className={propertyBookingStyles["payment-offline__radio-input"]}*/}
                                    {/*        type="radio"*/}
                                    {/*        checked={accountType === "current"} // Use state to determine checked state*/}
                                    {/*    />*/}
                                    {/*    Current Account*/}
                                    {/*</label>*/}
                                    {/*<AppToggleSwitch name={"yes"}/>*/}
                                    <div>
                                        <span style={{marginRight: "1rem",color: "#747474"}}>Saving</span>
                                        <span style={{height:"1rem"}}>
                                    <AccountTypeToggleSwitch accountType={accountType} handleChange={handleChange}/>
                                        </span>
                                        <span style={{marginLeft: "1rem",color: "#747474"}}>Current</span>
                                    </div>
                                    {/*<div className={AppToggleSwitchStyle["toggle-switch"]}>*/}
                                    {/*    <input*/}
                                    {/*        type="checkbox"*/}
                                    {/*        className={AppToggleSwitchStyle["toggle-switch-checkbox"]}*/}
                                    {/*        name="accountType"*/}
                                    {/*        id="accountType"*/}
                                    {/*        checked={accountType !== "savings"}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*    />*/}
                                    {/*    <label className={AppToggleSwitchStyle["toggle-switch-label"]} htmlFor="accountType">*/}
                                    {/*        <span className={AppToggleSwitchStyle["toggle-switch-inner"]}>*/}
                                    {/*            /!*{accountType === "savings" ? "Saving" : "Current"} Account*!/*/}
                                    {/*        </span>*/}
                                    {/*        <span className={AppToggleSwitchStyle["toggle-switch-switch"]} />*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}
                                </div>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {/*{isError.branchName && (*/}
                                    {/*    <span*/}
                                    {/*        className={propertyBookingStyles["invalid__field"]}>{isError.branchName}</span>*/}
                                    {/*)}*/}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Issue Date</div>
                                <input name={"issueDate"} type={"date"} placeholder={"Issue Date"}
                                       value={bookingFormData.issueDate}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.issueDate?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.issueDate && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.issueDate}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Amount</div>
                                <input name={"bookingAmt"} type={"text"} placeholder={"Amount"}
                                       value={bookingFormData.bookingAmt}
                                       onChange={handleChange}
                                       className={propertyBookingStyles[isError.bookingAmt?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}/>
                                </div>
                                <div className={propertyBookingStyles["invalid__field_display"]}>
                                    <span className={propertyBookingStyles["empty"]}></span>
                                    {isError.bookingAmt && (
                                        <span
                                            className={propertyBookingStyles["invalid__field"]}>{isError.bookingAmt}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyBookingStyles["add__rm-item-name"]}>Image</div>
                                <AppChooser onChange={handleChange} type={'image'} label={'Choose Image:'}
                                            keyId={'file'}
                                            multiple={''}
                                            labelClassName={propertyBookingStyles[isError.file?.length > 0 ? "add__rm-name-input-outline" : "add__rm-name-input"]}
                                            description={selectedImages ? ` 1 file` : ' No file chosen'}
                                            // buttonStyle={propertyBookingStyles["add__rm-app-chooser-button-style"]}
                                />
                                </div>
                                <div style={{display:"flex"}}>
                                <span className={propertyBookingStyles["empty"]}></span>
                                    <span className={PaymentOfflineStyle["payment-offline__file-upload-type-text"]} style={{fontSize:"0.9rem"}}>Allowed File Type: jpg,png</span>
                                    </div>


                                <div>
                                    {selectedImages &&
                                        <div className={propertyBookingStyles["property__variant-form-image-wrapper"]}>
                                            <span className={propertyBookingStyles["empty"]}></span>
                                            <img className={propertyBookingStyles["property__variant-image"]}
                                                 src={selectedImages} alt="image"/>
                                        </div>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={propertyBookingStyles["add__rm-send-button-wrapper"]}>
                <AppRoundButton onClick={handleSubmit}
                                buttonText={"Add"}
                                buttonStyle={propertyBookingStyles["add__rm-send-button"]}
                                type={"primary"}
                />
            </div>
        </div>
    );
};

export default PropertyBooking;
