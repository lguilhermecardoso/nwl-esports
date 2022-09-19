import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Douinfo } from '../Douinfo';
import { GameController } from 'phosphor-react-native';
import { styles } from './styles';

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlayng: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DouCard({data, onConnect}: Props) {
  return (
    <View style={styles.container}>
      <Douinfo
        label='Nome'
        value={data.name}
      />
      <Douinfo
        label='Tempo de jogo'
        value={`${data.yearsPlayng} anos`}
      />
      <Douinfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <Douinfo
        label='Chamada de áudio'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}