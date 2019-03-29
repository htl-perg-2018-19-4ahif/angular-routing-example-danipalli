import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPokeResponse{
  count: number;
  results: IPokemon[];
}

interface IPokemon {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent {
  host = 'https://pokeapi.co/api/v2';
  pokeList: IPokemon[] = [];
  filter: string = '';

  constructor(private httpClient: HttpClient){
    this.loadPokeList();
  }

  async loadPokeList(){
    const res = await this.httpClient.get<IPokeResponse>(this.host + '/pokemon').toPromise();
    this.pokeList = (await this.httpClient.get<IPokeResponse>(this.host + '/pokemon?limit='+res.count).toPromise()).results;
    
    let count;
    for (count = 0; count < this.pokeList.length; count++) { 
      this.pokeList[count].id = count;
    }
    
    if(this.filter !== ''){
      this.pokeList = this.pokeList.filter(poke => poke.name.startsWith(this.filter));
    }
  }

}
