import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, Image, Button} from 'react-native';
import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

function RenderMovies({item, index}, navigation) {
  let number = Math.floor(Math.random() * 100) + 100;
  item.image = 'https://picsum.photos/' + number;
  return (
    <Pressable
      onPress={() => navigation.navigate('Detail', {item: item})}
      style={{
        width: '95%',
        height: 70,
        backgroundColor: '#ffffff70',
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50}}
          borderRadius={25}
          source={{
            uri: item.image,
          }}
        />
        <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{item.title}</Text>
      </View>
    </Pressable>
  );
}

function List({navigation}) {
  const [data, setData] = useState([]);
  const BASE_URL = 'https://reactnative.dev/movies.json';
  const getData = async () => {
    axios.get(`${BASE_URL}`, {}).then(response => {
      setData(response.data.movies);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={data}
        renderItem={({item, index}) => RenderMovies({item, index}, navigation)}
        style={{width: '100%'}}
      />
    </View>
  );
}

export default List;
