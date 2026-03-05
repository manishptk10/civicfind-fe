import { FaChartLine, FaClock, FaHouseChimney, FaListUl, FaUsers } from 'react-icons/fa6';
import { FaBoxes, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import { RiMessage2Fill, RiSettings3Fill } from 'react-icons/ri';
import { MdNotificationsActive } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';

export const sidebarItems = [
  {
    name: 'Overview',
    icon: FaHouseChimney,
    link: '/dashboard',
  },
  {
    name: 'Blink Management',
    icon: FaClock,
    link: '/',
  },
  {
    name: 'Topic Management',
    icon: RiMessage2Fill,
    link: '/',
  },
  {
    name: 'Moderation Queue Management',
    icon: FaBoxes,
    link: '/',
  },
  {
    name: 'Role Management',
    icon: FaInfoCircle,
    link: '/role-management',
    roles: ['admin'],
  },
  {
    name: 'Heat Map & Analytics',
    icon: FaChartLine,
    link: '/',
  },
  {
    name: 'User Management',
    icon: FaUserCircle,
    link: '/users-management',
    roles: ['admin'],
  },
  {
    name: 'Staff Management',
    icon: FaUsers,
    link: '/',
  },
  {
    name: 'Notifications',
    icon: MdNotificationsActive,
    link: '/',
  },
  {
    name: 'Settings & Configuration',
    icon: RiSettings3Fill,
    link: '/',
  },
  {
    name: 'Audit Log',
    icon: FaListUl,
    link: '/',
  },
  {
    name: 'Beacon Registry',
    icon: BsFillShieldLockFill,
    link: '/',
  },
];
