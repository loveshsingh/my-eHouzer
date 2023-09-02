import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import AppModalStyle from "./AppModal.module.css"

const AppModal = ({show, onClose, title, children,changeBackground}) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose()
        }
    };

    const handleCloseClick = (e) => {
        e.preventDefault()
        onClose();
    }

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [show]);

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);


    const modalContent = show ? (
        <div className={AppModalStyle["modal"]} onClick={handleCloseClick}>
         {/*<div className={changeBackground ? AppModalStyle["modal-changeStyle"] : AppModalStyle["modal"]} onClick={handleCloseClick}>*/}
        <div className={changeBackground ? AppModalStyle["modal-content-changeStyle"] : AppModalStyle["modal-content"]} onClick={e => e.stopPropagation()}>
            <div className={AppModalStyle["modal-body"]}>{children}</div>
        </div>
    </div>) : null

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

export default AppModal;
