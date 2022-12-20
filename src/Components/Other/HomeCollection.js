import { useEffect, useState } from 'react';
import styles from './HomeCollection.module.css';
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import DeleteModal from '../forms/delete';

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

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

Modal.setAppElement(document.getElementById('root'));

function HomeCollection({ item, index }) {
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [hovering, setHovering] = useState(false);

    let allImages = [];
    item.FinishedData.forEach(item => {
        if (item.poster_path) {
            allImages.push(item.poster_path);
        }
    });
    const shuffledItems = shuffle(allImages);

    let defaultImage = `https://image.tmdb.org/t/p/original/${shuffledItems[0]}`;

    const [chosenImage] = useState(defaultImage)

    return (
        <>
            <Modal
                className='Modal'
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                style={customStyles}
                overlayClassName="Overlay"
                contentLabel="Example Modal"
            >
                <DeleteModal item={item} setDeleteIsOpen={setDeleteIsOpen} index={index} />
            </Modal>
            <Fade duration={300}>
                <Link to={`/${item.id}/${item.folderName}`} className={styles.linkStyles}>
                    <div className={styles.posterContainer} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)}>
                        {
                            chosenImage ? <img className={styles.posterImg} style={{ backgroundImage: 'url(' + `${chosenImage}` + ')' }} /> : <></>
                        }
                        {
                            hovering ? <Fade duration={300}>
                                <img onMouseDownCapture={(e) => setDeleteIsOpen(true)} src={require('../../assets/delete.png')} className={styles.delete} />
                            </Fade> : <></>
                        }
                        <div className={styles.linker}>
                            <h1 className={styles.posterHeader}>{item.folderName}</h1>
                        </div>
                    </div>
                </Link>
            </Fade>
        </>
    )
}

export default HomeCollection;