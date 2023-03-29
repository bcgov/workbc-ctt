import React,  { FunctionComponent } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ErrorBoundary from '../components/errorBoundary'
import SearchNav from '../components/searchNav'
import MainContainer from '../components/mainContainer'
import SearchResultsBox from '../components/searchResultsBox'
import ResultDetailsBox from '../components/resultDetailsBox'
import { CareerSkillContextProvider } from '../client/careerSkillContext'
import ImageContainer from '../components/ImageContainer'

const Index: FunctionComponent = () => {    
    return (
    <CareerSkillContextProvider>
        <Layout>
            <SEO title="WorkBC - Career Transition Tool" />
            <ErrorBoundary>
                <MainContainer>
                    <SearchNav/>
                    <ImageContainer>
                        <SearchResultsBox/>
                        <ResultDetailsBox/>
                    </ImageContainer>
                </MainContainer>
            </ErrorBoundary>
        </Layout>
    </CareerSkillContextProvider>
    )
}

export default Index