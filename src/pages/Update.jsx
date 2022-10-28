import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { __editPost, __deletePost } from "../redux/modules/postSlice";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramsid = useParams();
  const posts = useSelector((state) => state.post.post);

  const indexId = posts.findIndex((user) => {
    if (user.id == paramsid.id) {
      return true;
    }
    return false;
  });
  const [input, setInput] = useState(posts[indexId]);

  const onChangeHandlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onClickUdapte = (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    const Fdata = { id: input.id, formData: formData };
    dispatch(__editPost(Fdata));
  };

  return (
    <>
      <img
        src={input.image}
        style={{
          marginBottom: "24px",
          width: "400px",
          height: "400px",
        }}
      />

      <label>내용</label>
      <Input
        size="textarea"
        type="text"
        name="content"
        value={input.content || ""}
        onChange={onChangeHandlerInput}
      />
      <Button onClick={() => onClickUdapte(input)}>수정완료</Button>
      <Button onClick={() => navigate("/Detail")}>수정취소</Button>
    </>
  );
};

export default Update;
