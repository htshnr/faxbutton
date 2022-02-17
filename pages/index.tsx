import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Destinations from '../components/Destinations';


const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState("");
  const [posts, setPosts] = useState({});
  const [selectedPost, setSelectedPost] = useState({});
  const [destinations, setDestinations] = useState(Array());

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
          onClick={() => {
            if (urlInputBox !== "") {
              //perform checks for url correctness
              fetch("api/cors?url=" + urlInputBox)
                .then(res => {
                  if (!res.ok) {
                    throw Error(res.statusText);
                  }
                  return res;
                })
                .then(res => res.json()).then(data => {
                  setPosts(data);
                })
                .catch(err => {
                  console.log(err);
                });
            }
            else { alert("Oops! You haven't added your Substack url yet!") }
          }}
        >Fetch posts</button>

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
      {console.log(selectedPost)}
      <div
        className={`top-0 right-0 w-2/3 bg-black p-20 pt-12 text-white fixed overflow-scroll h-full z-10 ease-in-out duration-200 ${(Object.keys(selectedPost).length !== 0) ? "translate-x-0 " : "translate-x-full"}`}>

        <button
          onClick={() => setSelectedPost({})}
          className="relative text-2xl font-bold "
        >
          &#8592;
        </button>
        <div className="mt-6">
          <div className="text-4xl mt-4">
            Title: {selectedPost.title}
          </div>
          <div className="text-lg mt-4">
            Description: {selectedPost.contentSnippet}
          </div>
          <div className="mt-2">
            Source: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer"><span className="underline">{selectedPost.link}</span> &#8599;</a>
          </div>
        </div>
        <div className="mt-12 text-2xl bg-black">
          <h3 className="font-semibold">Publish to</h3>
          <Destinations destinations={destinations} setDestinations={setDestinations} />
        </div>

        <div className="mt-12">
          <button className="bg-green-300 text-black w-full p-5 text-2xl font-semibold hover:bg-green-400"
            onClick={() => {
              if (destinations.length) {
                fetch("api/fax", {
                  method: "POST",
                  headers: {'Content-Type':'application/json'},
                  body: JSON.stringify([selectedPost, destinations])
                })
                  .then(res => {
                    if (!res.ok) {
                      throw Error(res.statusText);
                    }
                    
                   { console.log()
                     return res; }
                  })
                  .then(res => res.json()).then(data => {
                    console.log(data)
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              else { alert("Oops! You haven't chosen a destination yet!") }
            }}
          >
            Fax
          </button>
        </div>
      </div>



    </div>
  )
}

export default Home