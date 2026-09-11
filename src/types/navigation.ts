export interface NavSubItem {
    label: string
    href: string
    icon?: string
}

export interface NavItem {
    label: string
    href: string
    icon?: string
    children?: NavSubItem[]
}
