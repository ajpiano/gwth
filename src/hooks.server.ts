import { startBot } from '$lib/server/bot';

export async function handle({ event, resolve }) {
    startBot();
    return resolve(event);
}