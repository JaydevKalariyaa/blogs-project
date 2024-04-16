const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DB_L: "mongodb+srv://jaydevkalariya27:jkjk@blogs.mzb16bj.mongodb.net/?retryWrites=true&w=majority&appName=blogs",
        DB_NAME: "blogDb",
      },
    };
  } else {
    return {
      env: {
        DB_L: "mongodb+srv://jaydevkalariya27:jkjk@blogs.mzb16bj.mongodb.net/?retryWrites=true&w=majority&appName=blogs",
        DB_NAME: "blogDb",
        NEXT_PUBLIC_SECRET: "jkjkjkjk",
      },
    };
  }
};
