const Fax = async (req, res) => {
  // const reqData = JSON.parse(JSON.stringify(req.body));
  // const reqData = JSON.parse(req.body);
  // console.log('REQQQ', req.body[1]);
  const [post, destinations] = req.body;
  // console.log("HELLOOOO", post)
  const mediumToken =
    "2d405397cd8881feaed1edce7629f1378a01bde95050436786f8fcb3ca4a93b67";
  const mediumId =
    "14649358ebb43fe25ad84a470a4ba95b8a29b1bafa1125dfbd3319cb9acda4fe5";

  const b = {
    title: post.title,
    contentFormat: "html",
    content: String(post["content:encoded"]),
    canonicalUrl: post.link,
    publishStatus: "public",
  };

  console.debug("BBB", JSON.stringify(b));
  const c = JSON.stringify(b);

  if (destinations.includes("Medium")) {
    // fetch("https://api.medium.com/v1/users/14649358ebb43fe25ad84a470a4ba95b8a29b1bafa1125dfbd3319cb9acda4fe5/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "BEARER 2d405397cd8881feaed1edce7629f1378a01bde95050436786f8fcb3ca4a93b67",
    //   },
    //   body: c
    // })
    //   .then((r) => console.debug(r))
    //   .then(res.status(200).send(r));
    //   .then((res) => res.json())
    //   .then((res) => console.log(JSON.stringify(res)));

    fetch(`https://api.medium.com/v1/users/${mediumId}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mediumToken}`,
      },
      body: JSON.stringify(b),
    })
      .then((r) => res.json())
      .then((r) => {
          console.debug(JSON.stringify(r))
          res.status(200).send(JSON.stringify(r));
    });
  }

  //   return res.status(200)
};

export default Fax;
