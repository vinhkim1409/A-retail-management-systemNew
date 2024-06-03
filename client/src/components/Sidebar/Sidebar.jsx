import React, { useState } from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [activeSubTabs, setActiveSubTabs] = useState({});

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
            path: '/admin',
            icon: faChartSimple,
            subTabs: []
        },
        {
            name: 'Business',
            path: '/admin/customer',
            icon: faUser,
            subTabs: []
        },
    ];

    return (
        <div className="sidebar-admin">
            <div className="logo">Logo</div>
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

export default Sidebar;


