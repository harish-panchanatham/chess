import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_INIT, GAME_MOVE } from "./messages";
export class Game {
    public player1 : WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private move: string[];
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.move = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({ type: GAME_INIT, payload: "white" }));
        this.player2.send(JSON.stringify({ type: GAME_INIT, payload: "black" }));
    }

    makeMove(socket: WebSocket, move: string) {
       
        try {
            console.log("hi");
            this.board.move(move);
        this.move.push(move);
        if (socket === this.player1) {
            this.player2.send(JSON.stringify({ type: GAME_MOVE, payload: move }));
        } else {
            this.player1.send(JSON.stringify({ type: GAME_MOVE, payload: move }));
            }
        } catch (error) {
            console.error(error);
        }
    }
} 
