import { ImageBackground } from 'react-native';

import { styles } from './styles';

import backgroundIMG from '../../assets/background-galaxy.png';

interface Props {
  children: React.ReactNode;
}

export function Background({children}: Props) {
  return (
    <ImageBackground
      source={backgroundIMG}
      defaultSource={backgroundIMG}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}