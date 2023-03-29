import { CareerSkillModel, FilterOptionModel, MatchedOccupationModel, ReferenceTypeModel } from './careerSkillTypes'

export const defaultFilterOption = {
    similarity: { id: -1, value: 'All' },
    salaryRange: { id: -1, value: 'Salary range' },
    workExperience:  { id: -1, value: '# of years' },
    education:  { id: -1, value: 'Level' },
}

export interface CareerProfileState {
    foundSkill: CareerSkillModel,
    similarCareerOptions: MatchedOccupationModel[],
    filteredCareerOptions: MatchedOccupationModel[],
    selectedSkill: MatchedOccupationModel,
    filterOption?: FilterOptionModel,
}

export const defaultCareerSkillState: CareerProfileState = Object.freeze({
    foundSkill: undefined,
    similarCareerOptions: [],
    filteredCareerOptions: [],
    selectedSkill: undefined,
    filterOption: defaultFilterOption,
})

export type CareerSkillAction =
| { type: 'set-career-skill'; payload: CareerProfileState }
| { type: 'set-found-skill'; payload: CareerSkillModel }
| { type: 'set-similar-career-options'; payload: MatchedOccupationModel[] }
| { type: 'set-filtered-career-options'; payload: MatchedOccupationModel[] }
| { type: 'set-selected-skill'; payload: CareerSkillModel }
| { type: 'set-similarity-option'; payload: ReferenceTypeModel }
| { type: 'set-salary-option'; payload: ReferenceTypeModel }
| { type: 'set-education-option'; payload: ReferenceTypeModel }
| { type: 'set-experience-option'; payload: ReferenceTypeModel }

export function reducer(state: CareerProfileState = defaultCareerSkillState, action: CareerSkillAction): CareerProfileState {
    switch(action.type) {
        case 'set-career-skill':
            return { ...action.payload }

        case 'set-found-skill':
            return { ...state, foundSkill: action.payload }

        case 'set-selected-skill':
            return { ...state, selectedSkill: action.payload }

        case 'set-similar-career-options':
            return { ...state, similarCareerOptions: [ ...action.payload ] }

        case 'set-filtered-career-options':
            return { ...state, filteredCareerOptions: [ ...action.payload ]}

        case 'set-similarity-option':
            return { ...state, filterOption: { ...state.filterOption, similarity: action.payload }}
        
        case 'set-salary-option':
            return { ...state, filterOption: { ...state.filterOption, salaryRange: action.payload }}

        case 'set-education-option':
                return { ...state, filterOption: { ...state.filterOption, education: action.payload }}

        case 'set-experience-option':
            return { ...state, filterOption: { ...state.filterOption, workExperience: action.payload }}
    }
}

