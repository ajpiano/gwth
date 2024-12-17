import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { GwthSDK } from '../lib/gwth-sdk';
import { getSupabaseClient } from '../lib/supabase-client';

export const data = new SlashCommandBuilder()
    .setName('submit')
    .setDescription('Submit a grow update')
    .addAttachmentOption(option =>
        option
            .setName('photo')
            .setDescription('Photo of your plant')
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
    const supabase = getSupabaseClient();
    const sdk = new GwthSDK(supabase);

    const photo = interaction.options.getAttachment('photo');

    if (!photo) {
        await interaction.reply('Please provide a photo with your submission.');
        return;
    }

    // Authenticate user
    const user = await sdk.authenticateDiscordUser(interaction.user.id);

    if (!user) {
        // If user is not found, register them
        const newUser = await sdk.registerDiscordUser(interaction.user.id, interaction.user.username);
        if (!newUser) {
            await interaction.reply('There was an error registering your account. Please try again later.');
            return;
        }
    }

    const responseMessage = `Thank you for your submission, ${interaction.user.username}!
Your photo has been received: ${photo.url}`;

    await interaction.reply({
        content: responseMessage,
        files: [new AttachmentBuilder(photo.url)]
    });
}