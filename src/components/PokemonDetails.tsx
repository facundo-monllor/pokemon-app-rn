import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull, Sprites } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({pokemon} : Props) => {
  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
            ...StyleSheet.absoluteFillObject,
        }}>

        {/*Types  */}
        <View style={{
            ...styles.container,
            marginTop: 370
        }}>
            <Text style={styles.title}>Types</Text>

            <View style={{flexDirection: "row"}}>
            {
                pokemon.types.map( ({ type }) => (
                    <Text
                        style={{
                            ...styles.regularText,
                            marginRight: 10
                        }}
                        key={type.name}
                    >
                        {type.name}
                    </Text>
                ))
            }       
            </View>

            {/* Peso */}
            <Text style={styles.title}>Peso</Text>
            <Text style={styles.regularText}>{pokemon.weight}kg</Text>     

        </View>

        {/*Sprites  */}
        <View style={{...styles.container}}>
            <Text style={styles.title}>Sprites</Text>        
        </View>

        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <FadeInImage
                uri= {pokemon.sprites.front_default}
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri= {pokemon.sprites.back_default}
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri= {pokemon.sprites.front_shiny}
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri= {pokemon.sprites.back_shiny}
                style={ styles.basicSprite }
            />
        </ScrollView>

        {/* Habilidades */}
        <View style={{...styles.container}}>
            <Text style={styles.title}>Habilidades</Text>
            <View style={{flexDirection: "row"}}>
            {
                pokemon.abilities.map( ({ ability }) => (
                    <Text
                        style={{
                            ...styles.regularText,
                            marginRight: 10
                        }}
                        key={ability.name}
                    >
                        {ability.name}
                    </Text>
                ))
            }       
            </View>  
        </View>

          {/* Movimientos */}
          <View style={{...styles.container}}>
            <Text style={styles.title}>Movimientos Base</Text>
            <View style={{ flexDirection:"row", flexWrap: "wrap"}}>
            {
                pokemon.moves.map( ({ move }) => (
                    <Text
                        style={{
                            ...styles.regularText,
                            marginRight: 10
                        }}
                        key={move.name}
                    >
                        {move.name}
                    </Text>
                ))
            }       
            </View>  
        </View>

            {/* Stats */}
        <View style={{...styles.container}}>
            <Text style={styles.title}>Stats</Text>
            <View>
            {
                pokemon.stats.map( ( stat, i ) => (
                    <View
                    key={ stat.stat.name + i}
                    style={{flexDirection: "row"}}
                    >
                        <Text
                            style={{
                                ...styles.regularText,
                                marginRight: 10,
                                width: 150
                            }}
                            >
                            {stat.stat.name}
                        </Text>

                        <Text
                            style={{
                                ...styles.regularText,
                                fontWeight: "bold"
                            }}
                            >
                            {stat.base_stat}
                        </Text>
                        
                    </View>
                ))
            }       
            </View>  
        </View>

        {/* Sprite final */}
        <View style={{
            marginBottom: 20,
            alignItems: 'center'
        }}>
            <FadeInImage 
                uri={ pokemon.sprites.front_default}
                style={ styles.basicSprite}
            />        
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        marginTop: 20
    },
    title:{
    fontSize: 22,
    fontWeight: "bold"
    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 120,
        height: 120
    }
});