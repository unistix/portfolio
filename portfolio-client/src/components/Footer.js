import React from 'react'
import site_copy from '../utils/copy';
import { AiFillLinkedin, AiFillGithub,AiOutlineMail } from 'react-icons/ai';
import { useGlobalContext} from '../context/context'

const Footer = () => {
    const {darkMode} = useGlobalContext();
  return (
    <div className={darkMode?'footer-container dark' :'footer-container'}>
     <div className='footer-icon'>
       <AiFillLinkedin/>
       <AiFillGithub/>
       <AiOutlineMail/>
       </div>
    <p>{site_copy && site_copy.footer.footer}
    </p></div>
  )
}

export default Footer