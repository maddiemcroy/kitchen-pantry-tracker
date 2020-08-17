import React from 'react';
import Modal from 'react-modal';
import AddItemForm from '../pages/AddItemForm';

const customStyles = {
    content: {
      top: '20%',
      left: '30%',
      right: '30%',
      bottom: '20%',
    },
};

const AddItemModal = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel="Add Item"
            style={customStyles}
        >
            <AddItemForm 
                handleChange={props.handleChange}
                onSubmit={props.onSubmit}
            />
        </Modal>
    );
}

export default AddItemModal;