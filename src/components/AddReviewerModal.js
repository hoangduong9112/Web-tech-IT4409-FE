import React from 'react';
import { Modal } from 'antd';

const AddReviewerModal = ({ visible, closeModal }) => {
    return (
        <Modal
            visible={visible}
            onCancel={closeModal}
            title="Add admin for the workspace"
        ></Modal>
    );
};

export default AddReviewerModal;
