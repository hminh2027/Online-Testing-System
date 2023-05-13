// let users = [];
let users = new Map();
const HEARTBEAT_INTERVAL = 5000;

module.exports.socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);

    // Receive heartbeat from client
    socket.on("heartbeat", (id) => {
      const user = users.get(id);

      // Update last heartbeat time for user
      if (user) user.lastHeartbeat = Date.now();
      console.log('I"m still alive!');
    });

    socket.on("reconnect", (id) => {
      // Store user socket connection in users object
      addUser(id, socket.id);
      console.log("current", users);

      const heartbeatInterval = setInterval(() => {
        const user = users.get(id);

        // Check if user has disconnected
        if (!user) {
          clearInterval(heartbeatInterval);
          return;
        }

        // Check if user has sent a heartbeat within the specified interval
        const timeSinceLastHeartbeat = Date.now() - user.lastHeartbeat;
        if (timeSinceLastHeartbeat > HEARTBEAT_INTERVAL * 2) {
          console.log("User disconnected:", id);
          clearInterval(heartbeatInterval);
          users.delete(id);
          // TODO: Update test database to lock test
          console.log("well me go lock the test!!!");
          return;
        }
      }, HEARTBEAT_INTERVAL);
    });
  });
};

const addUser = (userId, socketId) => {
  users.set(userId, { userId, socketId, lastHeartbeat: Date.now() });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
