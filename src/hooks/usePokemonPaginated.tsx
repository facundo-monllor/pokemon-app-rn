import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces'

export const usePokemonPaginated = () => {

     const [isLoading, setIsLoading] = useState(false)
     const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
     const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon/?limit=40")

     const loadPokemons = async() => {
        setIsLoading(true)
        
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current)
        nextPageUrl.current = resp.data.next

        mapPokemonList( resp.data.results )

        // console.log(resp.data)
     }

     const mapPokemonList = (pokemonList : Result[]) => {

        const newPokemonList:SimplePokemon[] = pokemonList.map(({name,url}) => {
            
            const urlPart = url.split("/")
            const id = urlPart[urlPart.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return {name,id,picture}
        })

        setSimplePokemonList([...simplePokemonList, ...newPokemonList])
        setIsLoading(false)

     }

    useEffect(() => {
      loadPokemons()
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
    
}
