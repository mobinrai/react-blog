import React from 'react'
import PageMainTitle from '../components/PageMainTitle'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import RightAside from '../components/RightAside'

const About = () => {
    console.log('will this run although is not clicked');
    return (
        <section className='blog-section'>
            <PageMainTitle title={'About us'}/>
            <div className="max-w-6xl mx-auto px-2.5 flex flex-col md:flex-row max-md:gap-10 gap-8 my-8">
                <div className="w-2/3 flex flex-col gap-4 md:w-2/3">
                    <SectionTitleWithLine title={'Our Story'} divClassName={'my-4'}/>
                    <p className='-mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid repellat officiis tempora sint assumenda eum! Hic laboriosam fugiat nesciunt laborum magni sequi expedita qui earum iusto praesentium aliquid, neque ab, eligendi voluptates sint consectetur laudantium mollitia nemo voluptatum ipsum aspernatur. Esse maxime hic magni officiis quam, sed consequuntur at dolor, veritatis similique ducimus quos expedita minima? Dolor, et cumque laborum harum explicabo iste excepturi quod ratione at vel necessitatibus reiciendis distinctio nostrum commodi eligendi ex ullam labore perferendis, qui non itaque ea, totam soluta. Maxime possimus dolorum, sunt rerum vel voluptates nulla fugit enim incidunt in facilis dignissimos aliquid?</p>
                    <SectionTitleWithLine title={'Our vision'} divClassName={'my-4'}/>
                    <p className='-mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid repellat officiis tempora sint assumenda eum! Hic laboriosam fugiat nesciunt laborum magni sequi expedita qui earum iusto praesentium aliquid, neque ab, eligendi voluptates sint consectetur laudantium mollitia nemo voluptatum ipsum aspernatur. Esse maxime hic magni officiis quam, sed consequuntur at dolor, veritatis similique ducimus quos expedita minima? Dolor, et cumque laborum harum explicabo iste excepturi quod ratione at vel necessitatibus reiciendis distinctio nostrum commodi eligendi ex ullam labore perferendis, qui non itaque ea, totam soluta. Maxime possimus dolorum, sunt rerum vel voluptates nulla fugit enim incidunt in facilis dignissimos aliquid?</p>
                </div>
                <div className="w-1/3">
                    <RightAside/>
                </div>
            </div>
        </section>
    )
}

export default About