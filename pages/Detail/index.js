import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, AsyncStorage} from 'react-native';

function Detail(props) {
  const [item, setItem] = useState(props.route.params.item);
  const [favorites, setFavorites] = useState([]);

  const favorite = () => {
    if (favorites.includes(item.id)) {
      // let f = favorites;
      //   setFavorites([]);
      // f.splice(f.indexOf(item.id), 1);
      // console.log('datas splice', f.indexOf(item.id), f);
      let f = favorites.find(favori => favori === item.id);
      console.log('item', f);
      if (item) {
        favorites.splice(favorites.indexOf(f), 1);
      }
      AsyncStorage.setItem('list', JSON.stringify(favorites));
      getFavoriteList();
    } else {
      console.log('favorite inclued pushs');
      let datas = [...favorites, item.id];
      console.log('datas', item.id, datas);
      AsyncStorage.setItem('list', JSON.stringify(datas));
      getFavoriteList();
    }
  };
  const getFavoriteList = async () => {
    let fav = JSON.parse(await AsyncStorage.getItem('list'));
    if (fav?.length > 0) {
      setFavorites(fav);
    } else {
      setFavorites([]);
    }
    console.log('fav', fav);
  };
  useEffect(() => {
    getFavoriteList();
  }, []);
  useEffect(() => {
    // getFavoriteList();
    console.log('state', favorites);
  }, [favorites]);
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View
        style={{
          width: '95%',
          minHeight: '100%',
          backgroundColor: '#ffffff70',
          alignSelf: 'center',
          marginVertical: 5,
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
          <Image
            style={{width: 150, height: 150, marginTop: '10%'}}
            borderRadius={25}
            source={{
              uri: item.image,
            }}
          />
          <View style={{flex: 1, alignItems: 'center', marginTop: '5%'}}>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text style={{fontWeight: 'bold'}}>{item.releaseYear}</Text>
            <View tyle={{marginTop: '10%'}} style>
              <Button
                style={{marginTop: '20%'}}
                onPress={favorite}
                color="#EF0031"
                title={
                  favorites.includes(item.id)
                    ? 'Favorilerden Çıkar'
                    : 'Favoriye Ekle'
                }
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Detail;
