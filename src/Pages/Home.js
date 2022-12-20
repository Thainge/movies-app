import styles from './Home.module.css';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddModal from '../Components/forms/add';
import Modal from 'react-modal';
import { ContextFunction } from '../Contexts/ContextProvider';
import HomeCollection from '../Components/Other/HomeCollection';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Home() {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    // Add new Directory modal
    const [addModalState, setAddModalState] = useState(false);
    const openModal = () => {
        setAddModalState(true);
    }

    return (
        <div className={styles.Container}>
            <h1 className={styles.header}>Home</h1>
            <div className={styles.MoviesContainer}>
                {
                    allFolders.map((item, index) =>
                        <HomeCollection key={index} item={item} index={index} />
                    )
                }
                <div className={styles.add} onClick={openModal}>
                    <div className={styles.addIcon}>+</div>
                    <div className={styles.addText}>New Collection</div>
                </div>
            </div>
            <Modal
                className="Modal"
                isOpen={addModalState}
                onRequestClose={() => setAddModalState(false)}
                style={customStyles}
                overlayClassName="Overlay"
                contentLabel="Example Modal"
            >
                {
                    addModalState ? <AddModal setAddModalState={setAddModalState} /> : <></>
                }
            </Modal>
        </div>
    );
}

export default Home;