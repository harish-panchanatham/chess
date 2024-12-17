import { WebSocket } from "ws";
import { Game } from "./Game";
import { GAME_INIT, GAME_MOVE } from "./messages";

export class GameManager {
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null;

    constructor() {
        this.games = []
        this.users = []
        this.pendingUser = null
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (message) => {
            const messageObj = JSON.parse(message.toString());
            if (messageObj.type === GAME_INIT) {
                if(this.pendingUser) {
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }

            if (messageObj.type === GAME_MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, messageObj.move);
                }
            }
        });
    }
}
