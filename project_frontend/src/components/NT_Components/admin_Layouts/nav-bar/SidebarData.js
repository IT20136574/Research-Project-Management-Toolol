import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [

    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <RiIcons.RiDashboard3Fill/>
    },
    {
        title: 'Admin',
        path: '/adminaccount',
        icon: <FaIcons.FaUserAlt/>
    },
    {
        title: 'Allocate Panels',
        path: `/showgroups/${"Accepted"}`,
        icon: <FaIcons.FaUserPlus/>
    },
    {
        title: 'Submition Types',
        path: '/products',
        icon: <HiIcons.HiDocumentDownload/>
    },
    {
        title: 'Marking Schemes',
        path: '/products',
        icon: <HiIcons.HiDocumentAdd />
    },
    {
        title: 'Document/Presentaion',
        path: '/documentPage',
        icon: <HiIcons.HiDocumentDuplicate/>
    },
    {
        title: 'Student management',
        path: '/student',
        icon: <FaIcons.FaUserGraduate/>
    },

    {
      title: 'Staff Management',
      icon: <FaIcons.FaUsers />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
  
      subNav: [
        {
          title: 'Supervisors',
          path: `/supervisor/${"supervisor"}`,
          icon: <FaIcons.FaUserTie />,
          cName: 'sub-nav'
        },
        {
          title: 'Co-Supervisors',
          path: `/CoSupervisor/${"co-supervisor"}`,
          icon: <FaIcons.FaUserTie />,
          cName: 'sub-nav'
        },
        {
          title: 'Panel Members',
          path: `/panalMember/${"panal_member"}`,
          icon: <FaIcons.FaUserFriends />
        }
      ]
    },
  ];
  