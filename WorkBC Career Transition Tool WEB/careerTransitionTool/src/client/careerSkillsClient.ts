import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { ep } from './index'

import { AutocompleteParams, GetAutocompleteResponse, UseGetAutocompleteResponse, GetTransferrableSkillParams, GetTransferrableSkillsResponse, GetReferenceTypeResponse, UseGetReferenceTypeResponse, ReferenceType, UseGetTransferrableSkillsResponse, GetSystemConfigurationParams, GetSystemConfigurationResponse, UseGetSystemConfigurationResponse } from "./careerSkillTypes"
import { getAutoCompleteMinimumLength } from "../helpers/config"

// Autocomplete 
export async function getAutocompleteCareerSkill(params: AutocompleteParams): Promise<GetAutocompleteResponse> {
    try {
      if (!params.partialNOCorTitle) return Promise.resolve([])
      if (params.partialNOCorTitle.length < getAutoCompleteMinimumLength(params.partialNOCorTitle)) return Promise.resolve([])
      const { partialNOCorTitle } = params
      const response: AxiosResponse<GetAutocompleteResponse> = await axios.get(ep.autoComplete.occupations, { params: {partialNOCorTitle: partialNOCorTitle}})
      return Array.isArray(response.data) ? response.data : [] // temp solution to the api bug
    } catch (error) {
      return []
    }
}

export function useGetAutocompleteCareerSkill(params: AutocompleteParams): UseGetAutocompleteResponse {
    const key = new URLSearchParams(params as any).toString()
    const { data: skills, isValidating, error } = useSWR<GetAutocompleteResponse>(key, () => getAutocompleteCareerSkill(params))
    return { skills, isValidating, isSettled: !!skills || !!error }
}

// Select 
export async function getReferenceType(url: string): Promise<GetReferenceTypeResponse> {
    try {
      if (!url) return Promise.resolve([])

      const response: AxiosResponse<GetReferenceTypeResponse> = await axios.get(url)
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      return []
    }
}

export function useGetReferenceType(referenceType: ReferenceType): UseGetReferenceTypeResponse {
    const key = getReferenceTypeUrl(referenceType)
    const { data: codeTypes, isValidating, error } = useSWR<GetReferenceTypeResponse>(key, () => getReferenceType(key),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    })
    return { codeTypes, isValidating, isSettled: !!codeTypes || !!error }
}

function getReferenceTypeUrl(referenceType: ReferenceType):string {
    let url = undefined
    if (referenceType === ReferenceType.salaryRange) {
      url = ep.referenceType.salaryRanges
    } else if (referenceType === ReferenceType.workExperience) {
      url = ep.referenceType.workExperiences
    } else if (referenceType === ReferenceType.educationLevel) {
      url = ep.referenceType.educationLevels
    } else if (referenceType === ReferenceType.similarity) {
      url = ep.referenceType.similarities
    }
    //console.log("reference type request url = " + url)
    return url
}

// ****************************************************************************
// Transferrable Skill
export async function getTransferrableSkills(params: GetTransferrableSkillParams): Promise<GetTransferrableSkillsResponse> {
    try {
      const { code } = params
      const response: AxiosResponse<GetTransferrableSkillsResponse> = await axios.get(ep.occupations.occupations, { params: { NOC: code } })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  
export function useGetTransferrableSkills(params: GetTransferrableSkillParams): UseGetTransferrableSkillsResponse {
    //const key = new URLSearchParams(params as any).toString()
    const { code } = params
    const { data: careerSkills = [], isValidating, error } = useSWR<GetTransferrableSkillsResponse>(code, () => getTransferrableSkills(params!),
      {
        refreshInterval: 0,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }
    )
    return { careerSkills, isValidating, isSettled: !!careerSkills || !!error }
}

// ****************************************************************************
// System Configuration
export async function getSystemConfigurations(params: GetSystemConfigurationParams): Promise<GetSystemConfigurationResponse> {
  try {
    const { name } = params
    const response: AxiosResponse<GetSystemConfigurationResponse> = await axios.get(ep.system.configurations, { params: { SettingName: name } })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export function useGetSystemConfigurations(params: GetSystemConfigurationParams): UseGetSystemConfigurationResponse {
  //const key = new URLSearchParams(params as any).toString()
  const { name } = params
  const { data = [], isValidating, error } = useSWR<GetSystemConfigurationResponse>(name, () => getSystemConfigurations(params!),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )
  return { data, isValidating, isSettled: !!data || !!error }
}
