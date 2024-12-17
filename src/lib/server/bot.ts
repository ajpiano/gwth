import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import * as submitCommand from '@commands/submit';
import * as pingCommand from '@commands/ping';
import * as midsCommand from '@commands/mids';
import { DISCORD_TOKEN } from '$env/static/private';

let client: Client;

export function startBot() {
    if (client) return; // Prevent multiple initializations

    client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.commands.set(submitCommand.data.name, submitCommand);
    client.commands.set(pingCommand.data.name, pingCommand);
    client.commands.set(midsCommand.data.name, midsCommand);

    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    client.login(DISCORD_TOKEN);
}

export function stopBot() {
    if (client) {
        client.destroy();
        client = undefined;
    }
}