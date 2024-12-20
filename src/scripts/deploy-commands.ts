import { config } from 'dotenv';
import { REST, Routes } from 'discord.js';
import * as submitCommand from '@commands/submit';
import * as pingCommand from '@commands/ping';
import * as midsCommand from '@commands/mids';

config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    console.error('Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment variables');
    process.exit(1);
}

const commands = [
    submitCommand.data.toJSON(),
    pingCommand.data.toJSON(),
    midsCommand.data.toJSON()
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            { body: commands },
        );

        console.log(commands);

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing commands:', error);
    }
})();