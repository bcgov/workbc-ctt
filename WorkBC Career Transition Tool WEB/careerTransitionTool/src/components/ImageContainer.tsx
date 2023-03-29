import React, { CSSProperties, FunctionComponent, useState, useEffect, useRef } from "react"
import '../styles/image-container.scss'
import { getCareerProfileLink, getBackgroundImageName, getPublicUrl } from "../helpers/config"
import { useGetAutocompleteCareerSkill } from "../client/careerSkillsClient"
import useWindowSize from '../helpers/useWindowSize'
import { useCareerSkillContext } from "../client/careerSkillContext"

const initialStyleComponent: CSSProperties = {
    width: "100%",
    height: "auto",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}

const ImageContainer: FunctionComponent = ({children}) => {

    const [width] = useWindowSize()
    const [ index, setIndex ] = useState(1)
    const [ interval, setInterval ] = useState(1)
    const [ imageStyleComponent, setImageStyleComponent ] = useState<CSSProperties>(initialStyleComponent)
    const [ careerProfileLink, setCareerProfileLink ] = useState<string>()
    const  [ currentNoc, setCurrentNoc ] = useState<string>(undefined)
    const [ jobDescription, setJobDescription ] = useState<string>(undefined)

    const { skills, isValidating, isSettled } = useGetAutocompleteCareerSkill({ partialNOCorTitle: currentNoc?? undefined })
    const { isDetailCardVisible, backgroundImagePath, carouselNocList } = useCareerSkillContext()
    
    const indexRef = useRef(index)
    indexRef.current = index

    useEffect(() => {
        if (!!carouselNocList && carouselNocList.length > 0) {
            renderCarouselImage(carouselNocList[0])
            setInterval(15)
        }
    }, [ carouselNocList ])

    useEffect(() => {
        if (!isValidating && isSettled && skills.length === 1) {
            setJobDescription(getJobDescriptionWithNoc(skills[0].nocAndTitle))
            //setInterval(15)
        }
    }, [isSettled, skills])

    useEffect(() => {
        if (!carouselNocList || carouselNocList.length === 0) return
        if (!backgroundImagePath) return

        const timer = setTimeout(() => {
            let i = indexRef.current % carouselNocList.length
            //console.log('image style = ' + JSON.stringify(imageStyleComponent))
            renderCarouselImage(carouselNocList[i])
            indexRef.current = indexRef.current + 1
            setIndex(indexRef.current)
        }, 1000 * interval)
        return () => { 
            clearTimeout(timer) 
            //setIndex(0)
        }
    }, [interval, imageStyleComponent])

    function renderCarouselImage(noc: string) {
        setCurrentNoc(noc)
        let url = getCareerProfileLink(noc)
        setCareerProfileLink(url)

        const imageStyle = getStyleComponent(noc)
        setImageStyleComponent(imageStyle)
    }

    function getStyleComponent(noc: string): CSSProperties {
        const imageUrl: string = backgroundImagePath.startsWith("http")? backgroundImagePath + getBackgroundImageName(noc) 
                                                                : getPublicUrl() + backgroundImagePath + getBackgroundImageName(noc) 
        console.log('background image = ' + imageUrl) 
        const styleComponent: CSSProperties = {
            width: "100%",
            height: "auto",
            backgroundImage: "url(" + imageUrl + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }
        return styleComponent
    }

    function getJobDescriptionWithNoc(nocAndTitle: string) {
        const idx = nocAndTitle.indexOf("-")
        return nocAndTitle.substring(idx + 1).trim()
    }

    function isMobile() {
        return width < 1024
    }

    if (isMobile()) {
        return (
            <div className="imageWrapper">
                {children}
            </div>
        )
    } else {
        return (
            <div className="imageWrapper" style={jobDescription && imageStyleComponent}>
                {children}
                {jobDescription &&
                <div className="imageWrapper__cta">                    
                    <a href={careerProfileLink} className="imageWrapper__link" target="_blank">{jobDescription}</a>
                </div>
                }
                <div className="imageWrapper__flex-border"></div>
                <div className={`imageWrapper__overlay ${!isDetailCardVisible ? "": " imageWrapper__overlay--full"}`}></div>            
            </div>
        )
    }
}

export default ImageContainer