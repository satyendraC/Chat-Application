let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if(!io){
            const err = new Error("Socket.io not initialized");
            err.statusCode = 422;
        }
        return io;
    }
}