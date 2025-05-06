import React from 'react'
import FollowUs from './FollowUs'
import SectionTitleWithLine from './SectionTitleWithLine'
import SiteSocialWidget from './SiteSocialWidget'
import NewsLetterForm from './NewsLetterForm'
import MostViewPost from './MostViewPost'

const RightAside = () => {
    return (
        <aside className="flex flex-col gap-4 mt-6 font-[Montserrat]">
            <FollowUs/>
            <SectionTitleWithLine title={'Social Media'}/>
            <SiteSocialWidget/>
            <SectionTitleWithLine title={'NewsLetter'}/>
            <NewsLetterForm/>
            <MostViewPost/>
        </aside>
    )
}

export default RightAside