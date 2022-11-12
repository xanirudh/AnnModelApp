import React from 'react'
import styles from '../styles/Global';
import VisibilitySensor from "react-visibility-sensor";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Modal({ visible, onClose, finalResult }) {

  const handleOnClose = (e) => {
    if (e.target.id == "container") onClose();
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

            <div style={{ width: "200px" }} className={`p-3`}>

              <VisibilitySensor>
                {({ isVisible }) => {
                  const percentage = isVisible ? finalResult : 0;
                  return (
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',

                        // Text size
                        textSize: '16px',

                        // Colors
                        pathColor: `rgba(220, 20, 60)`,
                        textColor: '#d6d6d6',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  );
                }}
              </VisibilitySensor>
            </div>

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