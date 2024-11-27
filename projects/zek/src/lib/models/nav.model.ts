export interface INavItem {
    id?: string | null;
    name?: string | null;
    top?: boolean | null;
    icon?: string | null;
    badge?: string | null;
    path?: string | null;
    data?: {
        roles?: [] | null,
        permission?: { key: number } | null
    } | null;

    children?: INavItem[] | null
}