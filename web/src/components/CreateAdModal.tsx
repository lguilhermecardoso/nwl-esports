import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

import { Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Game } from '../App';
import { Input } from './Form';

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setVoiceChannel] = useState(false);

  function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    console.log('here');

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    if (!data.name) return;
    axios.post(`http://localhost:3333/game/${data.game}/ads`, {
        name: data.name,
        discord: data.discord,
        weekDays: weekDays.map(Number),
        useVoiceChannel: useVoiceChannel,
        yearsPlayng: Number(data.yearsPlaing),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
    })
      .then((response) => {
        alert('Anuncio criado com sucesso');
        console.log(response);
      }).catch(error => {
        alert('Erro ao criar o anuncio');
        console.log(error);
      })
  }

  useEffect(() => {
    fetch('http://localhost:3333/games')
     .then((response) => response.json())
     .then(data => {
      setGames(data);
     }).catch(error => console.warn(error));
  }, []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

      <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="game" className='font-semibold'>Qual o game?</label>
              <select
                name="game"
                defaultValue=""
                className='bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500'
                id="game">
                  <option disabled>Selecione o game que deseja jogar</option>
                  {games.map((game) => <option key={game.id} value={game.id}>{game.title}</option>)}
              </select>
              {/* <Input
                id="game"
                placeholder='Selecione o game que deseja jogar'
              /> */}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome ou (nick name)</label>
              <Input id="name" name="name" type="text" placeholder='Como te chamam dentro do jogo?'/>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaing">Joga há quantos anos?</label>
                <Input id="yearsPlaing" name="yearsPlaing" type="number" placeholder='Tudo bem ser zero'/>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input id="discord" name="discord" type="text" placeholder='Usuario#000' />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root value={weekDays} onValueChange={setWeekDays} type='multiple'  className='grid grid-cols-4 gap-2'>
                  <ToggleGroup.Item value='0' className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="doming">D</ToggleGroup.Item>
                  <ToggleGroup.Item value='1' className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Segunda">S</ToggleGroup.Item>
                  <ToggleGroup.Item value='2' className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Terça">T</ToggleGroup.Item>
                  <ToggleGroup.Item value='3' className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quarta">Q</ToggleGroup.Item>
                  <ToggleGroup.Item value='4' className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quinta">Q</ToggleGroup.Item>
                  <ToggleGroup.Item value='5' className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sexta">S</ToggleGroup.Item>
                  <ToggleGroup.Item value='6' className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sábado">S</ToggleGroup.Item>
                </ToggleGroup.Root>

              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="hourStart">Qual horario do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input id="hourStart" name="hourStart" type="time" placeholder='De' />
                  <Input id="hourEnd" name="hourEnd" type="time" placeholder='Até' />
                </div>
              </div>
            </div>

            <label className='mt-2 flex items-center gap-2 text-sm'>
              <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                if (checked) {
                  setVoiceChannel(true);
                } else {
                  setVoiceChannel(false);
                }
              }} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close type="button" className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
              <button className='flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600' type='submit'><GameController className='w-6 h-6'/> Encontrar duo</button>
            </footer>
          </form>
        </Dialog.Content>
    </Dialog.Portal>
  );
}