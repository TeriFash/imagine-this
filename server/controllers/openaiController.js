const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    const imageUrl = response.data.data[0].url;
    res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated!',
    });
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = { generateImage };
