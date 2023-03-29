import React, { FunctionComponent, Key, useEffect, useState } from "react"
import '../styles/main-container.scss'
import '../styles/search-nav.scss'
import { Button, Col, Divider, Space, Typography } from "antd"
import { ForwardOutlined, CloseOutlined } from '@ant-design/icons'
import WbRow from "./wbRow"
import { MatchedOccupationModel } from "../client/careerSkillTypes"
import { useCareerSkillContext } from "../client/careerSkillContext"
import { useGetTransferrableSkills } from "../client/careerSkillsClient"
import SelectCareer from "./wbSelectSearchableCareer"
import useWindowSize from '../helpers/useWindowSize';

const { Title, Paragraph } = Typography

const SearchNav: FunctionComponent = () => {

    const { searchText, setSearchText,
          selectedNoc, setSelectedNoc,
          searchPerformed, setSearchPerformed, 
          reset, setSearchResult, setSimilarCareerOptions } = useCareerSkillContext()

    const { careerSkills, isSettled, isValidating } = useGetTransferrableSkills({ code: selectedNoc })
    const [width] = useWindowSize()
    const [ errorText, setErrorText ] = useState<string>()

    useEffect(() => {
      if (isSettled && !!careerSkills && careerSkills.length > 0) {
        //console.log("Search result found: " + [...careerSkills])
        setSearchResult(careerSkills[0])

        const similarCareerOptions: MatchedOccupationModel[] 
         = !!careerSkills[0].occupationMatches? 
         careerSkills[0].occupationMatches.map((item) => {
          return (
            {
              id: item.id,
              noc: item.noc,
              title: item.title,
              education: item.education,
              workExperience: item.workExperience,
              salaryRange: item.salaryRange,
              similarity: item.similarity,
              income: item.income,
            }
          )
        }) : []
        setSimilarCareerOptions(similarCareerOptions)
        setSearchPerformed(!searchPerformed)
      }
    }, [careerSkills, isSettled])
    
    function handleChange(value: Key) {
        //console.log("on change: value = " + value)
        if (!!value && value.toString().length > 0) {
          setErrorText(undefined)
          setSearchText(value.toString())
        } else {
          setSearchText(undefined)
        }
    }

    function performSearch() {
      //console.log("search text: value = " + searchText)
      if (!!searchText) {
        setSelectedNoc(searchText.substr(0, 4))
        //snowplow event pass selectedSkill.noc
        window.snowplow('trackSelfDescribingEvent', {
          schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
          data: {
              current: searchText.substr(0, 4),
              action: 'find'
          }
        });
        searchInput.setValue(searchText.substr(0, 4));
      } else {
        setErrorText("Please enter job title, Keyword(s) or NOC.")
      }
    }

    function clearSearch() {
      //snowplow event pass selectedSkill.noc
      window.snowplow('trackSelfDescribingEvent', {
        schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
        data: {
            current: searchText.substr(0, 4),
            action: 'clear'
        }
      });
      reset()
    }

    function isMobile() {
      return width < 1024
    }

    function isVisible() {
      if (isMobile()) {
        return !searchPerformed
      }
      return true  // desktop
    }
    
    if (isVisible()) {
      return (
        <div className="sideBar">
          <div className="sideBar__top">
              <WbRow>
                <Col span={24}>
                  <Title level={1}><span>Looking for a</span>{!isMobile() && <br/>}<span> new career?</span></Title>
                </Col>
              </WbRow>
              <WbRow>
                <Col span={24}>
                  <Paragraph className="lead">Find out what careers you may<br/> be able to transition to based<br/> on your current occupation.</Paragraph>
                </Col>
              </WbRow>
              </div>
              <div className="sideBar__bottom">
              <Divider style={{ marginTop: -5, borderBottomWidth: 2, borderBottomStyle: "dotted", borderBottomColor: "white"}} className="search-divider" />
              <WbRow>
                <Col span={24}>
                  <Title level={1}><span>Explore your</span>{!isMobile() && <br/>} <span>career options</span></Title>
                </Col>
              </WbRow>
              <WbRow>
                <Col span={24}>
                  <label className="large" >Current occupation:</label>
                </Col>
                <SelectCareer
                  canChange={!searchPerformed || !selectedNoc}
                  colSpan={24}
                  isMobile={isMobile()}
                  minWidth={280}
                  //dropdownMatchSelectWidth={400}
                  errorText={errorText}
                  placeholder={"Enter job title, Keyword(s) or NOC"}
                  onChange={handleChange}
                  className="search-input"
                />
              </WbRow>
              { !searchPerformed && 
                <WbRow style={{marginTop: 60, justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <Col>
                      <Space align="center">
                        <Button loading={!!selectedNoc && isValidating} className="icon-btn search-btn" onClick={performSearch}>FIND CAREER OPTIONS <ForwardOutlined style={{ fontSize: '26px'}}/></Button>
                      </Space>
                    </Col>
                </WbRow>
              }
              { searchPerformed && 
                <WbRow className="search-nav-button" style={{marginTop: 60, justifyContent: "flex-end", alignItems: "center"}}>
                    <Col>
                      <Button className="icon-btn" onClick={clearSearch}>CLEAR SEARCH <CloseOutlined style={{ fontSize: '16px'}}/></Button>
                    </Col>
                </WbRow>
              }
          </div>
        </div>
      )
    } else {
      return <></>
    }
}

export default SearchNav