import { useState, useEffect } from 'react';
import './styles/main.css';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

import logoImg from './assets/logo-nwl-esports.svg';
import { CreateAdsBanner } from './components/CreateAdsBanner';
import { CreateAdModal } from './components/CreateAdModal';

export interface Game {
  id: string;
  title: string;
  // @ TODO: change name to a correct name for banner
  banerUrl: string;
  _count: {
    ads: number;
  }
};
function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
     .then((response) => response.json())
     .then(data => {
      setGames(data);
     }).catch(error => console.warn(error));
  }, []);
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg}/>
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return  (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.banerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdsBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
