import * as React from 'react'
import DevelopersTabsStyle from "./DevelopersTabCarousel.module.css"
import TopDeveloperTab from "../topDeveloperTab/TopDeveloperTab.jsx";


/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const DevelopersTabsCarousel = ({developers, activeTabId, onPressDeveloperTab}) => {

    // const [activeTabId, setActiveTabId] = useState(3);
    //
    // const onPressDeveloperTab = (tabId: number) => {
    //     console.log("tabId: ", tabId)
    //     setActiveTabId(tabId);
    // }

    return (
        <div className={DevelopersTabsStyle["developer-tabs-wrapper"]}>
            {developers.map((developer, i) => {
                return (
                    <TopDeveloperTab key={developer.id} activeTab={activeTabId === i} developerIcon={developer?.media?.url}
                                     onClickTab={onPressDeveloperTab} tabId={i}/>)
            })}
            {/*<TopDeveloperTab activeTab={activeTabId === 1} onClickTab={onPressDeveloperTab} tabId={1}/>
            <TopDeveloperTab activeTab={activeTabId === 2} onClickTab={onPressDeveloperTab} tabId={2}/>
            <TopDeveloperTab activeTab={activeTabId === 3} onClickTab={onPressDeveloperTab} tabId={3}/>
            <TopDeveloperTab activeTab={activeTabId === 4} onClickTab={onPressDeveloperTab} tabId={4}/>
            <TopDeveloperTab activeTab={activeTabId === 5} onClickTab={onPressDeveloperTab} tabId={5}/>*/}
        </div>
    )
}

export default DevelopersTabsCarousel;
