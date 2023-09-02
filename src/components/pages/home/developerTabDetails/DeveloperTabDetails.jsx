import * as React from 'react'
import {useEffect, useState} from 'react'
import DeveloperTabDetailsStyle from "./DeveloperTabDetails.module.css";
import {useSelector} from "react-redux";
import Link from "next/link";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const DeveloperTabDetails = ({activeTabId, tabHeading, tabDetails}) => {
    const {topDevelopers} = useSelector((state) => state.homeReducer)
    const [developerName, setDeveloperName] = useState('');
    const [developerId, setDeveloperId] = useState('');
    const [developerDescription, setDeveloperDescription] = useState('');

    useEffect(() => {
        if (topDevelopers.length > 0) {
            setDeveloperName(topDevelopers[activeTabId].name)
            setDeveloperId(topDevelopers[activeTabId].id)
            setDeveloperDescription(topDevelopers[activeTabId].description)
        }
    }, [topDevelopers, activeTabId])

    return (
        <div className={DeveloperTabDetailsStyle["tab-details"]}>
            <div className={DeveloperTabDetailsStyle["tab-details__heading-wrapper"]}>
                <h1 className={DeveloperTabDetailsStyle["tab-details__heading"]}>{developerName}</h1>
            </div>
            <p className={DeveloperTabDetailsStyle["tab-details__desc"]}>{developerDescription.substring(0, 650) + "...."}
                <Link href={`/search?developerId=${developerId}`}>
                    <span style={{textAlign: "right", fontSize: "16px"}}
                          className={DeveloperTabDetailsStyle["tab-details__view-more"]}>
                        <u>View More</u>
                    </span>
                </Link>
            </p>
        </div>
    )
}

export default DeveloperTabDetails;
