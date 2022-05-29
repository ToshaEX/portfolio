import React,{useState,useEffect} from "react";
import { AppWrap, MotionWrap } from "../../wrapper/index";
import{HiChevronLeft,HiChevronRight} from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import {motion} from "framer-motion";
import {urlFor,client} from "../../clients";

import "./Testimonial.scss";

const Testimonial = () => {
    const [brands, setBrands] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1)

    useEffect(() => {
      const query = '*[_type == "testimonials"]';
      const brandsQuery = '*[_type == "brands"]';
      
      client
        .fetch(brandsQuery)
        .then((data) => {
          setBrands(data);
        })
        .catch((err) => console.log(err.message));

      client
        .fetch(query)
        .then((data) => {
          setTestimonials(data);
          console.log("Data:",data);
        })
        .catch((err) => console.log("error:"+err.message));
        
    }, []);

  const handleClick=(index)=>{
    setCurrentIndex(index);
  }

const test=testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test.imageurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="bold-text">{test.company}</h5>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
          
          
        </>
      )}
      <div className="app__testimonial-brands app__flex">
        {brands.map((brand)=>(
        <motion.div
        whileInView={{opacity:[0, 1]}}
        transition={{duration:.5, type:"tween"}}
        key={brand._id}
        >
          <img src={urlFor(brand.imgUrl)}/>
        </motion.div>))}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Testimonial, "app__testimonial"),"testimonials","app__primarybg");
