import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();
  
  function handleOpenGame({id, title, banerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, banerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.0.46:3333/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg}
          style={styles.logo}
        />
        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
        <FlatList
          style={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <GameCard
              onPress={() => handleOpenGame(item)}
              data={item}
            />
          )}
        />
      
        
      </SafeAreaView>
    </Background>
  );
}