import React, { FunctionComponent, useState, Key, useEffect, useRef } from "react"
import '../styles/main-container.scss'
import '../styles/search-results-box.scss'
import { Col, Button, Table, Typography } from "antd"
import WbRow from "./wbRow"
import SelectReferenceType from "./wbSelectReferenceType"
import { useCareerSkillContext } from "../client/careerSkillContext"
import { ReferenceType, MatchedOccupationModel } from "../client/careerSkillTypes"
import useWindowSize from '../helpers/useWindowSize';
import { defaultFilterOption } from "../client/careerSkillsReducer"
import { getCareerProfileLink } from "../helpers/config"
import SmoothScrolling from "../../static/smoothScrolling"
import CurrencyFormat from "./wbCurrentFormat"
import useResize from "../helpers/useResize"

const { Title, Text } = Typography

const SearchResultsBox: FunctionComponent = () => {
    const { foundSkill, filteredCareerOptions, performFiltering, setMainBoxWidth,
        setSelectedSkillVisible, isFilterOptionExpanded, setFilterOption, setFilterOptionExpanded,
        searchPerformed, filterOption, selectedSkill, setSelectedSkill, reset } = useCareerSkillContext()

    const [width] = useWindowSize()
    const [scrollHeight, setScrollHeight] = useState({ height: 420})
    const [isTableVisible, setIsTableVisible] = useState(true)
    const [currentWidth, setCurrentWidth] = useState(0)

    const ref = useRef()
    const { width: refWidth } = useResize(ref, width - 760)

    useEffect(() => {
        if (!!refWidth) {
            console.log("second tile : width = " + currentWidth?? 0)
            setMainBoxWidth(refWidth)
            setCurrentWidth(refWidth)
        }
    }, [ref.current, refWidth])

    useEffect(() => {
        setIsTableVisible(false)
        filter()
    }, [filterOption])

    useEffect(() => {
        const found:MatchedOccupationModel = filteredCareerOptions.find((item) => item.id === selectedSkill.id )
        setSelectedSkillVisible(!!found)
        if(isMobile()){
            SmoothScrolling.scrollTo('html')
        }
        setIsTableVisible(true)

    }, [filteredCareerOptions, selectedSkill])

    async function filter() {
        try {
            performFiltering()
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            title: 'title',
            width: 150,
            render: (text: string, record: MatchedOccupationModel) => {
                return (
                    <div>
                        {`${text} (NOC ${record.noc})`}
                    </div>
                )
            },
            dataIndex: 'title',
            key: 'title',
        },
    ]


    const scrollTop = () =>{
        SmoothScrolling.scrollTo('html')
    }

    function getUniqueOptions(options) {
        let uniqueOptions = []

        options.forEach(option => {
            if(!(uniqueOptions.map(uniqueOption => uniqueOption.id).includes(option.id))) {
                uniqueOptions.push(option)
            }
        })
        return uniqueOptions
    }

    function toggleSortOptions() {
        if (!isFilterOptionExpanded) {
            setScrollHeight({ height: 420 - 72})
        } else {
            setScrollHeight({ height: 420})
        }
        setFilterOptionExpanded(!isFilterOptionExpanded)
    }

    function onSelect(nocCode: string) {
        const selectedRow =  foundSkill.occupationMatches.find(row => row.noc === nocCode)
        //console.log('selected career = ' + selectedRow.title + ", noc = " + selectedRow.noc)
        setSelectedSkill(selectedRow)
        setSelectedSkillVisible(true)
         //snowplow event pass selectedSkill.noc
         window.snowplow('trackSelfDescribingEvent', {
            schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
            data: {
                current: searchInput.getValue(),
                option: nocCode,
                action: 'select'
            }
        });
    }

    function onClose() {
        window.snowplow('trackSelfDescribingEvent', {
            schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
            data: {
                current: searchInput.getValue(),
                action: 'clear'
            }
        });
        reset()
    }

    function showCareerProfile() {
        let url = getCareerProfileLink(foundSkill.noc)
        var win = window.open(url, '_blank')
        win.focus()
    }

    function onRow(record: any) {
        return {
            onClick: () => {
                onSelect(record.noc)
            },
        }
    }

    function getRowClassName(record: any) {
        return !!selectedSkill && record.id === selectedSkill.id? 'rowSelected' : ''
    }

    function handleChangeSimilarity(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, ReferenceType.similarity)
            } else {
                setFilterOption(defaultFilterOption.similarity, ReferenceType.similarity)
            }
        } catch (error) {
            console.log(error)
        }
        //console.log('Current Filter Option: ' + JSON.stringify(filterOption))
    }

    function handleChangeSalaryRange(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, ReferenceType.salaryRange)
            } else {
                setFilterOption(defaultFilterOption.salaryRange, ReferenceType.salaryRange)
            }
        } catch (error) {
            console.log(error)
        }
        //console.log('Current Filter Option: ' + JSON.stringify(filterOption))
    }

    function handleChangeEducation(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, ReferenceType.educationLevel)
            } else {
                setFilterOption(defaultFilterOption.education, ReferenceType.educationLevel)
            }
        } catch (error) {
            console.log(error)
        }
        //console.log('Current Filter Option: ' + JSON.stringify(filterOption))
    }

    function isMobile() {
        return width < 1024
    }

    function isVisible() {
        let showSecondCard = searchPerformed && !!foundSkill
        if (isMobile()) {
          return showSecondCard && !selectedSkill
        }
        return showSecondCard // desktop
    }

    return (
        <>
        { isVisible() &&
            <div ref={ref} className="mainBox">
                <WbRow style={{ justifyContent: "space-between", marginTop: '-8px'}}>
                    <Col></Col>
                    <Col>
                        <div className="close-button" onClick={onClose}>
                            <svg viewBox="0 0 15 15">
                                <path className="close-button__svg" d="M9.8,7.5l2.8-2.8c0.5-0.5,0.5-1.4,0-2l-0.3-0.3c-0.5-0.5-1.4-0.5-2,0L7.5,5.2L4.7,2.4c-0.5-0.5-1.4-0.5-2,0
	                            L2.4,2.7c-0.5,0.5-0.5,1.4,0,2l2.8,2.8l-2.8,2.8c-0.5,0.5-0.5,1.4,0,2l0.3,0.3c0.5,0.5,1.4,0.5,2,0l2.8-2.8l2.8,2.8
	                            c0.5,0.5,1.4,0.5,2,0l0.3-0.3c0.5-0.5,0.5-1.4,0-2L9.8,7.5z"/>
                            </svg>
                        </div>
                    </Col>
                </WbRow>
                <div className="foundCareerBox">
                    <WbRow className="foundCareerBox__title" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Col span={24}>
                            <a onClick={showCareerProfile}><Text className="titleText"><b>{foundSkill.title}</b> {"(NOC " + foundSkill.noc + ")"}</Text></a>
                        </Col>
                    </WbRow>
                    <WbRow className="foundCareerBox__row" style={{ justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <Col span={12}>
                            <Text className="labelText">Median income:</Text>
                        </Col>
                        <Col style={{ textAlign: "right"}} span={12}>
                            <label className="strong"><CurrencyFormat value={foundSkill?.income} /></label>
                        </Col>
                    </WbRow>
                    <WbRow className="foundCareerBox__row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Col span={10}>
                            <Text className="labelText">Education:</Text>
                        </Col>
                        <Col style={{ textAlign: "right"}} span={14}>
                            <label className="strong">{foundSkill.education.value}</label>
                        </Col>
                    </WbRow>
                </div>
                <div className="resultTitleBox">
                    <WbRow>
                        <Col span={24}>
                            <Title level={3} style={{ fontWeight: 'bold'}}>Your search resulted in <b className="notranslate totalNumber">{getUniqueOptions(filteredCareerOptions).length}</b> similar career options.</Title>
                        </Col>
                    </WbRow>
                    <WbRow style={{ marginTop: -25}}>
                        <Col span={24}>
                            <Text>Select a career below to learn more. Use the Filter By button to modify your results.</Text>
                        </Col>
                    </WbRow>

                    <WbRow className="filterOptions">
                        <Col className="filterOptions__container">
                            <div className="filterOptions__button">
                                <Button onClick={toggleSortOptions}>
                                    <div className="filter-button__text">FILTER BY </div>
                                    {isFilterOptionExpanded?
                                    <svg className="filter-button--up filter-button" viewBox="0 0 18 18">
                                        <circle className="filter-button__circle" cx="9" cy="9" r="9"/>
                                        <path className="filter-button__arrow" d="M14,12.5c-0.4,0-0.8-0.1-1.1-0.4L9,8.1l-3.9,3.9c-0.6,0.6-1.5,0.6-2.1,0s-0.6-1.5,0-2.1L9,3.9l6.1,6.1
                                        c0.6,0.6,0.6,1.5,0,2.1C14.8,12.4,14.4,12.5,14,12.5z"/>
                                    </svg>
                                    :
                                    <svg className="filter-button--down filter-button" viewBox="0 0 18 18">
                                        <circle className="filter-button__circle" cx="9" cy="9" r="9"/>
                                        <path className="filter-button__arrow" d="M4,5.5c0.4,0,0.8,0.1,1.1,0.4L9,9.9l3.9-3.9c0.6-0.6,1.5-0.6,2.1,0s0.6,1.5,0,2.1L9,14.1L2.9,8.1
                                        c-0.6-0.6-0.6-1.5,0-2.1C3.2,5.6,3.6,5.5,4,5.5z"/>
                                    </svg>
                                    }
                                </Button>
                            </div>
                        </Col>
                    </WbRow>
                </div>
                { !isMobile() && isFilterOptionExpanded &&
                <div className="searchOptionBox">
                    <WbRow style={{ alignItems: "center" }}>
                        <Col span={5} style={{paddingRight: '1px'}}>
                            <Text className="labelSmallText">SIMILARITY:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.similarity}
                            colSpan={5} onChange={handleChangeSimilarity}
                            value={filterOption?.similarity.id === -1? undefined : filterOption?.similarity.value}
                            showPlaceHolderAsOption={false}
                            showArrow={true}
                            placeholder={"All"} style={{ width: "100%" }} size="small"/>
                        <Col span={5} style={{paddingRight: '1px'}}>
                            <Text className="labelSmallText">SALARY:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.salaryRange}
                            showPlaceHolderAsOption={true}
                            colSpan={9} onChange={handleChangeSalaryRange}
                            value={filterOption?.salaryRange.id === -1? undefined : filterOption?.salaryRange.value}
                            showArrow={true}
                            placeholder={"Salary range"} style={{ width: "100%" }} size="small"/>
                    </WbRow>
                    <WbRow style={{ alignItems: "center", marginTop: "5px"}}>
                        <Col span={4} style={{paddingRight: '1px'}}>
                            <Text className="labelSmallText">EDUCATION:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.educationLevel}
                            colSpan={6} onChange={handleChangeEducation}
                            value={filterOption?.education.id === -1? undefined : filterOption?.education.value}
                            dropdownMatchSelectWidth={180}
                            showPlaceHolderAsOption={true}
                            showArrow={true}
                            placeholder={"Level"} style={{ width: "100%" }} size="small"/>
                        <Col  span={7} style={{paddingRight: '1px'}}>
                        </Col>
                    </WbRow>
                </div> }
                { isMobile() && isFilterOptionExpanded &&
                <div className="searchOptionBox">
                    <WbRow style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Col span={8}>
                            <Text className="labelSmallText">SIMILARITY:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.similarity}
                            colSpan={16} onChange={handleChangeSimilarity}
                            value={filterOption?.similarity.id === -1? undefined : filterOption?.similarity.value}
                            showPlaceHolderAsOption={false}
                            showArrow={true}
                            placeholder={"All"} style={{ width: "100%" }} size="small"/>
                    </WbRow>
                    <WbRow style={{ justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                        <Col span={8}>
                            <Text className="labelSmallText">SALARY:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.salaryRange}
                            showPlaceHolderAsOption={true}
                            colSpan={16} onChange={handleChangeSalaryRange}
                            value={filterOption?.salaryRange.id === -1? undefined : filterOption?.salaryRange.value}
                            showArrow={true}
                            placeholder={"Salary range"} style={{ width: "100%" }} size="small"/>
                    </WbRow>
                    <WbRow style={{ justifyContent: "space-between", alignItems: "center", marginTop: "5px"}}>
                        <Col span={8}>
                            <Text className="labelSmallText">EDUCATION:</Text>
                        </Col>
                        <SelectReferenceType className="filter-select" referenceType={ReferenceType.educationLevel}
                            colSpan={16} onChange={handleChangeEducation}
                            value={filterOption?.education.id === -1? undefined : filterOption?.education.value}
                            showPlaceHolderAsOption={true}
                            showArrow={true}
                            placeholder={"Level"} style={{ width: "100%" }} size="small"/>
                    </WbRow>
                </div> }
                <div className="searchResultBox">
                    <div className="scrollListBox" style={scrollHeight}>
                    { isTableVisible &&
                        <Table
                        showHeader={false} pagination={false} columns={columns} dataSource={getUniqueOptions(filteredCareerOptions)}
                        locale={{ emptyText: "No search results found"}}
                        rowKey="noc"
                        rowClassName={getRowClassName}
                        onRow={onRow}
                        >
                        </Table>
                    }
                    </div>
                </div>
                <div className="back-to-top">
                    <Button onClick={scrollTop} type="primary" className="back-to-top__button">
                        ^ Back to top
                    </Button>
                </div>

            </div>
        }
        </>
    )
}

export default SearchResultsBox
