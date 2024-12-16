import { SlashCommandBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('mids')
    .setDescription('Tell someone they grow mids')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('The user who grows mids')
            .setRequired(true));

export async function execute(interaction: CommandInteraction) {
    console.log('Mids command triggered');

    try {
        const target = interaction.options.getUser('target');

        if (!target) {
            console.log('No target specified');
            await interaction.reply('You need to specify a user!');
            return;
        }

        const replyContent = `Hey ${target}, ${interaction.user} says you grow mids! 🌿😅`;
        console.log('Attempting to reply with:', replyContent);

        await interaction.reply({ content: replyContent });
        console.log('Reply sent successfully');

        console.log('Mids command executed successfully');
    } catch (error) {
        console.error('Error executing mids command:', error);
        try {
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        } catch (replyError) {
            console.error('Error sending error reply:', replyError);
        }
    }
}