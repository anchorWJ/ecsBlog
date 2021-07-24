const { server } = require("../src")

const { PORT } = server.context.config
const listenHandler = () => console.log(`${PORT} is opening`)
server.listen(PORT, listenHandler)