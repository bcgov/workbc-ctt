import { configureHttpClient } from "../helpers/httpClient"
import { useCareerSkillContext } from "../client/careerSkillContext"
import { useGetSystemConfigurations } from "../client/careerSkillsClient"
import useWindowSize from '../helpers/useWindowSize';
import React, { FunctionComponent, useEffect, useState } from "react"
import '../styles/main-container.scss'

const MainContainer: FunctionComponent = ({children}) => {

    const [ profileImageParam, setProfileImageParam ] = useState<string>(undefined) // ProfileImagesPath
    const [ backgroundImageParam, setBackgroundImageParam ] = useState<string>(undefined)  // BackgroundImagesPath
    const [ ImageCarouselParam, setImageCarouselParam ] = useState<string>(undefined)  // ImageCarouselNOCs
    
    const { isDetailCardVisible, mainBoxWidth,
            setProfileImagePath, 
            setBackgroundImagePath,
            setCarouselNocList } = useCareerSkillContext()

    const { data: profileImageUrl, 
            isSettled: isProfileImageUrlSettled,
            isValidating: isProfileImageUrlValidating } = useGetSystemConfigurations({ name: profileImageParam })
    const { data: backgroundImageUrl,
            isSettled: isBackgroundImageUrlSettled,
            isValidating: isBackgroundImageUrlValidating } = useGetSystemConfigurations({ name: backgroundImageParam })
    const { data: carouselNocs, 
            isSettled: isCarouselNocsSettled,
            isValidating: isCarouselNocsValidating } = useGetSystemConfigurations({ name: ImageCarouselParam })
    
    const [width] = useWindowSize()
    const [currentWidth, setCurrentWidth] = useState(0) 

    useEffect(() => {
        configureHttpClient()
        setProfileImageParam('ProfileImagesPath')
        setBackgroundImageParam('BackgroundImagesPath')
        setImageCarouselParam('ImageCarouselNOCs')
    }, [])

    useEffect(() => {
        //console.log("main container: width = " + mainBoxWidth)
        if (!!mainBoxWidth && mainBoxWidth !== 0)
            setCurrentWidth(mainBoxWidth)
    }, [mainBoxWidth])

    useEffect(() => {
        if (!isProfileImageUrlValidating && isProfileImageUrlSettled && !!profileImageUrl && profileImageUrl.length > 0 && !!profileImageUrl[0].value) {
            setProfileImagePath(profileImageUrl[0].value)
        }
    }, [ profileImageUrl, isProfileImageUrlSettled, isProfileImageUrlValidating])

    useEffect(() => {
        if (!isBackgroundImageUrlValidating && isBackgroundImageUrlSettled && !!backgroundImageUrl && backgroundImageUrl.length > 0 && !!backgroundImageUrl[0].value) {
            setBackgroundImagePath(backgroundImageUrl[0].value)
        }
    }, [ backgroundImageUrl, isBackgroundImageUrlSettled, isBackgroundImageUrlValidating])

    useEffect(() => {
        if (!isCarouselNocsValidating && isCarouselNocsSettled && !!carouselNocs && carouselNocs.length > 0 && !!carouselNocs[0].value) {
            setCarouselNocList(carouselNocs[0].value)
        }
    }, [ carouselNocs, isCarouselNocsSettled, isCarouselNocsValidating])

    function isDesktop() {
        return width > 1024
    }

    if (isDetailCardVisible && currentWidth > 0 && isDesktop()) {
        return (
            <div className="mainContent" style={{width: currentWidth}}>
                {children}
            </div>  
        )
    } else {
        return (
            <div className="mainContent">
                {children}
            </div>
        )
    }
}

export default MainContainer