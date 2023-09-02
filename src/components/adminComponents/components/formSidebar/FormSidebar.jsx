import React, {useEffect, useRef} from "react";
import formSidebarStyles from "./FormSidebar.module.css"
import {useDispatch, useSelector} from "react-redux";
import {displayDataForm, setAdminPropertyAmenities} from "../../../../actions/adminActions";
import AddAgent from "./agent/addAgent/AddAgent";
import AddRM from "./rm/addRM/AddRM";
import AddBuilder from "./builder/addBuilder/AddBuilder";
import AddProperty from "./property/addProperty/AddProperty";
import CustomerForm from "./customer/CustomerForm";
import CustomerLead from "./marketing/CustomerLead";
import PropertyVariant from "./property/propertyVariant/PropertyVariantForm";
import propertyVariantPopupStyles
    from "../../pages/ce/cePopupComponents/propertyVariantPopup/PropertyVariantPopup.module.css";
import UpdateCustomerRemarks from "./rm/updateRemark/UpdateCustomerRemarks";
import AddCE from "./ce/AddCE";
import PropertyBooking from "./rm/propertyBooking/PropertyBooking";
import UpdatePayment from "./payment/updatePayment/UpdatePayment";

/**
 * @author Vikrant
 * @since 01-03-2023
 * @return {JSX.Element}
 * @constructor
 */
const FormSidebar = () => {

    const dispatch = useDispatch();
    const displayForm = useSelector((state) => state.adminReducer.formToggle);
    const formType = useSelector((state) => state.adminReducer.buttonName);
    const show = useSelector((state) => state.adminReducer.show);
    /*
        useEffect(() => {
            window.scrollTo(0, 0)
        }, [])*/

    const myRef = useRef(null)


    useEffect(() => {
        if (displayForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

    }, [displayForm])

    /**
     * @description to handle form show/hide
     */
    const onFormToggleHandle = () => {
        // to use form scroll at top
        myRef.current.scrollIntoView();

        dispatch(displayDataForm({
            formToggle: false,
            show: false,
            buttonName: '',
            data: []
        }))

        /*to reset the property amenities from reducer*/
        dispatch(setAdminPropertyAmenities([]))

    }

    // return (
    //     <div style={{display: displayForm ? "flex" : "none"}}
    //          className={formSidebarStyles['form__sidebar-main-container']}>
    //
    //         <div className={formSidebarStyles['form__sidebar-toggle']} onClick={onFormToggleHandle}/>
    //
    //         <div className={formSidebarStyles['form__sidebar-container']}>
    //             <div className={formSidebarStyles['form__sidebar-body']}>
    //                 <div className={formSidebarStyles['form__sidebar-close-btn']} onClick={onFormToggleHandle}>
    //
    //                     <span
    //                         className={`material-symbols-rounded ${propertyVariantPopupStyles['admin__sidebar-icons']}`}>
    //                        Close
    //                    </span>
    //                 </div>
    //                 <div>
    //                     {/*to use form scroll at Top*/}
    //                     <span ref={myRef}></span>
    //
    //                     {formType === 'addRm' && <AddRM onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateRm' && <AddRM onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateCustomerRemarks' &&
    //                         <UpdateCustomerRemarks onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'contractedAgent' && <AddAgent onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateAgent' && <AddAgent onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addbuilder' && <AddBuilder onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateBuilder' && <AddBuilder onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addProperty' && <AddProperty onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateProperty' && <AddProperty onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateCustomer' && <CustomerForm onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addLead' && <CustomerLead onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addPropertyVariant' &&
    //                         <PropertyVariant onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updatePropertyVariant' &&
    //                         <PropertyVariant onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addCE' && <AddCE onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updateCE' && <AddCE onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'addPropertyBooking' &&
    //                         <PropertyBooking onFormToggleHandle={onFormToggleHandle}/>}
    //                     {formType === 'updatePayment' &&
    //                         <UpdatePayment onFormToggleHandle={onFormToggleHandle}/>}
    //                 </div>
    //             </div>
    //         </div>
    //
    //     </div>
    // )
    return (
        <div style={{display: displayForm ? "flex" : "none"}}
             className={formSidebarStyles['form__sidebar-main-container']}>

            <div className={formSidebarStyles['form__sidebar-toggle']} onClick={onFormToggleHandle}/>

            <div className={formSidebarStyles['form__sidebar-container']}>
                <div className={formSidebarStyles['form__sidebar-body']}>
                    <div className={formSidebarStyles['form__sidebar-close-btn']} onClick={onFormToggleHandle}>

                        <span
                            className={`material-symbols-rounded ${propertyVariantPopupStyles['admin__sidebar-icons']}`}>
                           Close
                       </span>
                    </div>
                    <div>
                        {/*to use form scroll at Top*/}
                        <span ref={myRef}></span>
                        {formType === 'addRm' && <AddRM onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateRm' && <AddRM onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateCustomerRemarks' &&
                            <UpdateCustomerRemarks onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'contractedAgent' && <AddAgent onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateAgent' && <AddAgent onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addbuilder' && <AddBuilder onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateBuilder' && <AddBuilder onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addProperty' && <AddProperty onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateProperty' && <AddProperty onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateCustomer' && <CustomerForm onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addLead' && <CustomerLead onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addPropertyVariant' &&
                            <PropertyVariant onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updatePropertyVariant' &&
                            <PropertyVariant onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addCE' && <AddCE onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updateCE' && <AddCE onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'addPropertyBooking' &&
                            <PropertyBooking onFormToggleHandle={onFormToggleHandle}/>}
                        {formType === 'updatePayment' &&
                            <UpdatePayment onFormToggleHandle={onFormToggleHandle}/>}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default FormSidebar;
