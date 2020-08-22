import React from 'react';
import Modal from 'react-modal';
import AddItemForm from '../pages/AddItemForm';
import Button from '../components/Button';

const customStyles = {
    content: {
      top: '20%',
      left: '25%',
      right: '25%',
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
            <h3>Add new items</h3>
            <AddItemForm 
                handleChange={props.handleChange}
            />
            <Button onClick={props.onSubmit}>Add item(s)</Button>
        </Modal>
    );
}

export default AddItemModal;