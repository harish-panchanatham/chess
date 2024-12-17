"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.move = [];
        this.startTime = new Date();
    }
    makeMove(socket, move) {
        try {
            console.log("hi");
            this.board.move(move);
            this.move.push(move);
            if (socket === this.player1) {
                this.player2.send(JSON.stringify({ type: messages_1.GAME_MOVE, move: move }));
            }
            else {
                this.player1.send(JSON.stringify({ type: messages_1.GAME_MOVE, move: move }));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.Game = Game;
