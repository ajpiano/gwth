import { DISCORD_CLIENT_ID } from '$env/static/private';

export function generateInviteLink() {
  const clientId = DISCORD_CLIENT_ID;
  console.log('Using Client ID:', clientId); // Add this line

  const permissions = '274877908992'; // Includes Read Messages, Send Messages, and Use Slash Commands
  const scopes = 'bot%20applications.commands';

  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=${scopes}`;
}