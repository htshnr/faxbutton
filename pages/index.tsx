import type { NextPage } from 'next'
import Head from 'next/head';
import { useState, useEffect } from 'react'
import Destinations from '../components/Destinations';


const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState<string>("");
  const [posts, setPosts] = useState<any>({});
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [destinations, setDestinations] = useState<string[]>(Array());


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
    <>
      <Head>
        <title>Faxbutton</title>
      </Head>
      <nav className='p-3 border-b-2 bg-white border-black antialiased'>
        Faxbutton
      </nav>
      <div className="m-12 flex flex-row justify-center antialiased">
        <div className="flex flex-col w-full">
          <input type="url" className="border-green-500 border-2 rounded-lg p-3" placeholder="Your RSS Feed URL" value={urlInputBox} onChange={(e) => setUrlInputBox(e.target.value)} />
          <button className="my-6 p-3 bg-green-600 rounded-lg hover:bg-green-700 text-white"
            onClick={() => {
              if (urlInputBox !== "") {
                //perform checks for url correctness
                fetch("api/cors?url=" + urlInputBox)
                  .then(res => {
                    if (!res.ok) {
                      alert("Error: " + res.statusText);
                      throw Error(res.statusText);
                    }
                    return res;
                  })
                  .then(res => res.json()).then(data => {
                    setPosts(data);
                  })
                  .catch(err => {
                    alert("Error: " + err);
                    console.debug(err);
                  });
              }
              else { alert("Oops! You haven't added your RSS Feed url yet!") }
            }}
          >Fetch posts</button>

          <div className="flex flex-col">
            {Object.keys(posts).length !== 0 && posts.items.map((post: any) => {
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
        {console.debug(selectedPost)}
        <div
          className={`flex flex-col justify-evenly top-0 right-0 w-2/3 bg-black p-20 pt-12 text-white fixed overflow-scroll h-full z-10 ease-in-out duration-200 ${(Object.keys(selectedPost).length !== 0) ? "translate-x-0 " : "translate-x-full"}`}>

          <button
            onClick={() => setSelectedPost({})}
            className="relative mt-24 text-left text-2xl font-bold hover:text-green-200"
          >
            &#8592;
          </button>
          <div className="my-6">
            <div className="text-2xl mt-4">
              Title: {selectedPost.title}
            </div>
            {/* <div className="text-lg mt-4">
              Description: {selectedPost.contentSnippet}
            </div> */}
            <div className="mt-2">
              Original: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer"><span className="underline hover:text-green-200">{selectedPost.link}</span> &#8599;</a>
            </div>
          </div>
          {!selectedPost.medUrl &&
            <div className="my-6 text-2xl bg-black">
              <h3 className="font-semibold">Publish to</h3>
              <Destinations destinations={destinations} setDestinations={setDestinations} />
            </div>
          }
          {!selectedPost.medUrl &&
            <div className="my-6">
              <button className="bg-green-600 hover:bg-green-700 text-white w-full p-5 text-2xl font-semibold "
                onClick={() => {
                  if (destinations.length) {
                    fetch("api/fax", {
                      method: "POST",
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify([selectedPost, destinations])
                    })
                      .then(res => {
                        if (!res.ok) {
                          throw Error(res.statusText);
                        }
                        return res;
                      })
                      .then(res => res.json()).then(data => {
                        setSelectedPost((c: object) => { return { ...c, "medUrl": data.url } });
                        console.debug(data)
                      })
                      .catch(err => {
                        console.debug(err);
                      });
                  }
                  else { alert("Oops! You haven't chosen a destination yet!") }
                }}
              >
                Fax
              </button>
            </div>
          }
          {selectedPost.medUrl &&
            <div className="mt-4 p-4 bg-green-600 text-lg font-semibold">
              <p>
                Published successfully!
                <a className="block" href={selectedPost.medUrl} target="_blank" rel="noopener noreferrer">
                  <span className="underline">{selectedPost.medUrl}</span>  &#8599;
                </a>
              </p>
            </div>}
        </div>



      </div>
    </>
  )
}

export default Home