export interface SideNavigationProps {
    tabs: {
        [key: string]: {
            name: string;
            iconSrc: string;
            to?: string;
        }
    },
    selectedTab: string;
}