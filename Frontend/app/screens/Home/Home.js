import { View, Text,FlatList,Image,Dimensions } from 'react-native'
import React from 'react'
import axios from 'axios'
export default function Home() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=3180c4696af743a1923486193a32f273')
        .then(res => {
            console.log(res.data)
            setData(res.data.articles)
        }
        )
    }, [])

  return (
    <View style={{
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <FlatList
        // horizontal={true}
        data={data}
        renderItem={({item}) =>
        <View style={{
            flex: 1,
            width: Dimensions.get('window').width,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            // height:'100%',

        }}>
        <Text style={{color:'#000'}}>{item.title}</Text>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Image source={{uri: item.urlToImage}} style={{width: 200, height: 200}} />

        </View>
        <Text>{item.description}</Text>
        <Text>{item.publishedAt.slice(0,10)}</Text>
        <Text>{item.source.name}</Text>
        </View>
        }
        />
    </View>
  )
}