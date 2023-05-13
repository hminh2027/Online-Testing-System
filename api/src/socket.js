const config = require("./config/config");
const { redis } = require("./database/redis");

let users = new Map();

module.exports.socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);

    // Receive heartbeat from client
    socket.on("heartbeat", (userId) => {
      const user = users.get(userId);

      // Update last heartbeat time for user
      if (user) user.lastHeartbeat = Date.now();
      console.log('I"m still alive!');
    });

    socket.on("reconnect", (userId) => {
      // Store user socket connection in users object
      addUser(userId, socket.id);
      console.log("current", users);

      const heartbeatInterval = setInterval(() => {
        const user = users.get(userId);

        // Check if user has disconnected
        if (!user) {
          clearInterval(heartbeatInterval);
          return;
        }

        // Check if user has sent a heartbeat within the specified interval
        const timeSinceLastHeartbeat = Date.now() - user.lastHeartbeat;
        if (timeSinceLastHeartbeat > config.socket.heartbeat * 2) {
          console.log("User disconnected:", id);
          clearInterval(heartbeatInterval);
          users.delete(id);
          // TODO: Update test database to lock test
          console.log("well me go lock the test!!!");
          return;
        }
      }, config.socket.heartbeat);
    });

    socket.on("tabout", async (userId) => {
      const user = getUser(userId);
      const tab = user.tabout++;

      redis.set(userId, tab);
      console.log("newone", users);

      console.log("in redis", await redis.get(userId));
    });
  });
};

const addUser = (userId, socketId) => {
  users.set(userId, { userId, socketId, lastHeartbeat: Date.now(), tabout: 0 });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.get(userId);
};
