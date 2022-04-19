const API = (data, type, text = "") => {
   return {
      success: type,
      data,
      error_text: text,
   };
};

module.exports = {
   API,
};
