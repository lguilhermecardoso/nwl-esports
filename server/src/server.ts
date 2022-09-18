import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { converMinutesToHourString } from './utils/converMinutesToHourString';
const app = express();
app.use(express.json());

app.use(cors());

const prisma = new PrismaClient({
  log: [ 'query']
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });
  return response.json(games);
});

app.post('/game/:id/ads', async (request, response) => {

  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      weekDays: body.weekDays.join(','),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlayng: body.yearsPlayng,
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      discord: body.discord,
    },
  })

  return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlayng: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createtAt: 'desc',
    },
    where: {
      gameId
    }
  });

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: converMinutesToHourString(ad.hourStart),
      hourEnd: converMinutesToHourString(ad.hourEnd),
    }
  }));
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findFirstOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })  

  return response.json({
    discord: ad.discord,
  });
});


app.listen(3333);