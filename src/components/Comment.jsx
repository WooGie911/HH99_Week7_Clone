// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { __deleteComment } from '../redux/modules/commentSlice';
// import { __editComment } from '../redux/modules/commentSlice';
// import { __addComment } from '../redux/modules/commentSlice';

// const Comment = () => {
//   const { Id } = useParams();
//   const dispatch = useDispatch();
//   const [isEdit, setIsEdit] = useState(false);
//   const [updatedComment, setUpdatedComment] = useState('');
//   const { content } = useSelector((state) => state.comment.data);
//   const { isGlobalEditmode } = useSelector((state) => state.comment);

//   const onDeleteButtonHandler = () => {
//     const result = window.confirm('삭제하시겠습니까?');
//     if (result) {
//       dispatch(__deleteComment(comment.id));
//     } else {
//       return;
//     }
//   };

//   const onUpdateButtonHandler = () => {
//     dispatch(
//       __updateComment({
//         id: comment.id,
//         content: updatedComment,
//         username: comment.username,
//         todoId: id,
//       }),
//     );
//     setIsEdit(false);
//     dispatch(globalEditModeToggle(false));
//   };

//   const onChangeEditButtonHandler = () => {
//     setIsEdit(true);
//     dispatch(__getComment(comment.id));
//     dispatch(globalEditModeToggle(true));
//   };

//   const onCancelButtonHandler = () => {
//     setIsEdit(false);
//     dispatch(clearComment());
//     dispatch(globalEditModeToggle(false));
//   };

//   useEffect(() => {
//     setUpdatedComment(content);
//   }, [content]);

//   return (
//     <div>
//       {isEdit ? (
//         <>
//           <input
//             type="text"
//             value={updatedComment}
//             maxlength={100}
//             onChange={(event) => {
//               setUpdatedComment(event.target.value);
//             }}
//           />
//           <button
//             size="small"
//             bgColor="#FE531F"
//             onClick={onCancelButtonHandler}
//           >
//             <Text color="#fff">취소</Text>
//           </button>
//           <button
//             size="small"
//             bgColor="#FE531F"
//             onClick={onUpdateButtonHandler}
//           >
//             <text color="#fff">저장</text>
//           </button>
//         </>
//       ) : (
//         <>
//           <text>{comment.username}</text>
//           <text size="16">{comment.content}</text>
//           <button
//             size="small"
//             bgColor="#FE531F"
//             disabled={isGlobalEditmode}
//             onClick={onChangeEditButtonHandler}
//           ></button>
//           <button
//             size="small"
//             bgColor="#FE531F"
//             onClick={onDeleteButtonHandler}
//             disabled={isGlobalEditmode}
//           ></button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Comment;
