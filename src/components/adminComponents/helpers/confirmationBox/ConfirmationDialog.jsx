import React from "react";
import confirmationDialogStyles from "./ConfirmationDialog.module.css"

/**
 * @author Vikrant
 * @since 03-03-2023
 * @description to display confirmation dialog
 * @param title
 * @param state
 * @param onClick
 * @param type
 * @param onFormToggleHandle
 * @return {JSX.Element}
 * @constructor
 */
const ConfirmationDialog = ({title, state, onClick, type, onFormToggleHandle}) => {
    const {visible, action, data} = state;

    const onClickHandle = (value) => onClick?.call(this, value)

    const handleCancelClick = () => {
        // onFormToggleHandle(); // call the onFormToggleHandle function
        onClickHandle({visible: false, action: action, data}); // call the onClick function to close the dialog
    }
    const handleDeleteClick = () => {
        // onFormToggleHandle(); // call the onFormToggleHandle function
        onClickHandle({visible: true, action: action, data}); // call the onClick function to perform the delete action
    }

    return (
        <div className={confirmationDialogStyles['dialog__container']}>
            <div className={confirmationDialogStyles['dialog__inner_container']}>
                <div className={confirmationDialogStyles['dialog__content']}>
                    {title?.call()}
                </div>
                <div className={confirmationDialogStyles['dialog__footer']}>
                    <button className={confirmationDialogStyles['dialog__button']}
                            onClick={handleCancelClick}>Cancel
                    </button>
                    <button style={{display: type === 'delete' ? '' : 'none', marginLeft: '1rem'}}
                            className={confirmationDialogStyles['dialog__button']}
                            onClick={handleDeleteClick}>Delete
                    </button>

                    <button style={{display: type === 'update' ? '' : 'none', marginLeft: '1rem'}}
                            className={confirmationDialogStyles['dialog__button']}
                            onClick={handleDeleteClick}>Update
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmationDialog;

export const ConfirmationDialogAction = {
    DELETE_PROPERTY: 'DELETE_PROPERTY',
    DELETE_DEVELOPER: 'DELETE_DEVELOPER',
    DELETE_RM: 'DELETE_RM',
    DELETE_AGENT: 'DELETE_AGENT',
    DELETE_PROPERTY_VARIANT: 'DELETE_PROPERTY_VARIANT',
    DELETE_CE: 'DELETE_CE',
    UPDATE: 'UPDATE',
}
