import type { PageServerLoad } from './$types';
import { generateInviteLink } from '$lib/server/generateInviteLink';

export const load: PageServerLoad = async () => {
  const inviteLink = generateInviteLink();
  return { inviteLink };
};