import React, { useState } from 'react';
import './SidebarBusiness.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faShirt, faBook, faList, faPeopleGroup, faBan, faUsers, faGlobe, faUpload, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import logo from "../../assets/logo.png"

const SidebarAdmin = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [activeSubTabs, setActiveSubTabs] = useState({});
    const tenantURL=useSelector((state)=>state.authBusiness.login?.tenantURL)
    const handleTabClick = (tab) => {
        if (activeTab === tab) {
            setActiveTab(null);
        } else {
            setActiveTab(tab);
        }
    };

    const handleSubTabClick = (subTab) => {
        setActiveSubTabs((prevState) => ({
            ...prevState,
            [activeTab]: prevState[activeTab] === subTab ? null : subTab
        }));
    };

    const tabs = [
        {
            name: 'Dashboard',
            path: `/${tenantURL}/business`,
            icon: faChartSimple,
            subTabs: []
        },
        // {
        //     name: 'Warehouse',
        //     path: '/business/warehouse',
        //     icon: faCube,
        //     subTabs: [
        //         {
        //             name: 'Add Item',
        //             path: '/business/item/add'
        //         },
        //         {
        //             name: 'View Items',
        //             path: '/business/item/view'
        //         }
        //     ]
        // },
        {
            name: 'Product',
            path: `/${tenantURL}/business/product`,
            icon: faShirt,
            subTabs: []
        },
        {
            name: 'Category',
            path: `/${tenantURL}/business/category`,
            icon: faList,
            subTabs: []
        },
        {
            name: 'Order',
            path: `/${tenantURL}/business/order`,
            icon: faBook,
            subTabs: []
        },
        {
            name: 'Customer',
            path: `/${tenantURL}/business/customer`,
            icon: faPeopleGroup,
            subTabs: []
        },
        {
            name: 'Staff',
            path: `/${tenantURL}/business/employee`,
            icon: faUsers,
            subTabs: []
        },
        {
            name: 'Website',
            path: `/${tenantURL}/business/website`,
            icon: faGlobe,
            subTabs: []
        },
        {
            name: 'Import Goods',
            path: `/${tenantURL}/business/import-goods`,
            icon: faUpload,
            subTabs: []
        },
        {
            name: 'Connection Information',
            path: `/${tenantURL}/business/info-shop`,
            icon: faCircleInfo,
            subTabs: []
        },
    ];

    return (
        <div className="sidebar-business-container">
            <div className="logo">
                <img src={logo} alt="logo" className="img-logo"/>
            </div>
            <div className="sidebar-content">
                {tabs.map((tab, index) => (
                    <div key={index}>
                        <Link
                            to={tab.path}
                            className={`sidebar-tab ${activeTab === tab.name.toLowerCase() ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.name.toLowerCase())}
                        >
                            <FontAwesomeIcon icon={tab.icon} className="icon" />
                            <div className="text">{tab.name}</div>
                            {tab.subTabs.length > 0 && (
                                <FontAwesomeIcon
                                    icon={activeTab === tab.name.toLowerCase() ? 'angle-down' : 'angle-right'}
                                    className="sub-tab-arrow"
                                />
                            )}
                        </Link>
                        {activeTab === tab.name.toLowerCase() &&
                            tab.subTabs.map((subTab, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subTab.path}
                                    className={`sub-tab ${activeSubTabs[tab.name.toLowerCase()] === subTab.name.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => handleSubTabClick(subTab.name.toLowerCase())}
                                >
                                    <div className="text">{subTab.name}</div>
                                </Link>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarAdmin;

