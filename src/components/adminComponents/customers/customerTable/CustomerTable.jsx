import React from "react";
import customerTableStyles from "./CustomerTable.module.css"
import Searchbar from "../../components/searchbar/Searchbar";

const CustomerTable = () => {

    return (

        <div className={customerTableStyles["customer__table-container"]}>

            <Searchbar/>

            <div className={customerTableStyles["customer__table-wrapper"]}>
                <table className={customerTableStyles["customer__table"]}>
                    <thead>
                    <tr className={customerTableStyles["customer__table-heading-container"]}>
                        <th className={customerTableStyles["customer__table-th"]}>ID No.</th>
                        <th className={customerTableStyles["customer__table-th"]}>user Name</th>
                        <th className={customerTableStyles["customer__table-th"]}>User email Id</th>
                        <th className={customerTableStyles["customer__table-th"]}>Contact No.</th>
                        <th className={customerTableStyles["customer__table-th"]}>Current Role</th>
                        <th className={customerTableStyles["customer__table-th"]}>RM</th>
                        <th className={customerTableStyles["customer__table-th"]}>Operations</th>
                        <th className={customerTableStyles["customer__table-th"]}>Contact No.</th>
                        <th className={customerTableStyles["customer__table-th"]}>Current Role</th>
                        <th className={customerTableStyles["customer__table-th"]}>RM</th>
                        <th className={customerTableStyles["customer__table-th"]}>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={customerTableStyles["customer__table-tr"]}>
                        <td className={customerTableStyles["customer__table-td"]}>01</td>
                        <td className={customerTableStyles["customer__table-td"]}>Abc</td>
                        <td className={customerTableStyles["customer__table-td"]}>abc@gmail.com</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                    </tr>
                    <tr className={customerTableStyles["customer__table-tr"]}>
                        <td className={customerTableStyles["customer__table-td"]}>01</td>
                        <td className={customerTableStyles["customer__table-td"]}>Abc</td>
                        <td className={customerTableStyles["customer__table-td"]}>abc@gmail.com</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                    </tr>
                    <tr className={customerTableStyles["customer__table-tr"]}>
                        <td className={customerTableStyles["customer__table-td"]}>01</td>
                        <td className={customerTableStyles["customer__table-td"]}>Abc</td>
                        <td className={customerTableStyles["customer__table-td"]}>abc@gmail.com</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                    </tr>
                    <tr className={customerTableStyles["customer__table-tr"]}>
                        <td className={customerTableStyles["customer__table-td"]}>01</td>
                        <td className={customerTableStyles["customer__table-td"]}>Abc</td>
                        <td className={customerTableStyles["customer__table-td"]}>abc@gmail.com</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                    </tr>
                    <tr className={customerTableStyles["customer__table-tr"]}>
                        <td className={customerTableStyles["customer__table-td"]}>01</td>
                        <td className={customerTableStyles["customer__table-td"]}>Abc</td>
                        <td className={customerTableStyles["customer__table-td"]}>abc@gmail.com</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                        <td className={customerTableStyles["customer__table-td"]}>xxxxx-xxxxx</td>
                        <td className={customerTableStyles["customer__table-td"]}>Active</td>
                        <td className={customerTableStyles["customer__table-td"]}>xyz</td>
                        <td className={customerTableStyles["customer__table-td"]}>Any</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CustomerTable;
