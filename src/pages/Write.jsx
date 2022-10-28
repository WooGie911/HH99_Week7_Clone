import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/modules/postSlice";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import Header from "../components/Header";
import Layout from "../components/Layout";
import AddImage from "../components/elements/addImage.svg";

const Write = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
  };

  const onChangeHandlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.content === "") {
      return alert("내용을 입력해 주세요");
    }
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("content", input.content);
    dispatch(__addPost(formData));
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    window.location.replace("/Main");
  };

  return (
    <>
      <Layout>
        <Header />
        <div>Write</div>
        <label htmlFor="imgFile">
          <img
            src={imageUrl ? imageUrl : AddImage}
            style={{
              marginBottom: "24px",
              width: "464px",
              height: "301px",
            }}
          />
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
        </label>
        <Button onClick={onSubmit}> 공유하기</Button>

        <label> 내용 </label>
        <Input
          size="textarea"
          placeholder="내용을 입력해주세요"
          value={input.content || ""}
          onChange={onChangeHandlerInput}
          name="content"
        />
      </Layout>
    </>
  );
};

export default Write;
