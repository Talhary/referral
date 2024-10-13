const express = require("express");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000; // Define the port number for your Express server
app.use(express.json());
app.use(express.static('public'))
function generateRandomString(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  

  const start = async (ref) => {
    try {
      console.log(ref)
      const res = await fetch("https://app.viral-loops.com/api/v2/events", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-ucid": "ODeXgDQ6O0uOUOXn0N6DxXkEVkU",
          Referer: "https://fxifyfutures.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `{\"publicToken\":\"ODeXgDQ6O0uOUOXn0N6DxXkEVkU\",\"params\":{\"event\":\"registration\",\"user\":{\"firstname\":\"jfdsjl\",\"lastname\":\"dfdsdfjdslkfj\",\"email\":\"${generateRandomString()}@gmail.com\",\"acquiredFrom\":\"form_widgetV2\",\"initialAcquiredFrom\":\"https://fxifyfutures.com/?referralCode=${ref}&refSource=copy\",\"extraData\":{},\"consents\":[]},\"referrer\":{\"referralCode\":\"${ref}\"},\"refSource\":\"copy\",\"acquiredFrom\":\"form_widgetV2\"}}`,
        method: "POST",
      });
      const data = await res.json();
  
      console.log(data);
    } catch (err) {
      console.log(err);
    } 
  };
  const act = async (code) => {
    try {
      for (let i = 0; i <= 50; i++)  start(code);
    } catch (err) {
      console.log(err);
    }
  };
  
  
  app.get("/trigger", async (req, res) => {
    const ref = req.query.ref  // Read 'ref' parameter from the query string
    await act(ref); // Trigger the function with the provided 'ref' code
    res.send("Requests triggered! Check the console for response.");
  });
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
