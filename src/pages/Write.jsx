import React from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __SignUp } from '../redux/modules/signupSlice';
import { __addPost } from '../redux/modules/postSlice';
import { useRef } from 'react';
import styled from 'styled-components';
import insta_file from '../images/insta_file.PNG';

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for content 수정
  const [input, setInput] = useState({ content: '' });

  const contentsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  //이미지 부분
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState('');
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(false);
  const imgRef = useRef();
  //끝

  const onChangeImage = () => {
    const reader = new FileReader();

    const file = imgRef.current.files[0];
    console.log('file', file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
  };
  //끝

  const onSubmit = (e) => {
    const data = new FormData();
    //  for(let i = 0; i < files.length; i++){
    //   data.append('files',files[i]);
    //  }
    //
    data.append('img', imgFile);
    data.append('content', input.content); //백엔드가 받는
    dispatch(__addPost(data));
    navigate('/Main');
    console.log('img', imgFile);
    console.log('datadata', data);
    console.log('컨텐츠', input.content);
  };

  return (
    <StWrapper>
      <StpostBox>
        <StpostBox_1>
          <StLabel>
            <StFilename>
              {''}
              <span>새 게시물 만들기</span>
              {''}
            </StFilename>
          </StLabel>

          {imageUrl ? <StImgPreview src={imageUrl}></StImgPreview> : null}
          <StImageBox
            id="imgFile"
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
          <STImageButton onClick={() => imgRef.current.click()} />
        </StpostBox_1>
        <StpostBox_2>
          <StUpload>
            <StButton onClick={onSubmit}>공유하기</StButton>
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
  );
};

export default Write;

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
  // background-size: 10% 10%;
  // background-size : cover;
  // background: no-repeat;
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
  // margin-top: 200px;
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

// const onFileChange = (event) => {
//   const { target: { files } } = event;
//   const theFile = files[0]; //첫번째 파일만 받도록 함
//   //파일을 갖고 reader를 만든 다음
//   const reader = new FileReader();
//   //readAsDataURL을 사용해서 파일을 읽음
//   reader.onloadend = (finishedEvent) => {
//     //파일 로딩이 끝날때 finishedEvent를 받고 다음 read.readAsDataURL을 실행
//     const { currentTarget: { result }, } = finishedEvent;
//     setAttachment(result)
//     //event listener를 file reader에 추가
//     reader.readAsDataURL(theFile);
//   };
// }
// //fileleader = 파일 이름을 읽음
// const onClearAttachment = () => setAttachment(null)
// //사진을 사용하지 않고 파일을 사용하고 있고 clear를 누르면 att~ 지우는 거니까
// //

// <form onSubmit={onsubmit}>
// <input

// type="text"
// placeholder="what's on your mind?"
// maxLength={120}
// />
// <input
//   type="file"
//   accept="image/*"
//   onChange={onFileChange}
// >
// </input>
// <input type="submit" value="Nweet" />
// {attachment && (
// <div>
//   <img src={attachment} width="50px" height="50px"></img>
//   <button onClick={onClearAttachment}>Clear</button>
//   </div>
//   )}
// </form>
