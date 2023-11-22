const config = require("./config/config");
const { attemptService } = require("./services");

let users = new Map();

module.exports.socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);

    // ADD USER VAO DE
    // addUser(userId, socket.id);

    socket.on("createNoti", ({ recipentIds, message }) => {
      recipentIds.forEach((id) => {
        const user = getUser(id);
        console.log(users, recipentIds);
        if (user) socket.to(user.socketId).emit("createNoti", message);
      });
    });

    // Receive heartbeat from client
    socket.on("heartbeat", (userId) => {
      const user = users.get(userId);

      // Update last heartbeat time for user
      if (user) user.lastHeartbeat = Date.now();
      console.log('I"m still alive!');
    });

    socket.on("reconnect", (userId, attemptId) => {
      // Store user socket connection in users object
      addUser(userId, socket.id);
      console.log("current", users);

      const heartbeatInterval = setInterval(async () => {
        const user = users.get(userId);

        // Check if user has disconnected
        if (!user) {
          clearInterval(heartbeatInterval);
          return;
        }

        // Check if user has sent a heartbeat within the specified interval
        const timeSinceLastHeartbeat = Date.now() - user.lastHeartbeat;
        if (timeSinceLastHeartbeat > config.socket.heartbeat * 2) {
          console.log("User disconnected:", userId);
          clearInterval(heartbeatInterval);
          users.delete(userId);
          // TODO: Update test database to lock test
          const attempt = await attemptService.getOneOngoing(userId);
          if (attempt && !attempt.Exam.isResumeAllowed) {
            console.log("Lock the test!!!");
            await attemptService.updateOneById(attemptId);
          }
          return;
        }
      }, config.socket.heartbeat);
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
  return users.get(userId);
};
