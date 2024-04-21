"use client";

import {
   useAppDispatch,
   useAppSelector,
} from "@/configuration/redux/services/hooks";
import {
   postAdded,
   reactionAdd,
   removePost,
} from "@/configuration/redux/state/Post-Slice";
import { useState } from "react";

const PostsList = () => {
   const posts = useAppSelector((state) => state.posts);
   const dispatch = useAppDispatch();

   const initialPost = {
      title: "",
      content: "",
   };

   const [post, setPost] = useState(initialPost);
   const { title, content } = post;

   function OnChangeHandle(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      const { value, name } = e.target;

      setPost((prev) => ({ ...prev, [name]: value }));
   }

   function OnSubmitForm(e: React.FormEvent) {
      e.preventDefault();

      if (!title || !content) return;

      dispatch(postAdded({ title, content }));
      setPost(initialPost);
   }

   const reactionEmoji = {
      thumbsUp: "👍",
      hooray: "🎉",
      heart: "❤️",
      rocket: "🚀",
   };

   return (
      <section className="posts-list w-11/12 mx-auto mt-4   ">
         <h2 className="text-3xl font-bold mb-4">Posts</h2>
         <div className="flex flex-row gap-5">
            <div className="w-1/2">
               <h2 className="font-semibold">Add a New Post</h2>
               <form className="flex flex-col gap-3" onSubmit={OnSubmitForm}>
                  <label htmlFor="postTitle">Post Title:</label>
                  <input
                     className="border border-slate-500 rounded p-2 outline-blue-300"
                     type="text"
                     id="postTitle"
                     name="title"
                     value={title}
                     onChange={OnChangeHandle}
                  />
                  <label htmlFor="postContent">Content:</label>
                  <textarea
                     className="border border-slate-500 rounded p-2 outline-blue-300"
                     id="postContent"
                     name="content"
                     value={content}
                     onChange={OnChangeHandle}
                  />
                  <button
                     type="submit"
                     className="bg-green-300 py-2 px-4 rounded text-white w-max ml-auto"
                  >
                     Save Post
                  </button>
               </form>
            </div>
            <div className="flex flex-col w-1/2">
               <h2 className="font-semibold mb-3">List Post</h2>
               {posts.map((post) => (
                  <article
                     className="relative rounded p-2 border border-slate-900 mb-2 w-full mx-auto"
                     key={post.id}
                  >
                     <button
                        className="absolute right-2 top-2 text-red-600"
                        title="remove post"
                        onClick={() => {
                           dispatch(removePost({ id: post.id }));
                        }}
                     >
                        X
                     </button>
                     <h3>{post.title}</h3>
                     <p className="post-content">{post.content}</p>
                     {Object.entries(reactionEmoji).map(([name, emoji]) => {
                        return (
                           <button
                              key={name}
                              type="button"
                              className="muted-button reaction-button"
                              onClick={() => {
                                 dispatch(
                                    reactionAdd({
                                       id: post.id,
                                       name: "miko",
                                       react: name,
                                    })
                                 );
                              }}
                           >
                              {emoji}
                           </button>
                        );
                     })}
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
};
export default PostsList;
