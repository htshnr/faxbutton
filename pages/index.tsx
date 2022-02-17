import type { NextPage } from 'next'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Destinations from '../components/Destinations';
import FaxScreen from '../components/FaxScreen';
import PostsList from '../components/postsList';

const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState("");
  const [posts, setPosts] = useState({});
  // const [showPosts, setShowPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const [destinations, setDestinations] = useState(Array());

  // const [destKeys, setDestKeys] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const dk = localStorage.getItem("destKeys");
  //     if (dk != null) {
  //       return JSON.parse(dk);
  //     }
  //     return {};
  //   }
  //   return {};
  // })

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

  // console.log("DESTKEYS: ", destKeys)
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
          className="relative mt-5 text-2xl font-bold "
        >
          &#8592;
        </button>
        {/* { Object.keys(selectedPost).length !== 0 && */}
        <div>
          <div className="text-4xl mt-4">
            Title: {selectedPost.title}
          </div>
          <div className="text-lg mt-4">
            Description: {selectedPost.contentSnippet}
          </div>
          <div className="mt-2">
            Source: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer"><span className="underline">{selectedPost.link}</span> &#8599;</a>
          </div>
          {/* <div className="text-white mt-2  font-semibold">
              Content : <p>{selectedPost["content:encodedSnippet"]}</p>
            </div> */}
        </div>
        {/* } */}

        {/* <div className="mt-12 text-2xl">
<h3>Additional Text</h3>
<input type="textarea" className=""/>
</div> */}
        {console.log(destinations)}
        {console.log((destinations.includes("Medium")))}
        <div className="mt-12 text-2xl bg-black">
          <h3 className="font-semibold">Publish to</h3>

<Destinations destinations={destinations} setDestinations={setDestinations}/>


          {/* <div className="my-5 grid grid-cols-3 gap-10">
            <button className={`p-5 flex flex-col justify-center items-center ${destinations.includes("Medium") ? "bg-green-400" : "bg-green-200"}`}
              onClick={() => {
                const index = destinations.indexOf("Medium");
                index === -1 ? setDestinations(oldArray => [...oldArray, "Medium"]) : setDestinations(oldArray => { const copy = oldArray.slice(); copy.splice(index); return [...copy]; });
              }}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg" className="w-1/4" />
              <span className="text-black mt-2 text-2xl font-semibold">Medium
              </span>
            </button>

            <button className="p-5 bg-green-200 hover:bg-green-300 flex flex-col justify-center items-center"
              onClick={() => { setDestinations(oldArray => [...oldArray, "Dev.to"]) }}
            >
              <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png" className="w-1/4" />
              <span className="text-black mt-2 text-2xl font-semibold">Dev.to</span>
            </button>

            <button className="p-5 bg-green-200 hover:bg-green-300 flex flex-col justify-center items-center"
              onClick={() => { setDestinations(oldArray => [...oldArray, "Hashnode"]) }}>
              <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress" className="w-1/4" />
              <span className="text-black mt-2 text-2xl font-semibold">Hashnode</span>
            </button>

            <button className="p-5 bg-green-200 hover:bg-green-300 flex flex-col justify-center items-center"
              onClick={() => { setDestinations(oldArray => [...oldArray, "Twitter"]) }}>
              <img src="https://www.apacph.org/wp/wp-content/uploads/2014/03/Twitter-Logo-New-.png" className="w-1/4" />
              <span className="text-black mt-2 text-2xl font-semibold">Twitter</span>
            </button>

            <button className="p-5 bg-green-200 hover:bg-green-300 flex flex-col justify-center items-center"
              onClick={() => { setDestinations(oldArray => [...oldArray, "Hacker News"]) }}>
              <img src="https://cdn.iconscout.com/icon/free/png-256/hackernews-2752164-2284981.png" className="w-1/4" />
              <span className="text-black mt-2 text-2xl font-semibold">Hacker News</span>
            </button>


          </div> */}


        </div>

      </div>



    </div>
  )
}

export default Home