import axios from "axios";

const Fax = async (req, res) => {
  const [post, destinations] = req.body;
  const mediumToken =
    "2d405397cd8881feaed1edce7629f1378a01bde95050436786f8fcb3ca4a93b67";
  const mediumId =
    "14649358ebb43fe25ad84a470a4ba95b8a29b1bafa1125dfbd3319cb9acda4fe5";
  const b = {
    title: post.title,
    contentFormat: "html",
    content: post["content:encoded"],
    canonicalUrl: post.link,
    publishStatus: "public",
  };

  const config = {
    headers: { Authorization: `Bearer ${mediumToken}` },
  };

  const bodyParameters = b;
  // axios.post(
  //     `https://api.medium.com/v1/users/${mediumId}/posts`,
  //     bodyParameters,
  //     config
  //   )
  //   .then((o) => {
  //     console.log(o.data.data);
  //     res.status(200).send(o.data.data);
  //   })
  //   .catch(console.log);
    res.status(200).send({"url":"https://medium.com/@faxbuttondemo/praise-your-competitors-1de0e305a962"})
};

export default Fax;
