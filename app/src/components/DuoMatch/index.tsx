import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as ClipBoard from 'expo-clipboard';
interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
  const [isCopping, setIsCopping] = useState(false);
  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await ClipBoard.setStringAsync(discord);

    Alert.alert('Discord copiado', 'Usuário copiado para você colar no discord e encontrar essa pessoa');
    setIsCopping(false);
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType='fade'
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading style={{alignItems: 'center', marginTop: 24}} title="Let's Play!" subtitle='Agora é só começar a jogar' />
          <Text style={styles.label}>
            Adicione no discord
          </Text>
          <TouchableOpacity
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}