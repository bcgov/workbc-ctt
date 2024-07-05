import React, { FunctionComponent, createContext, useContext, useState, useReducer } from 'react'
import { CareerSkillModel, FilterOptionModel, MatchedOccupationModel, ReferenceType, ReferenceTypeModel } from './careerSkillTypes'
import { reducer, defaultCareerSkillState } from './careerSkillsReducer'

// State
export interface CareerSkillState {
    searchText?: string,
    selectedNoc?: string,
    searchPerformed: boolean,
    foundSkill: CareerSkillModel,
    similarCareerOptions: MatchedOccupationModel[],
    filteredCareerOptions: MatchedOccupationModel[],
    selectedSkill: MatchedOccupationModel,
    isFilterOptionExpanded: boolean,
    isDetailCardVisible: boolean,
    filterOption?: FilterOptionModel,
    error?: string,
    // config
    profileImagePath: string,
    backgroundImagePath: string,
    carouselNocList: string[],
    // second tile width
    mainBoxWidth: number,
}

export interface CareerSkillContextProps extends CareerSkillState {
    reset: () => void
    setSearchText: (searchText: string) => void
    setSelectedNoc: (selectedNoc: string) => void
    setSearchPerformed: (searchPerformed: boolean) => void
    setSearchResult: (foundSkill: CareerSkillModel) => void
    setSimilarCareerOptions: (careerOptions: MatchedOccupationModel[]) => void
    setFilteredCareerOptions: (careerOptions: MatchedOccupationModel[]) => void
    setFilterOption: (option: ReferenceTypeModel, type: ReferenceType) => void
    setSelectedSkill: (selectedKill: MatchedOccupationModel) => void
    setSelectedSkillVisible: (isVisible: boolean) => void
    setFilterOptionExpanded: (expanded: boolean) => void
    performFiltering: () => void
    // config
    setProfileImagePath: (url: string) => void
    setBackgroundImagePath: (url: string) => void
    setCarouselNocList: (list: string) => void
    // second tile width
    setMainBoxWidth: (width: number) => void
}

const CareerSkillContext = createContext<CareerSkillContextProps>({
    searchText: undefined,
    selectedNoc: undefined,
    searchPerformed: false,
    foundSkill: undefined,
    similarCareerOptions: [],
    filteredCareerOptions: [],
    selectedSkill: undefined,
    isDetailCardVisible: false,
    isFilterOptionExpanded: false,
    // config
    profileImagePath: 'profileimages/',
    backgroundImagePath: 'backgroundimages/',
    carouselNocList: [],
    // second tile width
    mainBoxWidth: 0,
    reset: () => {},
    setSearchText: () => {},
    setSelectedNoc: () => {},
    setSearchPerformed: () => {},
    setSearchResult: () => {},
    setSimilarCareerOptions: () => {},
    setFilteredCareerOptions: () => {},
    setFilterOption: () => {},
    setSelectedSkill: () => {},
    setSelectedSkillVisible: () => {},
    setFilterOptionExpanded: () => {},
    performFiltering: () => {},
    filterOption: undefined,
    error: undefined,
    // config
    setProfileImagePath: () => {},
    setBackgroundImagePath: () => {},
    setCarouselNocList: () => {},
    // second tile width
    setMainBoxWidth: () => {},
})

CareerSkillContext.displayName = 'CareerSkillContext'

const CareerSkillContextProvider: FunctionComponent = ({ children }) => {
    const [ {
        foundSkill, similarCareerOptions, filteredCareerOptions,
        selectedSkill, filterOption
    }, dispatch ] = useReducer(reducer, defaultCareerSkillState)

    const [ searchText, setSearchInputText ] = useState<string>(undefined)
    const [ selectedNoc, setSelectedNocCode ] = useState<string>(undefined)
    const [ searchPerformed, setSearchPerformCompleted ] = useState(false)
    const [ isDetailCardVisible, setDetailCardVisible ] = useState(false)
    const [ isFilterOptionExpanded, setIsFilterOptionExpanded ] = useState(false)
    const [ error, setError ] = useState<any>(undefined)

    const [ profileImagePath, setProfileImageUrl ] = useState<string>('profileimages/')
    const [ backgroundImagePath, setBackgroundImageUrl ] = useState<string>('backgroundimages/')
    const [ carouselNocList, setCarouselNocCodes ] = useState<string[]>([])

    const [ mainBoxWidth, setSearchResultsBoxWidth ] = useState(0)

    function reset() {
        dispatch({ type: 'set-career-skill', payload: defaultCareerSkillState})

        setSearchText(undefined)
        setSelectedNoc(undefined)
        setSearchPerformed(false)
        setDetailCardVisible(false)
        setIsFilterOptionExpanded(false)
        setError(undefined)
    }

    function setSearchResult(matchedSkill: CareerSkillModel) {
        dispatch({ type: 'set-found-skill', payload: matchedSkill})
    }

    function setSearchText(searchInputText: string) {
        setSearchInputText(searchInputText)
    }

    function setSelectedNoc(nocNumberStr: string) {
        setSelectedNocCode(nocNumberStr)
    }

    function setSearchPerformed(searchCompleted: boolean) {
        setSearchPerformCompleted(searchCompleted)
    }

    async function setSimilarCareerOptions(matchedList: MatchedOccupationModel[]) {
        try {
            dispatch({ type: 'set-similar-career-options', payload: matchedList})
            dispatch({ type: 'set-filtered-career-options', payload: matchedList})
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    async function setFilteredCareerOptions(filteredList: MatchedOccupationModel[]) {
        try {
            dispatch({ type: 'set-filtered-career-options', payload: filteredList})
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    async function setFilterOption(option: ReferenceTypeModel, type: ReferenceType) {
        try {
            await updateFilterOption(option, type)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    async function updateFilterOption(option: ReferenceTypeModel, type: ReferenceType) {
        switch(type) {
            case ReferenceType.similarity:
                dispatch({ type: 'set-similarity-option', payload: option})
                break
            case ReferenceType.salaryRange:
                dispatch({ type: 'set-salary-option', payload: option})
                break
            case ReferenceType.educationLevel:
                dispatch({ type: 'set-education-option', payload: option})
                break
            case ReferenceType.workExperience:
                dispatch({ type: 'set-experience-option', payload: option})
                break
        }
    }

    async function performFiltering() {
        try {
            await filter()
            //console.log("filtered list = " + JSON.stringify(filteredCareerOptions) + ", filter option = " + JSON.stringify(filterOption))
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    function setSelectedSkill(selectedSkill: CareerSkillModel) {
        //setFoundSkill({ ...foundSkill })
        //console.log('context : selected skill = ' + selectedSkill?.title + ", noc = " + selectedSkill?.noc)
        dispatch({ type: 'set-selected-skill', payload: selectedSkill})
    }

    function setSelectedSkillVisible(isVisible: boolean) {
        setDetailCardVisible(isVisible)
    }

    function setFilterOptionExpanded(expanded: boolean) {
        setIsFilterOptionExpanded(expanded)
    }

    async function filter() {
        let filteredList: MatchedOccupationModel[] = [ ...similarCareerOptions ]
        if (!!filterOption && (filterOption.similarity?? false) && filterOption.similarity.id != -1) {
            filteredList = filteredList.filter((item) => !!item.similarity && codeMatches(ReferenceType.similarity, item.similarity.id, filterOption.similarity.id))
        }
        if (!!filterOption && (filterOption.salaryRange?? false) && filterOption.salaryRange.id != -1) {
            filteredList = filteredList.filter((item) => !!item.salaryRange && codeMatches(ReferenceType.salaryRange, item.salaryRange.id, filterOption.salaryRange.id))
        }
        if (!!filterOption && (filterOption.education?? false) && filterOption.education.id != -1) {
            filteredList = filteredList.filter((item) => !!item.education && codeMatches(ReferenceType.educationLevel, item.education.id, filterOption.education.id))
        }
        if (!!filterOption && (filterOption.workExperience?? false) && filterOption.workExperience.id != -1) {
            filteredList = filteredList.filter((item) => !!item.workExperience && codeMatches(ReferenceType.workExperience, item.workExperience.id, filterOption.workExperience.id))
        }

        dispatch({ type: 'set-filtered-career-options', payload: filteredList })
    }

    function codeMatches(codeType: ReferenceType, id: number, filterId: number) {
        if (filterId < 0) { // Default Placeholder
            return true
        }
        if (codeType === ReferenceType.similarity) {
            if (filterId === 1) { // All
                return true
            } else {
                return id === filterId   // exact match
            }
        } else {
            return id === filterId   // exact match
        }
    }

    function setProfileImagePath(url: string) {
        setProfileImageUrl(url)
    }

    function setBackgroundImagePath(url: string) {
        setBackgroundImageUrl(url)
    }

    function setCarouselNocList(list: string) {
        if (!!list) {
            setCarouselNocCodes(list.split(','))
        } else {
            setCarouselNocCodes([])
        }
    }

    function setMainBoxWidth(width: number) {
        if (width > 785) // defined as max-width in css
            width = 785;
        if (width < 530) // defined as min-width in css
            width = 530;
        //console.log("set main box width in context: width = " + width)
        setSearchResultsBoxWidth(width > 0? width + 760 : 0)  // sidebar(340) + detail(420) = 760
    }

    return (
        <CareerSkillContext.Provider
          value={{
            searchText,
            selectedNoc,
            searchPerformed,
            foundSkill,
            similarCareerOptions,
            filteredCareerOptions,
            selectedSkill: !!selectedSkill && selectedSkill,
            isDetailCardVisible,
            isFilterOptionExpanded,
            // config
            profileImagePath,
            backgroundImagePath,
            carouselNocList,
            // second tile width
            mainBoxWidth,
            reset,
            setSearchText,
            setSelectedNoc,
            setSearchPerformed,
            setSearchResult,
            setSimilarCareerOptions,
            setFilteredCareerOptions,
            setFilterOption,
            setSelectedSkill,
            setSelectedSkillVisible,
            setFilterOptionExpanded,
            performFiltering,
            //config
            setProfileImagePath,
            setBackgroundImagePath,
            setCarouselNocList,
            // second tile width
            setMainBoxWidth,
            filterOption,
            error,
          }}>
          {children}
        </CareerSkillContext.Provider>
      )
}

const useCareerSkillContext = () => {
    const context = useContext(CareerSkillContext)
    if (!context) throw new Error('useCareerSkillContext must be used within an CareerSkillContextProvider')
    return context
}

export { useCareerSkillContext, CareerSkillContextProvider }