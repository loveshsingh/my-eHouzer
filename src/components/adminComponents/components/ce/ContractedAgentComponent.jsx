import ceDashboardStyles from "../../pages/ce/CEDashboard.module.css";
import {CONTRACTED_AGENT_COLUMN} from "../../constants/Constant";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {displayDataForm, fetchAgents} from "../../../../actions/adminActions";
import AppRoundButton from "../../../lib/AppRoundButton";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import {Role} from "../../constants/role";
import AppPagination from "../../../lib/AppPagination/AppPagination";

const ContractedAgentComponent = () => {

    const [agents, setAgents] = useState([])
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const {agentsListMetaData, agentsListLoading} = useSelector((state) => state.adminReducer);


    const contractedAgents = useSelector((state) => state.adminReducer.agentsList);
    const displayForm = useSelector((state) => state.adminReducer.formToggle);
    const show = useSelector((state) => state.adminReducer.show);

    const dispatch = useDispatch();

    const handleAddContractedAgent = () => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'contractedAgent',
            data: []
        }))
    };
    useEffect(() => {
        setAgents(contractedAgents)
    }, [contractedAgents]);

    const onUpdateAgent = (agent) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateAgent',
            data: {agent}
        }))
    }

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadContractedAgents()
    }


    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchAgents(data))
    }

    return (
        <div className={ceDashboardStyles['ce__table-section-container']}>

            <div className={ceDashboardStyles['ce__heading-table-wrapper']}>
            <div className={ceDashboardStyles['ce__table-btn-wrapper']}>
                <div className={ceDashboardStyles['ce__section-heading']}>
                    <h3>Contracted Agents</h3>
                </div>
                <div style={{display:"flex"}}>
                    <div style={{marginRight:"1rem"}}>
                        <AppRoundButton onClick={handleAddContractedAgent} buttonText={"Add Agent"}
                                        buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                        type={"secondary"}/>
                    </div>
                <div>
                    {userDetails?.userRoleList[0].id === Role.ADMIN &&

                        <div>
                            {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                            {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                            {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                            <AppIcon name={'uiw:file-excel'}
                                     color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                     style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                        </div>
                    }
                </div>
                </div>
            </div>
            <div className={ceDashboardStyles['ce__table-wrapper']}>
                <table className={ceDashboardStyles['ce__table']}>
                    <thead className={ceDashboardStyles['ce__table-thead']}>
                    <tr className={ceDashboardStyles['ce__table-heading-container']}>
                        {CONTRACTED_AGENT_COLUMN.map((header, i) => (
                            <th key={i} className={ceDashboardStyles['ce__table-th']}>
                                {header.name}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    {(!agentsListLoading && agents.length > 0) ? (
                        <>
                            {agents?.map((agent, i) => (
                                <tr className={`${ceDashboardStyles['ce__table-tr']} ${i % 2 !== 0 ? ceDashboardStyles['ce__table-even-row'] : ''}`}
                                 key={agent.userId}>
                                    <td className={ceDashboardStyles['ce__table-td-center']}
                                        onClick={() => onUpdateAgent(agent)}>{i + 1}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{agent.firstName}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{agent.lastName}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{agent.contactNo}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{agent.emailId}</td>
                                    <td className={ceDashboardStyles['ce__table-td-center']}>{agent.customerCount}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateAgent(agent)}>{agent.remarks}</td>
                                </tr>
                            ))}
                        </>
                    ) : (!agentsListLoading && agents.length === 0) ? (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="8" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    No Data Found
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="8" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    Loading...
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
                <AppPagination onSelect={onSelect} totalItems={agentsListMetaData?.totalCount}/>
            </div>

        </div>
    )
}

export default ContractedAgentComponent
