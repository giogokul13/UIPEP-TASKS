"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BoardComponentComponent = void 0;
var core_1 = require("@angular/core");
var BoardComponentComponent = /** @class */ (function () {
    function BoardComponentComponent() {
    }
    BoardComponentComponent.prototype.ngOnInit = function () {
        this.NewGame();
    };
    BoardComponentComponent.prototype.NewGame = function () {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.Xisnext = true;
    };
    BoardComponentComponent.prototype.GetPlayer = function () {
        return this.Xisnext ? 'X' : 'O';
    };
    BoardComponentComponent.prototype.MakeMove = function (idx) {
        if (!this.squares[idx]) {
            this.squares.splice(idx, 1, this.GetPlayer());
            this.Xisnext = !this.Xisnext;
        }
        this.winner = this.calculatewinner();
    };
    BoardComponentComponent.prototype.calculatewinner = function () {
        var lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2.4, 6]
        ];
        for (var i = 0; i < lines.length; i++) {
            var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
            if (this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]) {
                return this.squares[a];
            }
        }
        return null;
    };
    BoardComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-board-component',
            templateUrl: './board-component.component.html',
            styleUrls: ['./board-component.component.css']
        })
    ], BoardComponentComponent);
    return BoardComponentComponent;
}());
exports.BoardComponentComponent = BoardComponentComponent;
