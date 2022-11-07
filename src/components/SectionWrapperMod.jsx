import React from 'react';
import styles from '../styles/Global';
import assets from '../assets';
import Button from './Button';
import Form from './Form';



const FeatureCard = ({ iconUrl, iconText }) => (
    <div
    className={styles.featureCard}
    >
      <img 
      src={iconUrl}
      alt="icon"
      className={styles.featureImg}
      />
      <p className={styles.featureText}>{iconText}</p>
      </div>
  )

const SectionWrapperMod = ({ title, description, techDescription, showBtn,
mockupImg, banner, reverse, handleShowModal }) => {

  
  return (
    
      
    <div className={`min-h-screen ${styles.
      section} 
      ${ reverse ? styles.bgWhite : styles.bgPrimary} 
      ${banner}`}>

      <div className={`flex items-center 
      ${ reverse ? styles.boxReverseClass : styles.boxClass} 
      w-11/12 sm:w-full minmd:w-3/4`}>

        <div className={`${styles.descDiv} 
          ${reverse ? " fadeRightMini" : " fadeLeftMini"}
          ${reverse ? styles.textRight : styles.textLeft}
          `}>

            <h1 className={`
            ${reverse ? styles.blackText : styles.whiteText}
            ${styles.h1Text}`}>
              {title}</h1>

              <p className={`
              ${reverse ? styles.blackText : styles.whiteText}
              ${styles.descriptionText}`}>
                {description}</p>

                <p className={`
              ${reverse ? styles.blackText : styles.whiteText}
              ${styles.descriptionText}`}>
                {techDescription}</p>

                <h1 className={`${styles.h1Text} 
          ${styles.whiteText}
          `}>
            Technologies Used</h1>

            <div className={styles.flexWrap}>
          <FeatureCard iconUrl={assets.keras} 
            iconText="Keras" />
          <FeatureCard iconUrl={assets.tensorflow} 
            iconText="TensorFlow" />
            
        </div>
        <div className={`${styles.subSection} 
      flex-col
      text-center
      `}>
        
        <button className={styles.btnPrimary}>
          Source Code
        </button>
        
        </div>

              {showBtn && (
                <Button 
                assetUrl={assets.expo}
                link="https://expo.dev/@aniru.dh/react_native_app?serviceType=classic&distribution=expo-go"
                />
              )}
        </div>

        <div className={`flex-1 ${styles.flexCenter}
         p-8 sm:px-0`}>
            <div className={`${ reverse ? " fadeLeftMini" : " fadeRightMini"}`}>
            
            <Form handleShowModal={handleShowModal}/>
            
    
            
        </div>

        </div>
        
      </div>
      
    </div>
    
    
  )
}

export default SectionWrapperMod