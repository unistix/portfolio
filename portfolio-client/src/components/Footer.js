import React from 'react'
import site_copy from '../utils/copy';
import { AiFillLinkedin, AiFillGithub,AiOutlineMail } from 'react-icons/ai';
import { useGlobalContext} from '../context/context'

const Footer = () => {
    const {darkMode} = useGlobalContext();
  return (
    <div className={darkMode?'footer-container dark' :'footer-container'}>
     <div  className={darkMode?'footer-icon socials dark' :'footer-icon socials'} >
            <a href={site_copy.social_links.linkedIn} target="_blank">
              <AiFillLinkedin/>
            </a>
            <a href={site_copy.social_links.github} target="_blank">
              <AiFillGithub/>
            </a>
            <a href={site_copy.social_links.email_mailto} target="_blank">
              <AiOutlineMail/>
            </a>
      </div>
    <p>{site_copy && site_copy.footer.footer}
    </p></div>
  )
}

export default Footer