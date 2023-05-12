import React, { FunctionComponent, useState, useEffect, Key, ReactNode } from 'react'
import { useGetAutocompleteCareerSkill } from '../client/careerSkillsClient'
import WbSelect, { WbSelectProps } from './wbSelect'
import { Empty, Popover, Select, Divider} from 'antd'
import { useDebounce } from 'use-debounce'
import { KEYPRESS_DEBOUNCE, getAutoCompleteMinimumLength } from '../helpers/config'
import { SelectProps } from 'antd/lib/select'
import { useCareerSkillContext } from '../client/careerSkillContext'
import Icon from '@ant-design/icons'

interface OwnProps {
    colSpan: number
    offset?: number
    canChange?: boolean
    errorText?: string
    isMobile: boolean
    maxWidth?: number
    minWidth?: number
    onChange?: (value: string, option: any) => void
    style?: React.CSSProperties | undefined
    warningText?: string
}

type Props = OwnProps & WbSelectProps

const { Option } = Select

const alignConfig = {
    offset: [15, -30],  // the offset of the popover
}

const tooltip = (
    <div className="selectToolTip">
        <p>
            The <b>National Occupation Classification System (NOC)</b> describes all occupations in Canada.
        </p>
    </div>
)

const SelectCareer: FunctionComponent<Props> = ({
    canChange = true,
    colSpan,
    offset,
    errorText,
    //maxWidth,
    minWidth,
    isMobile,
    onChange,
    style,
    placeholder,
    warningText,
    ...rest
}) => {
    const { searchText, setSearchText } = useCareerSkillContext()

    const [debouncedSearchText, cancelDebounce] = useDebounce(
        searchText && searchText.length >= getAutoCompleteMinimumLength(searchText) ? searchText : undefined,
        KEYPRESS_DEBOUNCE,
    )
    const { skills, isValidating } = useGetAutocompleteCareerSkill({
        partialNOCorTitle: debouncedSearchText,
    })

    const [options, setOptions] = useState<SelectProps<object>['options']>([])
    const [matchedOptions, setMatchedOptions] = useState<SelectProps<object>['options']>()
    const [relatedOptions, setRelatedOptions] = useState<SelectProps<object>['options']>()
    const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined)
    const [notificationComponent, setNotificationComponent] = useState<ReactNode | null>(undefined)

    useEffect(() => {
        return cancelDebounce
    }, [cancelDebounce])

    // eslint-disable-next-line
    useEffect(() => {
       if (!!searchText) {
           if (searchText.length < getAutoCompleteMinimumLength(searchText)) {
            setValidationMessage(`Please enter at least ${getAutoCompleteMinimumLength(searchText)} characters`)
           }
       } else {
            setOptions([])
            setMatchedOptions([])
            setRelatedOptions([])
            setValidationMessage(undefined)
       }
    }, [searchText])

    useEffect(() => {
        if (!!validationMessage) {
            setNotificationComponent(<Empty description={validationMessage} image={Empty.PRESENTED_IMAGE_SIMPLE} />)
        } else {
            setNotificationComponent(null)
        }
    }, [validationMessage])

    useEffect(() => {
        if (isValidating) return

        if (!skills) {
            setValidationMessage('No results found')
            setOptions([])
            return
        }

        if (debouncedSearchText) {
            let currentOptions: SelectProps<object>['options'] = searchResult(debouncedSearchText)

            if (!!currentOptions && currentOptions.length > 0) {
                setOptions(currentOptions)
                setValidationMessage(undefined)
            }

        } else {
            if (!!searchText)
                setValidationMessage(`Please enter at least ${getAutoCompleteMinimumLength(searchText)} characters`)
            else {
                setValidationMessage(null)
            }

            let currentOptions: SelectProps<object>['options'] = initialResult()
            if (!!currentOptions && currentOptions.length > 0) {
                setOptions(currentOptions)
            } else {
                setOptions([])
            }
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [skills])

    useEffect(() => {
        if(!!searchText && searchText.length >= getAutoCompleteMinimumLength(searchText)) { // options get generated when searchText is at least of minimum characters
            const matchedOptions = options.filter(option => option.value.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
            const relatedOptions = options.filter(option => option.value.toLowerCase().indexOf(searchText.toLowerCase()) === -1)
            setMatchedOptions(matchedOptions)
            setRelatedOptions(relatedOptions)
        }
    }, [options, searchText])

    const initialResult = () => {
        return skills.map((item) => {
            const category = `${item.nocAndTitle}`
            return {
                key: item.noc,
                value: category,
                label: "NOC " + category,
            }
        })
    }

    const searchResult = (query: string): SelectProps<object>['options'] => {
        return skills
        .map((item) => {
            const category = `${item.nocAndTitle}`
            // console.log('category = ' + category + ', query = ' + query)
            if(!!category && !!query) {
                const found = category.toLowerCase().indexOf(query.toLowerCase())
                // console.log("found index = " + found + ", length = " + query.length)
                if (found >= 0) {
                    const str1 = category.substr(0, found)
                    const str2 = category.substr(found, query.length)
                    const str3 = category.substring(found + query.length)
                    // console.log(" == str1 : " + str1 + ", condition = " + !!str1)
                    // console.log(" == str2 : " + str2)
                    // console.log(" == str3 : " + str3 + ", condition = " + !!str3)
                    if (!str1 && !str3 && !!str2) {
                        // console.log(" =====> selected : " + str2)
                        // const foundDash = str2.toLowerCase().indexOf('-')
                        return {
                            key: item.noc,
                            value: category,
                            label: "NOC " + category
                        }
                    } else {
                        if (!!str1) { // when user enters the text for Job Title
                            return {
                                key: item.noc,
                                value: category,
                                label: <span><span className="notranslate">{"NOC "}{str1}</span><strong>{str2}</strong>{str3?? ''}</span>
                            }
                        } else { // when user enters number for NOC
                            // console.log(" =====> unselected : " + str3)
                            if(!!str3) {
                                const foundDash = str3.toLowerCase().indexOf('-')
                                return {
                                    key: item.noc,
                                    value: category,
                                    label: <span><span className="notranslate">{"NOC "}<strong>{str2}</strong>{str3.substr(0, foundDash)}</span>{str3.substring(foundDash)}</span>
                                }
                            }
                        }
                    }
                } else {
                    // console.log(" =====> not found in select : " + category)
                    return {
                        key: item.noc,
                        value: category,
                        label: "NOC " + category,
                    }
                }
            }
        })
    }

    function handleSearch(value: string) {
        //console.log("on search: value = " + value)
        if (!!value) {
            setSearchText(value)
            //console.log("search text inside select = " + value)
        } else {
            setSearchText(undefined)
        }
    }

    function handleChange(value: Key, options: any) {
        //console.log("on change: value = " + value)
        if (!!value) {
            handleSearch(value.toString())
            onChange?.(value, options)
        } else {
            setSearchText(undefined)
        }
    }

    // function handleSelect(value: string, option: any) {
    //     console.log("on select: value = " + value + ", option = " + JSON.stringify(option))
    // }

    return (
        <WbSelect
            suffixIcon={ canChange &&
            <Popover align={alignConfig} placement={'topRight'} overlayClassName={"search-popover"} trigger={isMobile? "click" : "hover"}
                content={tooltip}>
                <Icon style={{ fontSize: '17px', color:'#00acee', marginTop: '-3px' }}>
                    <svg viewBox="87.5 29.5 25 25" >
                        <circle fill="#5BC2E7" cx="100" cy="42" r="12.5"></circle>
                        <path fill="#234075" d="M101.4 34.7c.4 0 .8.1 1.1.4.3.3.4.7.4 1.1 0 .4-.1.8-.4 1.1-.3.3-.7.4-1.1.4-.4 0-.8-.1-1.1-.4-.3-.3-.4-.7-.4-1.1 0-.4.1-.8.4-1.1.4-.2.7-.4 1.1-.4zm.7 4.8l-2.1 7.3c-.1.4-.2.7-.2.8 0 .1 0 .1.1.2s.1.1.2.1.2-.1.4-.2c.3-.3.7-.7 1.1-1.4l.4.2c-1 1.8-2.1 2.7-3.3 2.7-.4 0-.8-.1-1.1-.4-.3-.3-.4-.6-.4-1 0-.3.1-.6.2-1l1.4-4.9c.1-.5.2-.8.2-1.1 0-.2-.1-.3-.2-.4-.1-.1-.3-.2-.5-.2h-.4l.1-.2 3.5-.6.6.1z">
                        </path>
                    </svg>
                </Icon>
            </Popover>
            }
            colOffset={offset}
            colSpan={colSpan}
            disabled={!canChange}
            placeholder={placeholder}
            errorText={errorText}
            filterOption={false}
            loading={isValidating}
            notFoundContent={notificationComponent}
            onChange={handleChange}
            onSearch={handleSearch}
            showSearch
            style={{ width: '100%', minWidth, height: '40px', ...style }}
            warningText={warningText}
            value={searchText?? undefined}
            virtual={false}
            dropdownRender={(menu) => (
                <>
                {menu}
                </>
            )}
            {...rest}>
                {!!searchText && matchedOptions?.map(option =>
                    (<Option key={option.key} value={option.value}>
                        <span style={{ whiteSpace: 'pre-line' }}>{option.label}</span>
                    </Option>))}
        </WbSelect>
    )
}

export default SelectCareer