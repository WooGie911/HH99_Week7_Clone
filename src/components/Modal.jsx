import React from 'react';
import styled from 'styled-components';
import thumb from '../images/thumb.jpeg';
// import { MdClose } from 'react-icons/md';

// import thumb from '../images/thumb.jpeg';

const StBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const StModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const StModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const StCloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <StBackground>
          <StModalWrapper showModal={showModal}>
            <StModalImg src={'thumb.jpeg'} alt="camera" />
            <StModalContent>
              <h1> are you ready</h1>
              <p>get exclusive access to our next launch</p>
              <button>join now</button>
            </StModalContent>
            <StCloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </StModalWrapper>
        </StBackground>
      ) : null}
    </>
  );
};

export default Modal;
