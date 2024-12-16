<script lang="ts">
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
    import { createClient } from '@supabase/supabase-js';

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

    let submissions: any[] = [];

    async function loadSubmissions() {
        const { data, error } = await supabase
            .from('submissions')
            .select('*');
        if (error) console.error('Error loading submissions:', error);
        else submissions = data;
    }

    loadSubmissions();
</script>

<h1>Grow-Off Submissions</h1>

{#each submissions as submission}
    <div>
        <img src={submission.photo_url} alt="Plant submission" />
        <p>Submitted by: {submission.user_name}</p>
    </div>
{/each}