import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import LoginForm from '../LoginForm';

function LoginFormModal({ setShowModal, showModal }) {
    const [showModal2, setShowModal2] = useState(false);

    // const handleShowModal = () => {
    //     setShowModal(!showModal)
    //     setShowModal2(true)
    // }

    return (
        <>
            <button onClick={() => setShowModal2(true)}>Login</button>
            {showModal2 && (
                <>
                    <Modal onClose={() => setShowModal2(false)}>
                        <LoginForm setShowModal2={setShowModal2} />
                    </Modal>
                </>
            )}
        </>
      );
}

export default LoginFormModal
