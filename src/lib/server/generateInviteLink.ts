import { DISCORD_CLIENT_ID } from '$env/static/private';

export function generateInviteLink() {
  const clientId = DISCORD_CLIENT_ID;
  console.log('Using Client ID:', clientId); // Add this line

  const permissions = '326417591296';
  const scopes = 'bot%20applications.commands';

  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=${scopes}`;
}