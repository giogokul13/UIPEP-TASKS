import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css']
})
export class BoardComponentComponent implements OnInit {
  squares:any[];
  Xisnext:boolean;
  winner:any;

  constructor() { }

  ngOnInit(): void {
    this.NewGame();
  }
  NewGame(){
    this.squares = Array(9).fill(null);
    this.winner  = null;
    this.Xisnext = true;
  }

  GetPlayer(){
    return this.Xisnext ? 'X' : 'O' ;
  }
  MakeMove(idx:number){
    if(!this.squares[idx]){
      this.squares.splice(idx,1,this.GetPlayer());
      this.Xisnext = !this.Xisnext;
    }
  this.winner = this.calculatewinner();
  }

calculatewinner(){
const lines = [
  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[1,4,7],[2,5,8],[0,4,8],[2.4,6]
] ;

for(let i=0;i<lines.length;i++){
  const[a,b,c] = lines[i] ;
  if(
    this.squares[a] && 
    this.squares[a] === this.squares[b] &&
    this.squares[a] === this.squares[c]  )
{
  return this.squares[a];
}
}
return null


}



}