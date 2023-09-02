import * as React from 'react'
import {useState} from 'react'
import MakePaymentStyle from "./MakePayment.module.css";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const MakePayment = () => {

    const [activePayment, setActivePayment] = useState("offline")

    const onPressPayment = (paymentMethod) => {
        setActivePayment(paymentMethod)
    }

    return (
        <div className={MakePaymentStyle["payment"]}>
            <div className={MakePaymentStyle["payment__wrapper"]}>

                <div
                    className={`${MakePaymentStyle["payment__box"]} ${activePayment === "offline" ? MakePaymentStyle["payment__box-active"] : ""}`}
                    onClick={() => setActivePayment("offline")}>
                    <p className={`${MakePaymentStyle["payment__box-text"]} ${activePayment === "offline" ? MakePaymentStyle["payment__box-text-active"] : ""}`}>Offline
                        Payment</p>
                </div>

                <div
                    className={`${MakePaymentStyle["payment__box"]} ${activePayment === "online" ? MakePaymentStyle["payment__box-active"] : ""}`}
                    // onClick={() => setActivePayment("online")}> TODO uncomment this and remove next line to use online payment switch
                    onClick={() => setActivePayment("offline")}>
                    <p className={`${MakePaymentStyle["payment__box-text"]} ${activePayment === "online" ? MakePaymentStyle["payment__box-text-active"] : ""}`}>Online
                        Payment</p>
                </div>
            </div>
        </div>
    )
}

export default MakePayment;
