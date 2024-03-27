const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '3ba754518amsh12eee2feca0cc36p12b945jsnb1cb76548f4e',
    'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: 'Hello, how is it going?'
      }
    ],
    model: 'gpt-4-turbo-preview',
    max_tokens: 200,
    temperature: 0.9
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}