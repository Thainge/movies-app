import React, { useState } from 'react';
import { ContextFunction } from '../../Context/ContextProvider';
import updateFetchData from '../../hooks/fetchUpdate';
import Modal from 'react-modal';
import './form.css';

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

Modal.setAppElement(document.getElementById('root'));

function EditModal({ editIsOpen, setEditIsOpen, loading, setLoading }) {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    const [success, setSuccess] = useState({
        success: false,
        itemCount: 0,
    });

    let subtitle;

    const [editFolderName, setEditFolderName] = useState('');
    const [editFiles, setEditFiles] = useState([]);

    const onChangeEdit = (e) => {
        let folder = e.target.files
        setEditFiles(folder);
        setSuccess({
            success: true,
            itemCount: folder.length,
        });
    }

    const onTextChangeEdit = (e) => {
        let text = e.target.value;
        setEditFolderName(text);
    }

    function closeEdit() {
        setEditIsOpen({
            open: false,
            name: '',
            index: 0,
        });
        setSuccess({
            success: false,
            itemCount: 0,
        })
    }

    async function SubmitEverything(e) {
        e.preventDefault();
        setSuccess({
            success: false,
            itemCount: 0,
        })
        updateFetchData(allFolders, setAllFolders, editFiles, editFolderName, setLoading, editIsOpen.index, editIsOpen.smallId);
        closeEdit();
    }

    return (
        <Modal
            className='Modal'
            isOpen={editIsOpen.open}
            onRequestClose={closeEdit}
            style={customStyles}
            overlayClassName="Overlay"
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} className={'HeaderH2'}>Edit {editIsOpen.name}</h2>
            <form onSubmit={SubmitEverything} className={'flexCenter'}>
                <div className='formContainer'>
                    <div className={'textContainer'}>
                        <label htmlFor="text" className={'nameText'}>
                            Name:
                        </label>
                        <input type="text" onChange={onTextChangeEdit} placeholder={editIsOpen.name} className='nameInput' />
                    </div>
                    <div className="imageUploadContainer">
                        <label title='Select New Directory' htmlFor="file-input" className={'fileText'}>
                            <img src={require('../../assets/upload.png')} className={'imageUpload'}></img>
                            {
                                success.success ? <div className='success'>Selected {success.itemCount} items</div> : <div className='text'>Select New Directory</div>
                            }
                        </label>
                        <input type="file" id="file-input" multiple onChange={onChangeEdit} />
                    </div>
                </div>
                {
                    loading ? <img src={require('../../assets/loading.gif')} className={'imageLoading'}></img> : <></>
                }
                <div className='buttonsContainer'>
                    <div className='delete' onClick={closeEdit}>Cancel</div>
                    <input type={'submit'} className={`${loading ? 'disabled-edit' : 'edit'}`} value="Edit" />
                </div>
            </form>
        </Modal>
    );

}

export default EditModal;
