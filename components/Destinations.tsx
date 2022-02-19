/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'

interface DestProps {
  destinations: string[],
  setDestinations: Dispatch<SetStateAction<string[]>>
}

function Destinations({ destinations, setDestinations }: DestProps) {

  const destList = [
    {
      name: "Medium",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg"
    },
    {
      name: "Dev.to",
      logo: "https://d2fltix0v2e0sb.cloudfront.net/dev-black.png"
    },
    {
      name: "Hashnode",
      logo: "https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
    },
    {
      name: "Twitter",
      logo: "https://www.apacph.org/wp/wp-content/uploads/2014/03/Twitter-Logo-New-.png"
    },
    {
      name: "Hacker News",
      logo: "https://cdn.iconscout.com/icon/free/png-256/hackernews-2752164-2284981.png"
    }
  ]

  return (
    <div className="my-5 grid grid-cols-3 gap-10">

      {destList.map((dest) => {

        return (
          <button key={dest.name} className={`p-5 flex flex-col justify-center items-center ${destinations.includes(dest.name) ? "bg-green-400" : "bg-green-200"}`}
            onClick={() => {
              const index = destinations.indexOf(dest.name);
              index === -1 ? setDestinations(oldArray => [...oldArray, dest.name]) : setDestinations(oldArray => { const copy = oldArray.slice(); copy.splice(index, 1); return [...copy]; });
            }}
          >
            <img src={dest.logo} alt="" className="w-1/4" />
            <span className="text-black mt-2 text-2xl font-semibold">{dest.name}
            </span>
          </button>
        );
      })}
    </div>
  )
}

export default Destinations