import { ServerInfo } from '../server-info.types';
import { IServerModel } from './server-info.model.interface';

const desc = `
> The Perception is a friendly community which was founded in March 2021. This Server is a First Person Perspective (1PP) PVP server with no limits. We recommended you to join our [Discord](https://bit.ly/3xGNsDf \"Discord\") to not miss out on any of the updates/announcements.
\n\n\n
#### Server Features: \n\n- Keys and Keycards to open doors with Military, Medical, Police and Building loot\n- 17+ custom locations and map edits\n- Safezone Traders: Green Mountain, Klen and Altar Black Market\n- PVP Traders: Devils Castle High Tier and PVP, Bashnaya Barter, NWA Aricraft\n- Toxic area Prison Island with juicy loot.\n- Custom Bunker with Tier5 (best items you can get).\n- Locked rooms.\n- Base Building Plus (Gate and door raid only). Possibility to softside bases.\n- Medcial items to fast regenerate your HP (AI2, IFAK, Grizzly)\n- In-Game map + Group party with markers\n- In-Game Leaderboard, Stats\n- Discord Leaderboard, Stats and Trader Prices\n- AutoRun\n- Unlimited Stamina\n- Reduced maetabolism\n- No temperature, wetness and leg breaking\n- No sickness (sickness only from toxic area)\n- No stun lock\n- SpawnSelection\n- KillFeed\n- Airdrops\n- King of the Hill\n- Animated Heli Crashes\n- Items with real size (smaller then vanilla)\n- 200+ Guns\n- Loot x5\n- Cars & Helicopters with keys\n- EarPlugs\n- Weather system, mostly sunny without wind!\n- 22 min of Night Time\n- Lighter Nights. \n- 3 h of Day Time\n- And a lot of more content\n\n#### Klen Trader\n\n![Klen Trader](https://i.imgur.com/kJXFpYM.jpg \"Klen Trader\")\n\n#### Green Mountain Trader\n\n![Green Mountain Trader](https://i.imgur.com/78OcPuJ.jpg \"Green Mountain Trader\")\n\n#### Altar Black Market Trader\n\n![Altar Black Market Trader](https://i.imgur.com/ZnJqOs3.jpg \"Altar Black Market Trader\")\n\n#### High Tier Trader\n\n![High Tier Trader](https://i.imgur.com/uptBFIt.jpg \"High Tier Trader\")\n\n#### Barter Trader\n\n![Barter Trader](https://i.imgur.com/VD9YoXD.jpg \"Barter Trader\")\n\n#### Aircraft Trader\n\n![Aircraft Trader](https://i.imgur.com/QeG06Ft.jpg \"Aircraft Trader\")\n\n#### Custom Military Zones\n\n![Bunker](https://i.imgur.com/iToI0ut.jpg \"Bunker\")\n\n![Krasnostav Airstrip](https://i.imgur.com/whe4gPs.jpg \"Krasnostav Airstrip\")\n\n![Oilrig](https://i.imgur.com/ae9AHKN.jpg \"Oilrig\")\n\n#### Animated Heli Crashes\n\n![Animated Heli Crashes](https://i.imgur.com/soEq1aK.jpeg \"Animated Heli Crashes\")\n\n#### Keycard system\n\n![Keycard system](https://i.imgur.com/KQvsTXC.jpeg \"Keycard system\")\n\n#### Navigation UI\n\n![Navigation UI](https://i.imgur.com/V9Ej9HM.png \"Navigation UI\")\n\n#### Ping System\n\n![Ping System](https://i.imgur.com/xnfaqsV.jpeg \"Ping System\")
`;

export class InMemoryModel implements IServerModel {
  private servers: ServerInfo[] = [
    { ip: '131.196.197.35', port: 22003, description: desc, externalLinks: { 'discord': 'https://discord.com', 'website': 'https://meusite.com' }, logo: 'https://stoneagemta.com/_next/image?url=%2Flogo_rust.png&w=640&q=75', owner: '' },
    { ip: '192.168.0.1', port: 22023, description: 'Lorem ipsum', externalLinks: { 'discord': 'asd' }, logo: 'https://stoneagemta.com/_next/image?url=%2Flogo_dayz.png&w=640&q=75', owner: '' },
  ];

  async create(server: ServerInfo): Promise<ServerInfo> {
    this.servers.push(server);
    return server;
  }

  async getAllServers(): Promise<ServerInfo[]> {
    return this.servers;
  }

  async getOne(ip: string, port: number): Promise<ServerInfo | null> {
    const server = this.servers.find((server) => server.ip === ip && server.port === port) || null;
    return server;
  }

  async update(ip: string, port: number, newServerInfo: Partial<ServerInfo>): Promise<ServerInfo> {
    let found;

    this.servers = this.servers.map((server) => {
      if (server.ip === ip && server.port === port) {
        const result = { ...server, ...newServerInfo };
        found = result;
        return result;
      }
      return server;
    });

    if (!found) {
      throw new Error('Server not found!');
    }

    return found;
  }

  async delete(ip: string, port: number): Promise<void> {
    this.servers = this.servers.filter((server) => {
      return !(server.ip === ip && server.port === port);
    });
  }
}
