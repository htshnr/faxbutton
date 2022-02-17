import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import FaxScreen from '../components/FaxScreen';
import PostsList from '../components/postsList';

const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState("");
  const [posts, setPosts] = useState({});
  // const [showPosts, setShowPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const [destKeys, setDestKeys] = useState(() => {
    if (typeof window !== "undefined") {
      const dk = localStorage.getItem("destKeys");
      if (dk != null) {
        return JSON.parse(dk);
      }
      return {};
    }
    return {};
  })

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

  console.log("DESTKEYS: ", destKeys)
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
        className={`top-0 right-0 w-2/3 bg-black p-20 text-white fixed overflow-scroll h-full z-10 ease-in-out duration-200 ${(Object.keys(selectedPost).length !== 0) ? "translate-x-0 " : "translate-x-full"}`}>

        <button
          onClick={() => setSelectedPost({})}
          // className="fixed z-20 flex items-center right-10 top-6"
          className="relative my-5 text-2xl font-bold "
          >
          &#8592;
        </button>
{/* { Object.keys(selectedPost).length !== 0 && */}
        <div>
          <div className="text-3xl font-semibold">
            Title: {selectedPost.title}
          </div>
          <div className="mt-2 font-semibold">
            Description : {selectedPost.contentSnippet}
          </div>
          <div className="mt-2 font-semibold">
            Source : <a href={selectedPost.link} target="_blank" rel="noopener noreferrer"><span className="underline">{selectedPost.link}</span> &#8599;</a>
          </div>
          {/* <div className="text-white mt-2  font-semibold">
              Content : <p>{selectedPost["content:encodedSnippet"]}</p>
            </div> */}
        </div>
{/* } */}
        <div className="mt-12 text-2xl bg-black">

          <fieldset className="border-t border-b border-white">
            <legend className="sr-only">Notifications</legend>
            <div className="divide-y divide-white">
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor="comments" className="font-medium text-gray-200">
                    Medium
                  </label>
                  {console.log(Boolean(destKeys.Medium))}
                  {!(Boolean(destKeys.Medium)) &&
                    <button id="comments-description" className="block text-green-400 hover:text-green-500">
                      Add your Medium integration token &#8594;
                    </button>
                  }
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label htmlFor="candidates" className="font-medium text-gray-200">
                      Dev.to
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="candidates"
                      aria-describedby="candidates-description"
                      name="candidates"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label htmlFor="offers" className="font-medium text-gray-200">
                      Hashnode
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label htmlFor="offers" className="font-medium text-gray-200">
                      Twitter
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label htmlFor="offers" className="font-medium text-gray-200">
                      Hacker News
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label htmlFor="offers" className="font-medium text-gray-200">
                      Youtube
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

        </div>

      </div>
      


    </div>
  )
}

export default Home