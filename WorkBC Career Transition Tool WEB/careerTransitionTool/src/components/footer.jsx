import React, { useState, useLayoutEffect } from 'react'
import S from '../styles/footer.module.scss'
import { BackwardOutlined } from '@ant-design/icons'
import { useCareerSkillContext } from "../client/careerSkillContext"

function FooterIcons() {
	return (
		<div className={`${S.socialLinksParent}`}>
			{/* Twitter */}
			<a href="https://twitter.com/WorkBC" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 36 36" focusable="false" className="footerIcon">
					<path fill="#26A7DF" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
					<path fill="#FFF" d="M10.967 11.963s2.51 3.325 6.87 3.555c0 0-.592-1.964 1.218-3.466 1.81-1.505 4.05-.232 4.48.336 0 0 1.274-.2 2.162-.798 0 0-.29 1.15-1.365 1.84 0 0 1.26-.167 1.84-.505 0 0-.61.982-1.67 1.733 0 0 .445 4.15-3.122 7.58-3.567 3.428-9.436 2.715-11.55.92 0 0 2.874.322 4.9-1.404 0 0-2.394-.047-3.083-2.278 0 0 1.196.093 1.403-.138 0 0-2.577-.62-2.6-3.313 0 0 .782.39 1.494.414 0-.002-2.485-1.796-.977-4.477" />
				</svg>
			</a>
			{/* Facebook */}
			<a href="https://www.facebook.com/WorkBC" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 36 36" focusable="false" className="footerIcon">
					<path fill="#4D67A4" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
					<path fill="#FFF" d="M13.843 15.857h2.46v-2.282s-.103-1.49 1.03-2.624c1.132-1.13 2.655-1.023 4.825-.835v2.547h-1.604s-.675-.014-.99.35c-.317.364-.283.884-.283 1.01v1.834h2.783l-.356 2.837h-2.44v7.31h-2.95v-7.324h-2.474v-2.823z" />
				</svg>
			</a>
			{/* Youtube */}
			<a href="https://www.youtube.com/user/WorkBC" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 36 36" focusable="false" className="footerIcon">
					<path fill="#CC181E" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
					<path fill="#FFF" d="M26.177 14.578c-.263-.99-.582-1.6-.96-1.95s-1.164-.436-7.217-.436c-6.052 0-6.837.087-7.215.437-.38.348-.7.96-.96 1.948-.263.99-.292 3.492-.292 3.492 0 3.29.58 4.918 1.338 5.47.758.554 7.13.407 7.13.407s6.373.146 7.13-.407c.756-.553 1.337-2.182 1.337-5.47 0 0-.03-2.503-.29-3.492m-9.893 6.605v-6.227l4.77 3.113-4.77 3.113z" />
				</svg>
			</a>
			{/* LinkedIn */}
			<a href="https://www.linkedin.com/company/official-workbc" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 36 36" focusable="false" className="footerIcon">
					<path fill="#0178B5" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
					<path fill="#FFF" d="M14.862 13.437c0 .8-.65 1.45-1.45 1.45s-1.45-.65-1.45-1.45c0-.802.65-1.45 1.45-1.45s1.45.648 1.45 1.45" />
					<path clipPath="url(#SVGID_2_)" fill="#FFF" d="M12.148 15.98h2.506v8.034h-2.506z" />
					<path fill="#FFF" d="M16.224 24.014h2.494V19.87s-.093-1.876 1.406-1.876 1.395 1.417 1.395 1.885v4.133h2.517v-4.355s.152-3.163-1.698-3.678-3.07.082-3.714 1.136V15.98h-2.4v8.034z" />
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
