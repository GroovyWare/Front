import { useState } from "react";

function Accordion({ title, children }){
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleIsOpen = () => setIsOpen(!isOpen);
  
    return (
      <div onClick={toggleIsOpen}>
          {title}
        {isOpen && <div>{children}</div>}
      </div>
    );
  };

  export default Accordion;