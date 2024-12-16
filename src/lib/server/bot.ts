import { Client, Events, GatewayIntentBits, Collection, Partials } from 'discord.js';
import * as submitCommand from '@commands/submit';
import * as pingCommand from '@commands/ping';
import * as midsCommand from '@commands/mids';
import { DISCORD_TOKEN } from '$env/static/private';

if (!DISCORD_TOKEN) {
    console.error('Missing DISCORD_TOKEN in environment variables');
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();
client.commands.set(submitCommand.data.name, submitCommand);
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(midsCommand.data.name, midsCommand);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    console.log('Registered commands:', client.commands.map(cmd => cmd.data.name).join(', '));
});

client.on(Events.InteractionCreate, async interaction => {
    console.log('Interaction received:', interaction.type, interaction.commandName);
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.log(`Command not found: ${interaction.commandName}`);
        return;
    }

    try {
        console.log(`Executing command: ${interaction.commandName}`);
        await command.execute(interaction);
        console.log(`Command executed successfully: ${interaction.commandName}`);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        console.error('Error stack:', error.stack);
        try {
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        } catch (replyError) {
            console.error('Error sending error reply:', replyError);
        }
    }
});

export function startBot() {
    console.log('Attempting to log in with token:', DISCORD_TOKEN.slice(0, 10) + '...');
    client.login(DISCORD_TOKEN).catch(error => {
        console.error('Failed to log in:', error);
    });
}

export { client };