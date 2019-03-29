import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IPokemonDetails {
  name: string;
  abilities: IAbility[];
}

interface IAbility {
  name: string;
}

interface IResponse {
  forms: any;
  abilities: any;
}

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent implements OnInit {
  pokemonDetails: IPokemonDetails = { name: '', abilities: [] };
  host = 'https://pokeapi.co/api/v2';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  async ngOnInit() {
    let id;
    this.route.params.subscribe(async (params) => (id = params.id));
    id++;

    const res: IResponse = await this.httpClient.get<IResponse>(this.host + '/pokemon/' + (id)).toPromise();

    this.pokemonDetails.name = res.forms[0].name;
    res.abilities.forEach(ability => {
      this.pokemonDetails.abilities.push(ability.ability.name);
    });
  }
}
