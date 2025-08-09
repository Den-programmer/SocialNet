import React  from "react"

export type navLinkType = {
    id: number
    name: string
    path: string
    iconKey: string 
    isChosen: boolean
}

export type SidebarIconMapType = {
    [key: string]: React.ElementType
}