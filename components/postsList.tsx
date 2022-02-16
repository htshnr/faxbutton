function PostsList({posts: {items}}) {
console.log("PROPSS", items)
  const list =  items.map((post) => {
    //   {console.log("HELLO",post.title)}
        <div className="p-3 border-2 border-green-500 my-2 text-black bg-green-200">
           <h2>{post.title}</h2> 
           <p>{post.contentSnippet}</p>
        </div>
    })

    return list;
// return <></>
}

export default PostsList;