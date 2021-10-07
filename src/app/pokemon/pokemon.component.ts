import { Component, OnInit } from "@angular/core";
import { Pokemon, PokemonList } from "./pokemon.interface";
import { PokemonService } from "./pokemon.service";

@Component({
    selector:'pokemon',
    templateUrl: './pokemon.component.html',
styleUrls:['./pokemon.component.scss']
})
export class PokemonClass implements OnInit {
    public pokemon: Pokemon[] =[];
    public pokemonListToShow: any[] =[];
    public imageList: any[] =[];
    public imageListToShow: any[] =[];
    public nameText: string ='';
    public abilitiesText: string ='';
    public itemList: any[]= [];
    public page: number = 0;
    constructor(private pokemonService: PokemonService) {
        
    }
    ngOnInit() {
        this.pokemonService.fetchPokemonsData().pipe().subscribe((res: any)=>{
            this.pokemon = res.results;
            console.log('this.pokemon', this.pokemon);
            if(this.pokemon && this.pokemon.length >0) {
                this.imageList =[];
                this.pokemon.forEach((el)=>{
                    this.fetchImage(el.url);
                });
            }
        });
        
    }
    onPageChange(event: any) {
        this.pokemonListToShow = this.pokemon.slice((event.page), (event.page+6));
    }
    fetchImage(url: string){
        this.itemList =[];
        this.pokemonService.fetchImage(url).subscribe((el: any)=>{
            this.pokemonListToShow.push(el);
            this.itemList.push(el);
            this.imageList.push(el['sprites']['other']['official-artwork']['front_default']);
        })
    }
    searchByName(event: any) {
        let pokemonListToShow = this.pokemonListToShow;
        if (event) {
            this.pokemonListToShow = this.itemList.filter((el) => {
                return (el['name'].indexOf(event) !== -1);
            });
            if (this.pokemonListToShow && this.pokemonListToShow.length > 0)
                this.imageList = [];
            this.pokemonListToShow.forEach((el: any) => {
                this.imageList.push(el['sprites']['other']['official-artwork']['front_default']);
            })
        } else {
            this.pokemonListToShow = this.pokemon.slice(this.page, this.page+6);
            this.pokemonListToShow.forEach((el)=>{
                this.fetchImage(el.url);
            });
        }
    }
    searchByabilities(event: any) {
        if (this.abilitiesText) {
            this.pokemonListToShow =[];
            this.itemList.filter((el) => {
                el['abilities'].forEach((el2: any)=>{
                    if (el2["ability"]['name'].indexOf(event) !== -1) {
                        this.pokemonListToShow.push(el);
                    }
                })
            });
            if (this.pokemonListToShow && this.pokemonListToShow.length > 0)
                this.imageList = [];
            this.pokemonListToShow.forEach((el: any) => {
                this.imageList.push(el['sprites']['other']['official-artwork']['front_default']);
            })
        } else {
            this.pokemonListToShow = this.pokemon.slice(this.page, this.page+6);
            this.pokemonListToShow.forEach((el)=>{
                this.fetchImage(el.url);
            });
        }
    }
    sortByName() {
        this.pokemonListToShow.sort((a,b)=>{
            if(a.name > b.name){
                return 1;
            } else if (b.name > a.name) {
                return -1;
            } else return 0;
        });
    }
    sortByHeight() {
        this.pokemonListToShow.sort((a,b)=>{
            if(a.height > b.height){
                return 1;
            } else if (b.height > a.height) {
                return -1;
            } else return 0;
        });
    }
    sortByWeight() {
        this.pokemonListToShow.sort((a,b)=>{
            if(a.weight > b.weight){
                return 1;
            } else if (b.weight > a.weight) {
                return -1;
            } else return 0;
        });
    }
}