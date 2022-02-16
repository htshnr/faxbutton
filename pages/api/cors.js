import Parser from "rss-parser";
let parser = new Parser();

const Cors = async (req, res) => {
  const { url } = req.query;
  try {
    let feed = await parser.parseURL(url);
    //   console.log(feed);
    res.status(200).send(feed);
  } catch (error) {
    // console.log("HAHAHA", error);
    res.status(400).send(error.toString());
  }
};

export default Cors;
