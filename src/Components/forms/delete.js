import React from 'react';
import { ContextFunction } from '../../Contexts/ContextProvider';
import localStorage from 'local-storage';
import './form.css';

function DeleteModal({ setDeleteIsOpen, item, index }) {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    function closeDelete() {
        setDeleteIsOpen(false);
    }

    const deleteFolder = () => {
        const reducedArr = [...allFolders];
        reducedArr.splice(index, 1);
        setAllFolders(reducedArr);
        localStorage.set('movies', reducedArr);
        closeDelete();
    }

    return (
        <form className={'flexCenter'}>
            <div className={'white'}>Are you sure you want to delete {item.folderName}?</div>
            <div className='buttonsContainer'>
                <div className='edit' onClick={closeDelete}>Cancel</div>
                <div className='delete' onClick={deleteFolder}>Delete</div>
            </div>
        </form>
    );

}

export default DeleteModal;
