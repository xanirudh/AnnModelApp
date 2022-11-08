import React from 'react'
import styles from '../styles/Global';


function Modal({ visible, onClose, finalResult }) {

    const handleOnClose = (e) => {
        if(e.target.id == "container") onClose();
    }

    if (!visible) return null;

  return (
    <div  
    id="container"
    onClick={handleOnClose}
    className="fixed inset-0 bg-black 
    bg-opacity-30 backdrop-blur-sm flex justify-center 
    items-center">
        <>
        <div className={` p-10 rounded bg-indigo-600
        flex flex-col`}>
            <h1 className={`${styles.h1Text} 
          ${styles.whiteText}
          `}>ANN Results </h1>

          <div className='flex flex-row'>
            
          <p className={`${styles.pText} 
          ${styles.whiteText}
          `}>
          <span className="font-bold">Score:</span>
          </p>

          <p className={`${styles.pText} 
          ${styles.whiteText} 
          pl-3
          `}>
          <span className="font-bold">{finalResult}/100</span>
          </p>

          </div>
          <p className={`${styles.pText} 
          ${styles.whiteText} 
          pl-3
          `}>
          <span className="bold">Employees with score more than 30 are likely to 
          leave their organizations. </span>
          </p>
            <button onClick={onClose} class="shadow bg-purple-500 hover:bg-purple-400 
            focus:shadow-outline focus:outline-none text-white 
            font-bold py-2 px-4 rounded">
              OKAY
              </button>
            
        </div>
        
        </>
    </div>
  )
}

export default Modal