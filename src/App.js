import { React, useState } from "react";
import { SectionWrapperMod, Modal } from './components';
import assets from './assets'
import styles from './styles/Global';

const App = () => {

  const handleShowModal = (result) => {
    setFinalResult(result)
    setShowModal(true)
  }

  const [showModal, setShowModal] = useState(false)

  const [finalResult, setFinalResult] = useState()
  
  const handleOnClose = () => setShowModal(false)
  return (
    <>
        <SectionWrapperMod 
          title="Predict retention rates of your employees"
          description="Retaining the best employees is an 
          important factor for most organizations." 
          techDescription="Use our cutting edge deep learning 
          technology based on advanced Artificial Neural Networks 
          to predict how well your employees are likely to work for 
          you."

          
          mockupImg={assets.homeHero}
          banner="banner" 
          handleShowModal={handleShowModal}
        
        />
        
        
        
        
        
        <div className="px-4 py-2 justify-center 
        items-center bg-primary flex-col text-center 
        banner04">
          <p className={`${styles.pText} 
          ${styles.whiteText}
          `}>Made with love by {" "}
          <span className="bold">Anirudh</span>
          </p>
        </div>

        <Modal onClose={handleOnClose} visible={showModal} finalResult={finalResult} />
    </>
  );
}

export default App;
