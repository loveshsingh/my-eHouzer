import * as React from 'react'
import TopDeveloperTabStyle from "./TopDeveloperTab.module.css";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const TopDeveloperTab = ({activeTab, developerIcon, onClickTab, tabId}) => {

    const onClickDeveloperTab = (tabId) => {
        onClickTab(tabId)
    }

    return (
        <div className={TopDeveloperTabStyle["tab"]} onClick={() => onClickDeveloperTab(tabId)}>
            <div
                className={`${TopDeveloperTabStyle["tab__wrapper"]} ${activeTab ? TopDeveloperTabStyle["tab__wrapper--active"] : ""}`}>
                <img src={developerIcon} alt={"text"} className={TopDeveloperTabStyle["tab__image"]}/>
            </div>
            <div style={{display: activeTab ? "block" : "none"}}
                 className={TopDeveloperTabStyle["tab__selector"]}/>
        </div>
    )
}

export default TopDeveloperTab;
