import React from "react";
import CalendarComponentStyle from "./CalendarComponent.module.css"

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom AppDatePIcker Component.
 * @since 10-12-2022
 */
const CalendarComponent = () => {


    return (
        <div className={CalendarComponentStyle["calendar"]}>
            <div></div>
            <div className={CalendarComponentStyle[""]}>
                <table className={CalendarComponentStyle[""]}>
                    <thead className={CalendarComponentStyle["calendar__calender-row"]}>
                    <th className={CalendarComponentStyle["calendar-cell"]}>M</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>Tu</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>W</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>Th</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>Fri</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>Sa</th>
                    <th className={CalendarComponentStyle["calendar-cell"]}>Su</th>
                    </thead>
                    <tbody>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>29</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>30</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>31</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>1</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>2</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>3</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>4</td>
                    </tr>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>5</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>6</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>7</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>8</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>9</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>10</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>11</td>
                    </tr>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>12</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>13</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>14</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>15</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>16</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>17</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>18</td>
                    </tr>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>19</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>20</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>21</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>22</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>23</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>24</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>25</td>
                    </tr>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>26</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>27</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>28</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>29</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>30</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>1</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>2</td>
                    </tr>
                    <tr className={CalendarComponentStyle["calendar__calender-row"]}>
                        <td className={CalendarComponentStyle["calendar-cell"]}>3</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>4</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>5</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>6</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>7</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>8</td>
                        <td className={CalendarComponentStyle["calendar-cell"]}>9</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CalendarComponent
