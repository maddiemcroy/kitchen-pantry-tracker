import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '20%',
      left: '30%',
      right: '30%',
      bottom: '20%',
    },
};

const EditItemModal = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel="Edit Item"
            style={customStyles}
        >
            <span>edit item</span>
        </Modal>
    );
}

export default EditItemModal;