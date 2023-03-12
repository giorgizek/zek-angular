export interface Nav {
    id?: string | null;
    name?: string | null;
    icon?: string | null;
    children: NavItem[]
}
export interface NavItem {
    name?: string | null;
    top?: boolean | null;
    icon?: string | null;
    badge?: string | null;
    path?: string | null;
    data?: {
        roles?: [] | null,
        permission?: { key: number } | null
    } | null
}