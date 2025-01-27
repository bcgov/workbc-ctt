import React, { useState, useLayoutEffect } from 'react'
import S from '../styles/footer.module.scss'
import { BackwardOutlined } from '@ant-design/icons'
import { useCareerSkillContext } from "../client/careerSkillContext"
import FacebookLogo from '../images/SVG Facebook Logo_(2021).svg'
import InstagramLogo from '../images/Instagram.svg'

function FooterIcons() {
	return (
		<div className={`${S.socialLinksParent}`}>
			{/* Twitter */}
			<a href="https://twitter.com/WorkBC" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 448 512" focusable="false" className="footerIconSquare">
					<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
				</svg>
			</a>
			{/* Facebook */}
			<a href="https://www.facebook.com/WorkBC" target="_blank" rel="noreferrer">
				<img className="footerIconFacebook" src={FacebookLogo} alt="Facebook" />
			</a>
			{/* Youtube */}
			<a href="https://www.youtube.com/user/WorkBC" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 36 36" focusable="false" className="footerIcon">
					<path fill="#CC181E" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
					<path fill="#FFF" d="M26.177 14.578c-.263-.99-.582-1.6-.96-1.95s-1.164-.436-7.217-.436c-6.052 0-6.837.087-7.215.437-.38.348-.7.96-.96 1.948-.263.99-.292 3.492-.292 3.492 0 3.29.58 4.918 1.338 5.47.758.554 7.13.407 7.13.407s6.373.146 7.13-.407c.756-.553 1.337-2.182 1.337-5.47 0 0-.03-2.503-.29-3.492m-9.893 6.605v-6.227l4.77 3.113-4.77 3.113z" />
				</svg>
			</a>
			{/* Instagram */}
			<a href="https://www.instagram.com/workbc.ca" target="_blank" rel="noreferrer">		
				{/*<img className="footerIconInstagram" src={InstagramLogo} alt="Instagram" />*/}
				<img
					src={InstagramLogo}
					style={{ height: 50, width: 50 }}					
					alt="Instagram"
				/>
			</a>
			{/* LinkedIn */}
			<a href="https://www.linkedin.com/company/official-workbc" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 72 72" focusable="false" className="footerIconSquare">
					<path fill="#007EBB" d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" />
					<path fill="#FFF" d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" />
				</svg>
			</a>
		</div>
	)
}

function Footer() {
	const [canTranslate, setCanTranslate] = useState(true)
	const [showArrow, toggleShowArrow] = useState(false)

	const { searchPerformed, isDetailCardVisible, setSelectedSkill, setSelectedSkillVisible, reset } = useCareerSkillContext()

	useLayoutEffect(() => {
		setTimeout(() => {
			try {
				window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element')
				toggleShowArrow(Boolean(window.google.translate))
				setTimeout(() => {
					if (!document.getElementsByClassName('goog-te-combo')[0].children.length) {
						console.log('failure')
						setCanTranslate(false)
					}else{
						document.getElementById("google-translate-container").style.visibility = "visible"
					}
				}, 1000)
			} catch (err) {
				setCanTranslate(false)
				console.error(err)
			}
		}, 2000)
	}, [])

	function handleBackButtonClicked() {
		if (searchPerformed && isDetailCardVisible) {  // the third card is rendered
			setSelectedSkill(undefined)
			setSelectedSkillVisible(false)
		} else if (searchPerformed && !isDetailCardVisible) { // the second card is rendered
			reset()
		}
	}

	return (
		<>
        <footer className={`${S.footer} footer`}>
            <div className={`${S.footerContent}  footercontent`}>
                <div className="footercontent__google-translate">
                    {canTranslate ? (
                        <div id="google-translate-container">
                            <span className={`${S.otherLangs} has-text-centered-desktop column google-translate-desc`}>
                                View in other languages:
                            </span>
                            <div className="googleTranslateParent column" id="google_translate_element">
                                <span id="translateArrow" className={`translateArrow ${showArrow && 'show'}`} />
                            </div>
                        </div>
						) : (
                            <div id="google-translate-container">
                                <span className={`${S.otherLangs} has-text-centered-desktop column google-translate-desc`} />
                            </div>
                        )}
                </div>{/*End of Translate*/}
                <div className="footercontent__social-icons">
                    <FooterIcons />
                </div>
                <div className={`${S.linksParent} footercontent__links`}>
                    <a target="_blank" rel="noreferrer" href="https://www.workbc.ca/Labour-Market-Industry/High-Opportunity-Occupations.aspx" title="Explore High Opportunity Occupations">Explore High Opportunity Occupations</a> |
                    <a target="_blank" rel="noreferrer" href="http://www2.gov.bc.ca/gov/content/home/accessibility">Accessibility</a> |
                    <a target="_blank" rel="noreferrer" href="https://www.workbc.ca/browsers">Browsers</a> |
                    <a target="_blank" rel="noreferrer" href="https://www.workbc.ca/Contact-Us.aspx">Contact Us</a> |
                    <a target="_blank" rel="noreferrer" href="http://www2.gov.bc.ca/gov/content/home/disclaimer">Disclaimer</a> |
                    <a target="_blank" rel="noreferrer" href="http://www2.gov.bc.ca/gov/content/home/privacy">Privacy</a>
                </div>
            </div>
        </footer>
		{ searchPerformed &&
			<div className="mobile-navigation" onClick={handleBackButtonClicked} role="button" tabIndex={0} onKeyUp={() => {}}>
				<BackwardOutlined className="mobile-navigation__icon" style={{ fontSize: '30px'}}/>
				<div className="mobile-navigation__text">
					{isDetailCardVisible? "Back to Search Results" : "Back to Search Career Options"}
				</div>
				<BackwardOutlined className="mobile-navigation__icon" style={{ fontSize: '30px'}}/>
			</div>
		}
	
		</>
	)
}

export default Footer
