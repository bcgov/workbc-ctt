// Model - Transferrable Skill
export interface CareerSkillModel {
    id: number
    noc: string
    title: string
    occupationMatches?: MatchedOccupationModel[]
    similarity?: ReferenceTypeModel
    education?: ReferenceTypeModel
    workExperience?: ReferenceTypeModel
    salaryRange?: ReferenceTypeModel
    income?: string
}

export interface MatchedOccupationModel {
    id: number
    noc: string
    title: string
    similarity?: ReferenceTypeModel
    education?: ReferenceTypeModel
    workExperience?: ReferenceTypeModel
    salaryRange?: ReferenceTypeModel
    income?: string
}

// Model - Filter Options
export interface FilterOptionModel {
    similarity?: ReferenceTypeModel
    education?: ReferenceTypeModel
    workExperience?: ReferenceTypeModel
    salaryRange?: ReferenceTypeModel
    income?: string
}

// Autocomplete
export interface AutocompleteParams {
    partialNOCorTitle?: string
}

export interface GetAutocompleteModel {
    id: number
    noc: string
    nocAndTitle: string
}

export type GetAutocompleteResponse = GetAutocompleteModel[]

export interface UseGetAutocompleteResponse {
    skills?: GetAutocompleteModel[]
    isValidating: boolean
    isSettled: boolean
}

// Select
export enum ReferenceType {
    salaryRange,
    workExperience,
    educationLevel,
    similarity,
}

export interface ReferenceTypeModel {
    id: number
    value: string
}

export type GetReferenceTypeResponse = ReferenceTypeModel[]

export interface UseGetReferenceTypeResponse {
    codeTypes: GetReferenceTypeResponse | undefined
    isValidating: boolean
    isSettled: boolean
}

// Transferrable Skill
export interface GetTransferrableSkillParams {
    code: string
}

export type GetTransferrableSkillsResponse = CareerSkillModel[]

export interface UseGetTransferrableSkillsResponse {
    careerSkills?: CareerSkillModel[]
    isValidating: boolean
    isSettled: boolean
}

// Configuration
export interface GetSystemConfigurationParams {
    name: string
}

export interface SystemConfigurationModel {
    id: number
    name: string
    value: string
}

export type GetSystemConfigurationResponse = SystemConfigurationModel[]

export interface UseGetSystemConfigurationResponse {
    data?: SystemConfigurationModel[]
    isValidating: boolean
    isSettled: boolean
}