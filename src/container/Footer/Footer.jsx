import React,{ useState, useEffect} from 'react'
import {images} from "../../constant/index"
import {AppWrap, MotionWrap} from "../../wrapper/index"
import {client} from "../../clients"
import "./Footer.scss"

const Footer = () => {

  const [formData, setFormData] = useState({name:"",email:"",message:""});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {name,email,message} =formData;

  const handleChange=(e)=>{
    const {name,value}= e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit=(e)=>{
    setLoading(true);

    const contact={
      _type: "contact",
      name: name,
      email:email,
      message:message
    }
    client.create(contact).then(()=>{
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }
  return (
    <>
      <h2 className="head-text">Take a Coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:tharinduoshan@gmail.com" className="p-text">
            tharinduoshan@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+94713206693" className="p-text">
            +94 71 320 6693
          </a>
        </div>
      </div>
      {!isFormSubmitted?
      (<div className="app__footer-form app__flex">
        <div className="app__flex">
         <input type="text" className="p-text" name="name"placeholder="Your Name" value={name} onChange={handleChange} />
        </div>
        <div className="app__flex">
         <input type="email" className="p-text" name="email"placeholder="Your Email" value={email} onChange={handleChange} />
        </div>
        <div>
          <textarea placeholder="Your Message " onChange={handleChange} value={message} name="message"></textarea>
        </div>
        <button type="button" className="p-text" onClick={handleSubmit}>{loading?"Sending":"Send Message"}</button>
      </div>):
      (<div>
        <h3 className="head-text">Thank you for getting in touch!</h3>
      </div>)
      
      }
    </>
  );
}

export default AppWrap(MotionWrap(Footer,"app__footer"),"contact","app__whitebg");
