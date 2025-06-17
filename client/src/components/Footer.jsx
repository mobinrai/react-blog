import useFetchTags from '../hooks/useFetchTags'
import DisplayMessage from './DisplayMessage'
import Loading from './Loading'

const Footer = () => {
    const {allTags, isError, isPending, error, isSuccess} = useFetchTags()

    if (isPending) return <Loading />
    if (isError) return <DisplayMessage message="Error loading tags." />
    
    return (
        <section className="footer-section max-w-6xl mx-auto px-4 flex flex-col gap-4 text-white">
            <div className="top-wrapper px-4 flex flex-col md:flex-row gap-8">
                <div className="left-widget md:flex-1">
                    <a href="http://" className='text-3xl font-bold'>MyBl<span className="text-[#ee4276]">o</span>g</a>
                    <p className='mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, reiciendis?</p>
                    
                </div>
                <div className="middle-widget md:flex-1">
                    <h3 className='text-white font-bold  uppercase dark:text-black'>quick links</h3>
                        <nav id="footer-menu" className="flex flex-col flex-wrap gap-2 mt-6">
                            <a href="/" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>home</a>
                            <a href="/about" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>about us</a>
                            <a href="/contact" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>contact</a>
                        </nav>
                </div>
                {
                    (isSuccess && allTags.length > 0) &&
                    <div className="middle-right-widget md:flex-1">
                        <h3 className='text-white font-bold uppercase mb-6 dark:text-black'>tags</h3>
                        <ul className="tags-widget mt-3 ">
                            {
                                allTags.map((item, index)=>{
                                    return (
                                        <li key={item+index} className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>{item}</a></li>
                                    )
                                })
                            } 
                        </ul>
                    </div>
                }
                
                {/* <div className="right-widget md:flex-1">
                    <h3 className='text-white font-bold uppercase mb-6 dark:text-black'>newsletter</h3>
                    <NewsLetterForm/>
                </div> */}
            </div>
            <div className="bottom-wrapper px-4 pt-5 mt-8 flex flex-col gap-4 md:justify-between md:flex-row-reverse border-t">
                <p>
                Copyright &copy;{new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </section>
    )
}

export default Footer