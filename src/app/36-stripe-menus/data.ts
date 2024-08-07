import { IconType } from 'react-icons';
import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';

export type SubLink = {
    page: string;
    links: {
        label: string;
        icon: IconType;
        url: string;
    }[];
};

export const sublinks: SubLink[] = [{
    page: 'products',
    links: [
        { label: 'payment', icon: FaCreditCard, url: '/products' },
        { label: 'terminal', icon: FaCreditCard, url: '/products' },
        { label: 'connect', icon: FaCreditCard, url: '/products' },
    ],
}, {
    page: 'developers',
    links: [
        { label: 'plugins', icon: FaBook, url: '/products' },
        { label: 'libraries', icon: FaBook, url: '/products' },
        { label: 'help', icon: FaBook, url: '/products' },
        { label: 'billing', icon: FaBook, url: '/products' },
    ],
}, {
    page: 'company',
    links: [
        { label: 'about', icon: FaBriefcase, url: '/products' },
        { label: 'customers', icon: FaBriefcase, url: '/products' },
    ],
}];
