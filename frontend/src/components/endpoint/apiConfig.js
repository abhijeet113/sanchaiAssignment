// apiConfig.js
const BaseURL = import.meta.env.VITE_API_BASE_URL;

const apiConfig = {
    auth:{
        login: `${BaseURL}/auth/login`,
        signup: `${BaseURL}/auth/signup`,
        },
    user:{
        getUserProfile: `${BaseURL}/user/profile`,
        updateUserProfile: `${BaseURL}/user/profile/update`,
    },
    chat:{
        sendMsg:`${BaseURL}/chat/sendmsg`,
        getlist:`${BaseURL}/chat/getList`,
        getChatHistory:`${BaseURL}/chat/getChatHistory`
    }


  };
  
  export default apiConfig;
  