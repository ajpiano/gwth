import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import * as submitCommand from './lib/commands/submit';
import * as pingCommand from './lib/commands/ping';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

if (!DISCORD_TOKEN) {
    console.error('Missing DISCORD_TOKEN in environment variables');
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

client.commands = new Collection();
client.commands.set(submitCommand.data.name, submitCommand);
client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

console.log('Attempting to log in with token:', DISCORD_TOKEN.slice(0, 10) + '...');
client.login(DISCORD_TOKEN).catch(error => {
    console.error('Failed to log in:', error);
});