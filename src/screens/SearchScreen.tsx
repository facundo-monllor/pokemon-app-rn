import React, { useEffect, useState } from 'react'
import { Text, View, Platform, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { styles } from '../theme/appTheme';

const screenWidth = Dimensions.get("window").width

export const SearchScreen = () => {

  const {top} = useSafeAreaInsets()

  const {isFetching, simplePokemonList} = usePokemonSearch()

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])
  
  const [term, setTerm] = useState("")


  useEffect(() => {
   
    if(term.length === 0) {
      setPokemonFiltered([])
    }

    if (isNaN( Number(term) ) ){
      setPokemonFiltered(simplePokemonList.filter(
        poke => poke.name.toLowerCase()
           .includes(term.toLowerCase())
           ))
    } else {
        // const pokemonById = simplePokemonList.find(poke => poke.id === term)
        setPokemonFiltered(
          // (pokemonById) ? [pokemonById] : []
          simplePokemonList.filter(poke => poke.id.includes(term))
        )
    }

  }, [term])
  

  if(isFetching){
    return(
        <Loading/>
    )
  }

  return (
    <View style={{
      flex: 1,
      marginTop: (Platform.OS === "ios") ? top : top + 10,
      // marginHorizontal: 20,
    }}>

        <SearchInput
          onDebauce={ (value) => setTerm(value)}
          style={{
              position: "absolute",
              zIndex: 999,
              width: screenWidth - 40,
              marginTop: (Platform.OS === "ios") ? top : top + 10,
              marginHorizontal: 20,
          }}/>

        <FlatList 
           data={pokemonFiltered}
           keyExtractor={ (item) => item.id}
           showsVerticalScrollIndicator= {false}
           numColumns={2}
           renderItem={({item}) => <PokemonCard pokemon={item} />}

           // Titulo
           ListHeaderComponent={ () => (
                <Text style={{
                    ...styles.globalMargin,
                    ...styles.title,
                    paddingBottom: 10,
                    marginTop: (Platform.OS === "ios") ? top + 60 : top + 70,
                   }}>
                     {term}
                </Text>
            )}

        />

    </View>
  )
}

