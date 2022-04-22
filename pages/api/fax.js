import axios from "axios";

const Fax = async (req, res) => {
  const [post, destinations] = req.body;
  const mediumToken = process.env.mediumToken;
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
  axios.post(
      `https://api.medium.com/v1/users/${mediumId}/posts`,
      bodyParameters,
      config
    )
    .then((o) => {
      console.log(o.data.data);
      res.status(200).send(o.data.data);
    })
    .catch(console.log);

};

export default Fax;
