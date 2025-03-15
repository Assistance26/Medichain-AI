import axios from "axios";

const API_BASE_URL = "http://localhost:5003/api/chatbot";
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const TIMEOUT = 30000; // 30 seconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getResponse = async (message, persona = "Medical Assistant") => {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🚀 Sending request (Attempt ${attempt}/${MAX_RETRIES})`, { message, persona });

      const response = await axios.post(
        `${API_BASE_URL}/query`,
        { message, persona },
        {
          timeout: TIMEOUT,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("📥 Received response:", response.data);
      
      if (!response.data || !response.data.reply) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (error) {
      lastError = error;
      console.error(`❌ Error on attempt ${attempt}:`, error.message);

      if (error.code === "ECONNREFUSED") {
        console.error("⚠️ Server is not running. Please start the backend.");
        throw new Error("Server is not running. Please start the backend.");
      }

      if (error.response) {
        const { status, data } = error.response;

        if (status === 503) {
          console.log(`⏳ Server unavailable. Retrying in ${RETRY_DELAY / 1000} seconds...`);
          await sleep(RETRY_DELAY);
          continue;
        }

        if (status === 401) {
          console.error("❌ API authentication failed. Check API keys.");
          throw new Error("Unauthorized: Check API credentials.");
        }

        if (status === 400) {
          console.error("❌ Bad Request:", data);
          throw new Error(data.error || "Invalid request.");
        }
      }

      if (attempt < MAX_RETRIES) {
        console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await sleep(RETRY_DELAY);
      }
    }
  }

  console.error("❌ Chat Service Error:", lastError);
  throw new Error("Could not get response from server. Please try again later.");
};

export default { getResponse };
