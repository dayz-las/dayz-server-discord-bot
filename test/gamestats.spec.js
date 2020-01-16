const getServerStatusUseCase = require('../src/domain/get-server-status.usecase.js');
const gamedig = require('gamedig');

const DAYZ_HOST = 'dayz.moralesm.cl';
const DAYZ_QUERY_PORT = 27016;
const DAYZ_GAME_TYPE = 'dayz';

describe('get server status use case', () => {

    beforeAll(() => {
        gamedig.query = jest.fn(() => Promise.resolve({ name:
            'DayZ LAS (SCL)-Persistencia-24/7- https://discord.gg/pHp62zB',
           map: 'chernarusplus',
           password: false,
           raw:
            { protocol: 17,
              folder: 'dayz',
              game: 'DayZ',
              steamappid: 0,
              numplayers: 1,
              numbots: 0,
              listentype: 'd',
              environment: 'w',
              secure: 1,
              version: '1.06.152885',
              steamid: '90131908073646081',
              tags:
               'battleye,external,privHive,shard,lqs0,etm12.000000,entm2.000000,mod,04:57',
              gameid: '221100',
              rules:
               { '\u0001\u0001':
                  '\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0001vo\u0002!\u0013Ԓ\u0011\u000bLivonia DLC\u0001\u0001\u0004dayz',
                 allowedBuild: '0',
                 dedicated: '1',
                 island: 'chernarusplus',
                 language: '65546',
                 platform: 'win',
                 requiredBuild: '0',
                 requiredVersion: '106',
                 timeLeft: '15' } },
           maxplayers: 61,
           players: [ {} ],
           bots: [],
           connect: 'dayz.moralesm.cl:2302',
           ping: 46 }));
    })
    it('Should return a Promise that resolves to DayzServerStatus instancea when execute is called, given gamedig.query resolves', () => {
        return getServerStatusUseCase.execute().then(result => {
            console.log(result);
            expect(result).toBeInstanceOf(getServerStatusUseCase.DayzServerStatus);
        });
    });

    it('Should call gamedig.query with server host, port and type when execute is called', () => {
        getServerStatusUseCase.execute();
        expect(gamedig.query).toBeCalledWith({
            host: DAYZ_HOST,
            port: DAYZ_QUERY_PORT,
            type: DAYZ_GAME_TYPE
        });
    })
});