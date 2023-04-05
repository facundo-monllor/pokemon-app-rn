import React from 'react'
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { styles } from '../theme/appTheme'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from '../components/FadeInImage'
import { PokemonCard } from '../components/PokemonCard'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets()
    const { simplePokemonList, loadPokemons } = usePokemonPaginated()

  return (
    <View>
        <Image
          source={ require("../assets/pokebola.png")}
          style={styles.pokebolaBG}
        />

      <View style={{
      alignItems:"center"
      }}
      >

        <FlatList 
           data={simplePokemonList}
           keyExtractor={ (item) => item.id}
           showsVerticalScrollIndicator= {false}
           numColumns={2}
           renderItem={({item}) => <PokemonCard pokemon={item} />}

           // Titulo
           ListHeaderComponent={ () => (
            <View style={{marginHorizontal: 20}}>
                <Text style={{
                    ...styles.globalMargin,
                    ...styles.title,
                    top: top + 20,
                    marginBottom: top + 20,
                    paddingBottom: 10
                   }}>
                     Pokedex
                </Text>
            </View>
            )}

        // renderizado de mas data
           onEndReached={loadPokemons}
           onEndReachedThreshold={0.5}


        //    Bolita de carga 
           ListFooterComponent={ () => (
            <View style={{
                height: 150,
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size={40} color="red" />
            </View>
           )}
        />

      </View>

    </View>
  )
}
