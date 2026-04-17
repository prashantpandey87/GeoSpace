import React from 'react'
import '../../styles/components/Footer.css'
import footerData from "../../Api/FooterData.json"
import {  MdPlace } from 'react-icons/md'
import { IoCallSharp } from 'react-icons/io5'
import { TbMailPlus } from 'react-icons/tb'

const Footer = () => {
  const footerIcon={
    MdPlace:<MdPlace/>,
    IoCallSharp:<IoCallSharp/>,
    TbMailPlus:<TbMailPlus/>

  }
  return (
    <footer className="app-footer">
      <div className="footer-row">
        {footerData.map((curData,index)=>{
          const {icon,title,tittle,details}=curData
          return(
            <div className="footer-item" key={tittle|| details}>
              <div className="footer-icon">{footerIcon[icon]}</div> 
              {/* [icon ] dynmic value */}
              <div className="footer-text">
                <p className="footer-title">{title}</p>
                <p className="footer-detail">{details}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="footer-credit">
        <p>Created by @Prashant Pandey</p>
      </div>
    </footer>
  )
}

export default Footer
