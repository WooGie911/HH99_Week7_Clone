// import React from 'react';
// import { __addComment } from '../redux/modules/commentSlice';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';

// const AddComment = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [content, setContent] = useState({
//     name: '',
//     comment: '',
//   });
//   const onAddCommentButtonHandler = (event) => {
//     event.preventDefault();
//     if (content.comment.trim() === '' || content.name.trim() === '') {
//       return alert('모든 항목을 입력해주세요.');
//     }
//     dispatch(__addComment({ commentId: id, ...content }));
//     setContent({
//       name: '',
//       comment: '',
//     });
//   };
//   const onChangeInputHandler = (event) => {
//     const { name, value } = event.target;
//     setContent({
//       ...content,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <input
//         placeholder="이름 (5자 이내)"
//         value={content.name}
//         type="text"
//         name="name"
//         maxLength={5}
//         onChange={onChangeInputHandler}
//       />
//       <input
//         value={content.comment}
//         type="text"
//         name="comment"
//         maxLength={100}
//         onChange={onChangeInputHandler}
//       />
//       <button type="submit" onClick={onAddCommentButtonHandler} />
//     </div>
//   );
// };

// export default AddComment;
