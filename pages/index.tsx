import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import FaxScreen from '../components/FaxScreen';
import PostsList from '../components/postsList';

const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState("");
  const [posts, setPosts] = useState({});
  // const [showPosts, setShowPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost({})
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="m-12 flex flex-row justify-center">
      <div className="flex flex-col w-full">
        <input type="url" className="border-green-500 border-2 rounded-lg p-3" placeholder="Your Substack page's URL" value={urlInputBox} onChange={(e) => setUrlInputBox(e.target.value)} />
        <button className="my-6 p-3 bg-green-600 rounded-lg hover:bg-green-700 text-white"
          onClick={(e) => {
            if (urlInputBox !== "") {
              //perform checks for url correctness
              fetch("api/cors?url=" + urlInputBox)
                .then(res => {
                  if (!res.ok) {
                    // setShowPosts(false)
                    throw Error(res.statusText);
                  }
                  return res;
                })
                .then(res => res.json()).then(data => {
                  setPosts(data);
                  // setShowPosts(true);
                })
                .catch(err => {
                  console.log(err);
                })
            }
            else { alert("Oops! You haven't added your Substack url yet!") }
          }}
        >Fetch posts</button>

        {/* {showPosts && <PostsList posts={posts} />} */}
        <div className="flex flex-col">
          {Object.keys(posts).length !== 0 && posts.items.map((post) => {
            return (
              <button className="p-3 mb-4 w-full text-left border-2 border-green-500 bg-green-200 hover:bg-green-100" key={post.guid}
                onClick={() => { setSelectedPost(post) }}>
                <h2 className="text-2xl">{post.title}</h2>
                <p className="text-sm">{post.contentSnippet}</p>
              </button>
            );
          })}
        </div>
      </div>
      {/* {Object.keys(selectedPost).length !== 0 && <FaxScreen post={selectedPost} />} */}
      {console.log(selectedPost)}
      <div
        className={`top-0 right-0 w-2/3 bg-blue-700 p-20 text-white fixed overflow-scroll h-full z-10 ease-linear duration-200 ${(Object.keys(selectedPost).length !== 0) ? "translate-x-0 " : "translate-x-full"}`}>

        <button
          onClick={() => setSelectedPost({})}
          className="fixed z-20 flex items-center right-10 top-6">
          Close
        </button>

        <div>
          <div className="text-white text-3xl font-semibold">
            Title: {selectedPost.title}
          </div>
          <div className="text-white mt-2  font-semibold">
            Description : {selectedPost.contentSnippet}
          </div>
          <div className="text-white mt-2  font-semibold">
            Source : <a className="underline" href={selectedPost.link}>{selectedPost.link}</a>
          </div>
          {/* <div className="text-white mt-2  font-semibold">
              Content : <p>{selectedPost["content:encodedSnippet"]}</p>
            </div> */}
        </div>

        <div className="my-4 text-2xl">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
            <label htmlFor="vehicle1"> Medium</label><br/>
              <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                <label htmlFor="vehicle2"> Dev.to</label><br/>
                  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                    <label htmlFor="vehicle3"> Hashnode</label><br/>

                    </div>

                    </div>


                  </div>
                  )
}

                  export default Home