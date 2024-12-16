import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

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
    const photo = interaction.options.getAttachment('photo');

    if (!photo) {
        await interaction.reply('Please provide a photo with your submission.');
        return;
    }

    const responseMessage = `Thank you for your submission, ${interaction.user.username}!
Your photo has been received: ${photo.url}`;

    await interaction.reply({
        content: responseMessage,
        files: [new AttachmentBuilder(photo.url)]
    });
}