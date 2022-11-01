import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/modules/postSlice";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import AddImage from "../components/elements/addImage.svg";
import useInput from "../hooks/useInput";

//이미지 압축
import imageCompression from "browser-image-compression";

const Write = (props) => {
  const dispatch = useDispatch();

  //모달창 온오프
  const closeModalWrite = () => {
    props.setModalWrite(false);
  };

  //이미지 파일 & 프리뷰URL 선언
  const [imageUrls, setImageUrls] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  //이미지 업로드 인풋돔 선택
  const imgRef = useRef();

  //커스텀훅 useInput 사용
  const [input, setInput, onChangeHandlerInput] = useInput();

  //단일 이미지 입력
  // const onChangeImage = () => {
  //   const reader = new FileReader();
  //   const file = imgRef.current.files[0];
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImageUrl(reader.result);
  //     setImgFile(file);
  //   };
  // };

  //다중 이미지 입력
  const onChangeImage = (e) => {
    const files = e.currentTarget.files;
    //const files = imgRef.current.files;

    //파일 갯수 제한
    if ([...files].length > 5) {
      alert("이미지는 최대 5개까지 업로드가 가능합니다.");
      return;
    }

    //선택한 이미지 파일 반복문 돌리기
    [...files].forEach((file) => {
      //이미지 파일만 올릴수 있게 체크
      if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드가 가능합니다.");
        return;
      }

      //압축 옵션
      const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 220,
        useWebWorker: true,
      };

      //이미지 압축
      imageCompression(file, options)
        .then((res) => {
          //압축 이미지 담기
          //blob to file blob을 file로 형변환
          setImgFiles((imgs) => [
            ...imgs,
            new File([res], res.name, {
              type: "image/" + res.name.split(".")[1],
            }),
          ]);

          //압축 이미지 url 담기
          const reader = new FileReader(); // FileReader API로 이미지 인식
          reader.onload = () => {
            // 사진 올리고 나서 처리하는 event
            setImageUrls((imageUrls) => [...imageUrls, reader.result]);
          };
          reader.readAsDataURL(res); //reader에게 file을 먼저 읽힘
        })
        .catch((error) => {
          console.log("파일 압축 실패", error);
        });
    });
  };

  //데이터 입력 단일 이미지
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (input.content === "") {
  //     return alert("내용을 입력해 주세요");
  //   }
  //   const formData = new FormData();
  //   formData.append("img", imgFiles);
  //   formData.append("postRequestDto", input.content);
  //   dispatch(__addPost(formData));
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }

  //   window.location.replace("/Main");
  // };

  //다중 이미지 데이터 입력
  const onSubmit = () => {
    //request로 날릴 폼데이터
    const formData = new FormData();

    //폼 데이터에 이미지 파일들 담기
    if (imgFiles.length > 0) {
      imgFiles.forEach((file) => {
        formData.append("img", file);
      });
    } else {
      formData.append("img", null);
    }

    //폼 데이터에 글작성 데이터 넣기
    formData.append("content", JSON.stringify(input.content));

    for (var pair of formData.entries()) {
      console.log("이미지", pair[0] + ", " + pair[1]);
    }
    //통신하기
    dispatch(__addPost(formData));

    // window.location.replace("/Main");
    props.setModalWrite(false);
  };

  return (
    <>
      <Background onClick={closeModalWrite}>
        <StModalWrite onClick={(e) => e.stopPropagation()}>
          <p>글쓰기</p>
          <StModalWriteBT onClick={closeModalWrite}>X</StModalWriteBT>
          <StImgsWrap>
            <label htmlFor="imgFiles">
              <input
                style={{ display: "none" }}
                type="file"
                id="imgFile"
                onChange={onChangeImage}
                accept="image/*"
                ref={imgRef}
                name="imgFile"
                multiple
              />
              <StModalWriteBT2
                type="button"
                onClick={() => {
                  imgRef.current.click();
                }}
              >
                {imageUrls.map((IMG, INDEX) => {
                  return (
                    <>
                      <img
                        src={IMG ? IMG : AddImage}
                        key={INDEX}
                        style={{
                          marginBottom: "24px",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </>
                  );
                })}
              </StModalWriteBT2>
            </label>
            <Button onClick={onSubmit}> 공유하기</Button>

            <Input
              size="textarea"
              placeholder="내용을 입력해주세요"
              value={input.content || ""}
              onChange={onChangeHandlerInput}
              name="content"
            />
          </StImgsWrap>
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
  width: 800px;
  height: 700px;

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
  position: absolute;
  right: 10px;
  top: 10px;
`;
const StModalWriteBT2 = styled.button`
  width: 600px;
  height: 300px;
`;

const StImgsWrap = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .preview {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;
