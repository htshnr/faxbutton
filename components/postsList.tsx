import { useState } from "react";
import FaxScreen from "./FaxScreen";

function PostsList({ posts: { items } }) {
  return items.map((post) => {
    return (
      <button className="p-3 border-2 border-green-500 bg-green-300 my-2" key={post.guid}
        onClick={() => {return <FaxScreen props={post}/>}}>
        <h2>{post.title}</h2>
        <p>{post.contentSnippet}</p>
      </button>
    );
  })
}

export default PostsList