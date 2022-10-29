import React from "react";

const Write = () => {
  
// const [attachment, setAttachment] = useState();
  // const onFileChange = (event) =>{
  //   const {target:{files}} = event;
  //   const theFile = files[0]; //첫번째 파일만 받도록 함
  //   //파일을 갖고 reader를 만든 다음
  //   const reader = new FileReader();
  //   //readAsDataURL을 사용해서 파일을 읽음
  //   reader.onloadend = (finishedEvent)=>{
  //   //파일 로딩이 끝날때 finishedEvent를 받고 다음 read.readAsDataURL을 실행
  //   const {currentTarget:{result},} = finishedEvent;
  //   setAttachment(result)
  //   //event listener를 file reader에 추가 
  //   reader.readAsDataURL(theFile);

  
  // };

  // fileleader = 파일 이름을 읽음
  return (
  <div>
    {/* <input 
    type="file" 
    accept="image/*"
    onChange={onFileChange}
    >
    </input> */}
  </div>
  )
};

export default Write;
