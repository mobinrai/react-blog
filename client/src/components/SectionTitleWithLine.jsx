import React from 'react'

const SectionTitleWithLine = ({title,divClassName, headingClassName}) => {
  return (
    <div className={`section-title relative after:content-[''] after:inline-block after:h-0.5 after:bg-[#e8eaed] after:absolute after:left-0 after:right-0 after:top-2.5 ${divClassName ?? ''}`}>
        <h3 className={`relative inline-block bg-white uppercase mt-0 mb-0 z-10 pr-2 font-bold dark:bg-white dark:text-black ${headingClassName ?? ''}`}>{title}</h3>
    </div>
  )
}

export default SectionTitleWithLine