import React from 'react'
import FollowUs from './FollowUs'
import SectionTitleWithLine from './SectionTitleWithLine'
import SiteSocialWidget from './SiteSocialWidget'
import NewsLetterForm from './NewsLetterForm'

const RightAside = () => {
  return (
    <aside className="flex flex-col gap-4">
        <FollowUs/>
        <SectionTitleWithLine title={'Social Media'}/>
        <SiteSocialWidget/>
        <SectionTitleWithLine title={'NewsLetter'}/>
        <NewsLetterForm/>
    </aside>
  )
}

export default RightAside