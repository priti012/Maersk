import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { PokemonList } from "./pokemon.interface";

@Injectable()
export class PokemonService {
    public pokemonList: PokemonList[] =[];
    constructor(private httpClient: HttpClient) {}
    fetchPokemonsData() {
       return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    }
    fetchImage(url: string) {
        return this.httpClient.get(url);
    }
}