import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styling/Error.css";
import Toggle from "./Toggle";
import { useAppContext } from "../Context";
import { getBackgroundColor, getButtonColor } from "../Constants";
import AOS from 'aos';
import 'aos/dist/aos.css'

const Error = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { animations } = useAppContext();
  const buttonRef = useRef(null);
  const finalText = "sorry, you don't have access.";

  useEffect(() => {
    const color = getBackgroundColor(animations);
    document.body.style.backgroundColor = color;
  }, [location.pathname, animations]);

  useEffect(() => {
	const color = getButtonColor(animations);
	buttonRef.current.style.color = color;
  }, [animations])

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (animations) {
      let addChar;
      function type() {
        setDisplayedText((prev) => prev + finalText.charAt(textIdx));
        setTextIdx((prev) => prev + 1);
      }

      if (textIdx < finalText.length) {
        addChar = setInterval(type, 75);
      }

      return () => clearInterval(addChar);
    } else {
      setDisplayedText(finalText);
    }
  }, [textIdx]);

  useEffect(() => {
	AOS.init({
		duration: 1000
	});
}, []);

  return (
    <div className="error-container">
      <Toggle />
      <h1>{displayedText}</h1>
      <div className="try-again" data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '2500' })}>
        <p>if you aren't my boyfriend, this isn't meant for you.</p>
        <button onClick={goBack} ref={buttonRef}>try again</button>
      </div>
    </div>
  );
};

export default Error;
