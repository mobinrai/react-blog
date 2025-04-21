import React from 'react'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import SiteSocialWidget from '../components/SiteSocialWidget'
import { Email, Phone, Place, Send } from '@mui/icons-material'
import { red } from '@mui/material/colors';
import { TextField } from '@mui/material';
import StyledButton from '../components/StyledButton';
import PageMainTitle from '../components/PageMainTitle';
import NewsLetterForm from '../components/NewsLetterForm';
import FollowUs from '../components/FollowUs';
import RightAside from '../components/RightAside';

const Contact = () => {
  return (
    <section className='contact-section'>
        <PageMainTitle title={'Contact Us'}/>
        <div className="max-w-6xl mx-auto px-2.5 flex flex-col md:flex-row max-md:gap-10 gap-4 my-8">
            <div className='w-full md:w-2/3'>
                <div className="contact-info-sectio my-4">
                    <SectionTitleWithLine divClassName={'mb-4'} title={'Contact Information'}/>
                    <address className='not-italic flex flex-col gap-6'>
                        <p><span className="rounded-full border p-2 my-2 mr-6"><Phone sx={{ color: red[500] }} fontSize='small'/></span><a href="tel:+012025550194">202-555-0194</a></p>
                        <p><span className="rounded-full border p-2  my-2 mr-6"><Email sx={{ color: red[500] }} fontSize='small'/></span> <a href="mailto:infos@myblog.co">Infos@myblog.co</a></p>
                        <p><span className="rounded-full border p-2  my-2 mr-6"><Place sx={{ color: red[500] }} fontSize='small'/></span> 123 6th St.Melbourne, FL 32904</p>
                    </address>
                </div>
                <div className='contact-form-section my-7'>
                    <SectionTitleWithLine title={'Mail us'}/>
                    <form action="" className="flex flex-col gap-6 mt-6">
                        <TextField required id="email" label="Required" defaultValue="Email" fullWidth/>
                        <TextField required id="subject" label="Required" defaultValue="Subject" fullWidth/>
                        <TextField multiline defaultValue={'Message'} minRows={3} label="Required *"/>
                        <StyledButton width="30%" icon={<Send/>}>Submit</StyledButton>
                    </form>
                </div>
            </div>
            <RightAside/>
        </div>
    </section>    
  )
}

export default Contact