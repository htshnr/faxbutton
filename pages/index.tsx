import type { NextPage } from 'next'
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react'
import Destinations from '../components/Destinations';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Watch } from 'react-loader-spinner';
import Reward from 'react-rewards';


const Home: NextPage = () => {
  const [urlInputBox, setUrlInputBox] = useState<string>("");
  const [posts, setPosts] = useState<any>({});
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [destinations, setDestinations] = useState<string[]>(Array());
  const [listLoaderShow, setListLoaderShow] = useState<boolean>(false);
  const [faxLoaderShow, setFaxLoaderShow] = useState<boolean>(false);

  const doneFaxReward = useRef(null);

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
          <form className='w-full flex flex-col'>
            <input type="url" className="border-green-500 border-2 rounded-lg p-3" placeholder="Your RSS Feed URL" value={urlInputBox} onChange={(e) => setUrlInputBox(e.target.value)} />
            <button
              type='submit'
              className="my-6 p-3 bg-green-600 rounded-lg hover:bg-green-700 text-white"
              onClick={(e) => {
                e.preventDefault();
                if (urlInputBox !== "") {
                  setListLoaderShow(true);
                  // add checks for url correctness later
                  fetch("api/cors?url=" + urlInputBox)
                    .then(res => {
                      setListLoaderShow(false);
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
                else { alert("You haven't added an RSS feed url yet!") }
              }}
            >Fetch posts</button>
          </form>

          {urlInputBox === "" &&
            <div className='bg-black p-8 my-10 text-center'>
              <span className='text-white'>A few example feeds (for you to try out the demo with)</span>

              <div className='flex flex-col md:grid md:grid-cols-2 gap-4 mt-8'>
                <button className='p-4 bg-green-100 hover:bg-green-200'
                  onClick={() => {
                    setUrlInputBox("https://tips.ariyh.com/feed")
                  }}
                >
                  https://tips.ariyh.com/feed
                </button>
                <button className='p-4 bg-green-100 hover:bg-green-200'
                  onClick={() => {
                    setUrlInputBox("https://www.readaccelerated.com/feed")
                  }}
                >
                  https://www.readaccelerated.com/feed
                </button>
                <button className='p-4 bg-green-100 hover:bg-green-200'
                  onClick={() => {
                    setUrlInputBox("https://filtercoffee.substack.com/feed")
                  }}
                >
                  https://filtercoffee.substack.com/feed
                </button>
                <button className='p-4 bg-green-100 hover:bg-green-200'
                  onClick={() => {
                    setUrlInputBox("https://www.quastor.org/feed")
                  }}
                >
                  https://www.quastor.org/feed
                </button>
              </div>

            </div>}

          <div className="flex flex-col">
            {listLoaderShow && <div className='relative mb-6 self-center'> <Watch color='#000000' /> </div>}
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
          className={`flex flex-col top-0 right-0 w-2/3 bg-black p-20 pt-12 text-white fixed overflow-scroll h-full z-10 ease-in-out duration-200 ${(Object.keys(selectedPost).length !== 0) ? "translate-x-0 " : "translate-x-full"}`}>

          <button
            onClick={() => setSelectedPost({})}
            className="relative text-left text-2xl font-bold hover:text-green-200"
          >
            &#8592;
          </button>
          <div className="my-6">
            <div className="text-2xl font-semibold mt-4">
              {selectedPost.title}
            </div>
            <div className="mt-2">
              Source: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-200">{selectedPost.link}</a>
            </div>
          </div>
          {!selectedPost.medUrl && !faxLoaderShow &&
            <div className="my-6 text-2xl bg-black">
              <h3 className="font-semibold">Publish to</h3>
              <Destinations destinations={destinations} setDestinations={setDestinations} />
            </div>
          }
          {!selectedPost.medUrl && !faxLoaderShow &&
            <div className="my-6">
              <button className="bg-green-600 hover:bg-green-700 text-white w-full p-5 text-2xl font-semibold"
                onClick={() => {
                  if (destinations.length) {
                    setFaxLoaderShow(true);
                    fetch("api/fax", {
                      method: "POST",
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify([selectedPost, destinations])
                    })
                      .then(res => {
                        setFaxLoaderShow(false);
                        if (!res.ok) {
                          throw Error(res.statusText);
                        }
                        return res;
                      })
                      .then(res => res.json()).then(data => {
                        setSelectedPost((c: object) => { return { ...c, "medUrl": data.url } });
                      })
                      .catch(err => {
                        console.debug(err);
                      });
                  }
                  else { alert("You haven't chosen a destination yet!") }
                }}
              >
                Fax
              </button>
            </div>
          }

          {faxLoaderShow &&
            <div className='self-center mt-20'> <Watch color='#FFFFFF' /> </div>
          }

          {selectedPost.medUrl &&
            <Reward
              ref={(r) => {
                console.log("RR", r);
                r?.rewardMe();
              }}
              type='confetti'>
              <div className="mt-4 p-4 bg-green-600 text-lg font-semibold">
                <p>
                  Published successfully!
                  <a className="block" href={selectedPost.medUrl} target="_blank" rel="noopener noreferrer">
                    <span className="underline hover:text-green-200">{selectedPost.medUrl}</span>  &#8599;
                  </a>
                </p>
                <p className='mt-4'>
                  (P.S: This was a demo walkthrough and publishes only to Medium.)
                </p>
              </div>

            </Reward>}
        </div>



      </div>
    </>
  )
}

export default Home