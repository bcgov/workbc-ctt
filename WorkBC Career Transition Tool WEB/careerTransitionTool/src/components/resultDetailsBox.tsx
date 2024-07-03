import React, { FunctionComponent, useEffect, useState } from "react"
import '../styles/main-container.scss'
import '../styles/result-details-box.scss'
import { Col, Button } from "antd"
import { ForwardOutlined } from '@ant-design/icons'
import { useCareerSkillContext } from "../client/careerSkillContext"
import WbRow from "./wbRow"
import { getCareerProfileLink, getUrlForDefaultProfileImage, getProfileImageName } from "../helpers/config"
import CurrencyFormat from "./wbCurrentFormat"
import SmoothScrolling from "../../static/smoothScrolling"
import useWindowSize from '../helpers/useWindowSize';

const ResultDetailsBox: FunctionComponent = () => {
    const [width] = useWindowSize()
    const { selectedSkill, setSelectedSkill, isDetailCardVisible, setSelectedSkillVisible,
        searchPerformed, foundSkill, profileImagePath } = useCareerSkillContext()

    const [ title, setTitle ] = useState<string | undefined>()

    const [ profileImage, setProfileImage ] = useState<string>(profileImagePath + getProfileImageName(selectedSkill.noc))

    useEffect(() => {
        if (!!selectedSkill) {
            const imageUrl = profileImagePath + getProfileImageName(selectedSkill.noc)
            setProfileImage(imageUrl)
            setTitle(getTitle(selectedSkill.title, selectedSkill.noc))
        }
    }, [ selectedSkill, title ])

    function handleProfileImageError() {
        const imageUrl = getUrlForDefaultProfileImage()
        setProfileImage(imageUrl)
    }

    function onClose() {
        setSelectedSkill(undefined)
        setSelectedSkillVisible(false)
        window.snowplow('trackSelfDescribingEvent', {
            schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
            data: {
                current: searchInput.getValue(),
                action: 'clear'
            }
        });
    }

    function showCareerProfile() {
        let url = getCareerProfileLink(selectedSkill.noc)
        var win = window.open(url, '_blank')
        //win.focus()
        if(isMobile()){
            SmoothScrolling.scrollTo('html')
        }
        //snowplow event pass selectedSkill.noc
        window.snowplow('trackSelfDescribingEvent', {
            schema: 'iglu:ca.bc.gov.workbc/careertransitiontool/jsonschema/1-0-0',
            data: {
                current: searchInput.getValue(),
                option: selectedSkill.noc,
                action: 'view'
            }
        });
    }

    function isMobile() {
        return width < 1024
    }


    function getTitle(title: string, noc: string) {
        return `${title} (NOC ${noc})`
    }

    // required log that resolves the google translator issue.
    console.log('3rd tile : selected skill = ' + selectedSkill.title + ", noc = " + selectedSkill.noc)

    return (
        <>
            { searchPerformed && !!foundSkill && !!selectedSkill && isDetailCardVisible &&
                <div className="detailBox">
                    <WbRow className="close" style={{ justifyContent: "space-between", marginTop: '-8px', marginRight: '-20px'}}>
                        <Col></Col>
                        <Col>
                            <div className="close-button close-button--third" onClick={onClose}>
                                <svg viewBox="0 0 15 15">
                                    <path className="close-button__svg" d="M9.8,7.5l2.8-2.8c0.5-0.5,0.5-1.4,0-2l-0.3-0.3c-0.5-0.5-1.4-0.5-2,0L7.5,5.2L4.7,2.4c-0.5-0.5-1.4-0.5-2,0
                                    L2.4,2.7c-0.5,0.5-0.5,1.4,0,2l2.8,2.8l-2.8,2.8c-0.5,0.5-0.5,1.4,0,2l0.3,0.3c0.5,0.5,1.4,0.5,2,0l2.8-2.8l2.8,2.8
                                    c0.5,0.5,1.4,0.5,2,0l0.3-0.3c0.5-0.5,0.5-1.4,0-2L9.8,7.5z"/>
                                </svg>
                            </div>
                        </Col>
                    </WbRow>
                    <WbRow>
                        <Col span={24}>
                            <span className="titleText">{title}</span>
                        </Col>
                    </WbRow>
                    <img style={{ height: "auto", width: "100%"}}
                        src={profileImage} onError={handleProfileImageError} />
                    <WbRow >
                        <Col className="detailBox__row">
                            <label>Similarity:</label>
                            <label className="strong details detailBox__row--label">{ selectedSkill?.similarity?.value }</label>
                        </Col>
                    </WbRow>
                    <WbRow>
                        <Col className="detailBox__row">
                            <label>Median income:</label>
                            <label className="strong details detailBox__row--label">{selectedSkill?.income == 'N.A.' ? 'Not available' : <CurrencyFormat value={selectedSkill?.income} /> }</label>
                        </Col>
                    </WbRow>
                    <WbRow >
                        <Col className="detailBox__row">
                            <label>Education:</label>
                            <label className="strong details detailBox__row--label">{ selectedSkill?.education?.value }</label>
                        </Col>
                    </WbRow>
                    <WbRow style={{marginTop: 25, justifyContent: "flex-end"}}>
                        <Col>
                            <Button className="detailBox__button" onClick={showCareerProfile}>VIEW FULL CAREER PROFILE  <ForwardOutlined style={{ fontSize: '26px'}}/></Button>
                        </Col>
                    </WbRow>

                </div>
            }
        </>
    )
}

export default ResultDetailsBox
