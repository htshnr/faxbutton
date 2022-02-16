import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// import PostsList from '../components/postsList';

const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState("");
  const [posts, setPosts] = useState({});
  const [showPosts, setShowPosts] = useState(false)

  useEffect(() => {
    // console.log(posts);
  }, [posts])

  function PostsList({ posts: { items } }) {
    const [selected, setSelected] = useState(Array());
    console.info("SELECTED", selected)
    // console.log("PROPSS", items)
    return items.map((post) => {
      return (
        <button className={`p-3 border-2 border-green-500 my-2 ${selected.includes(post) ? "bg-green-600" : "bg-green-300"}`} key={post.guid}
          onClick={() => {
            const index = selected.findIndex(x => x.guid == post.guid);
            (index == -1) ?
              setSelected(c => [...c, post])
              :
              setSelected([
                ...selected.slice(0, index),
                ...selected.slice(index + 1)
              ])
          }
          }>
          <h2>{post.title}</h2>
          <p>{post.contentSnippet}</p>
        </button>
      );
    })
  }

  return (
    <div className="m-12 flex flex-col justify-center">
      <input className="border-green-500 border-2 rounded-lg p-3 w-full" placeholder="Your Substack page's URL" value={urlInputBox} onChange={(e) => setUrlInputBox(e.target.value)} />
      <button className="mt-8 p-3 bg-green-500 rounded-lg hover:bg-green-400 text-white w-full"
        onClick={(e) => {
          if (urlInputBox !== "") {
            //perform checks for url correctness
            fetch("api/cors?url=" + urlInputBox)
              .then(res => {
                if (!res.ok) {
                  setShowPosts(false)
                  throw Error(res.statusText);
                }
                return res;
              })
              .then(res => res.json()).then(data => {
                setPosts(data);
                setShowPosts(true);
              })
              .catch(err => {
                console.log(err);
              })
          }
          else { alert("Oops! You haven't added your Substack url yet!") }
        }}
      >Fetch posts</button>

      {console.log("SHOWPOSTS", showPosts)}



      {showPosts && <PostsList posts={posts} />}

    </div>
  )
}

export default Home