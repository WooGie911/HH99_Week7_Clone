import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/modules/postSlice";
import styled from "styled-components";
import insta_file from "../components/icons/insta_file.PNG";

const Write = (props) => {
  const dispatch = useDispatch();

  //모달창 온오프
  const closeModalWrite = () => {
    props.setModalWrite(false);
  };

  const [input, setInput] = useState({ content: "" });
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(false);
  const imgRef = useRef();

  const contentsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeImage = () => {
    const reader = new FileReader();

    const file = imgRef.current.files[0];
    console.log("file", file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
  };
  const onSubmit = (e) => {
    const data = new FormData();
    data.append("img", imgFile);
    data.append("content", input.content);
    dispatch(__addPost(data));
    props.setModalWrite(false);
    window.location.replace("/Main");
  };
  return (
    <>
      <Background onClick={closeModalWrite}>
        <StModalWrite onClick={(e) => e.stopPropagation()}>
          <StWrapper>
            <StpostBox>
              <StpostBox_1>
                <StLabel>
                  <StFilename>
                    <span>새 게시물 만들기</span>
                  </StFilename>
                </StLabel>

                {imageUrl ? <StImgPreview src={imageUrl}></StImgPreview> : null}
                <StImageBox
                  id="imgFiles"
                  type="file"
                  accept="image/*"
                  onChange={onChangeImage}
                  ref={imgRef}
                />

                {percent ? (
                  <StLabel2>{file.name}</StLabel2>
                ) : (
                  <StLabel2>사진을 선택하세요!</StLabel2>
                )}
                <STImageButton onClick={() => imgRef.current.click()}>
                  컴퓨터에서 선택
                </STImageButton>
              </StpostBox_1>
              <StpostBox_2>
                <StUpload>
                  <StButton onClick={onSubmit}>공유하기</StButton>
                  <StModalWriteBT onClick={closeModalWrite}>X</StModalWriteBT>
                </StUpload>

                <Sttextarea
                  name="content"
                  value={input.content}
                  onChange={contentsChangeHandler}
                  placeholder="문구 입력 ..."
                ></Sttextarea>
              </StpostBox_2>
            </StpostBox>
          </StWrapper>
        </StModalWrite>
      </Background>
    </>
  );
};

export default Write;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;
const StModalWrite = styled.div`
  /* 모달창을 화면 중앙. 최상단에 노출 */

  /* 모달창 크기 */
  width: 1000px;
  height: 1000px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
`;
const StModalWriteBT = styled.button`
  position: relative;
  left: 5px;
`;

const StWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  overflow-x: hidden;
`;

const StpostBox = styled.div`
  width: 900px;
  height: 550px;
  display: flex;
  justify-content: center;
`;

const StpostBox_1 = styled.div`
  background-color: white;
  border: 1px solid #bababa;
  border-radius: 15px;
  width: 500px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(${insta_file});
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

const StLabel = styled.div`
  margin-top: 10px;
  width: 90%;
  height: 30px;
  border-bottom: solid 1px #bababa;
  position: absolute;
  top: 0;
`;

const StLabel2 = styled.div`
  margin-top: 180px;
  margin-bottom: 20px;
`;

const StImageBox = styled.input`
  display: none;
`;

const STImageButton = styled.button`
  background: #0095f6;
  border: none;
  color: white;
  font-size: 13px;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

const StImgPreview = styled.img`
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
  &:hover {
    transform: scale(1.05, 1.05); /* 가로2배 새로 1.5배 로 커짐 */
    transition: transform 0.5s; /* 커지는 시간 */
  }
`;

const StFilename = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StButton = styled.button`
  width: 30%;
  height: 30px;
  //     border:none;
  //     font-weight:600;
  //     font-size:18px;
  //     background: #0095F6;
  //     border: none;
  //     color: white;
  //     cursor: pointer;
`;

const StpostBox_2 = styled.div`
  width: 300px;
  height: 550px;
  border: 1px solid #bababa;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StUpload = styled.div`
  width: 80%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  justify-content: right;
  border-bottom: 1px solid #bababa;
`;

const Sttextarea = styled.textarea`
  width: 80%;
  border: none;
  height: 300px;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
  &:focus {
    outline: none;
  }
  resize: none;
  font-weight: 600;
`;
const UploadButton = styled.button`
  background-color: #ffffff;
  border: none;
  color: blue;
  font-weight: 600;
  cursor: pointer;
`;
