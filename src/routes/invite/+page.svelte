<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Discord Bot Invite Link</title>
</svelte:head>

<div class="container">
  <h1>Invite the Bot to Your Server</h1>
  <a href={data.inviteLink} class="invite-link" target="_blank">Click here to invite the bot</a>
</div>

<style>
  :global(body) {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .container {
    text-align: center;
  }
  .invite-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #7289DA;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
</style>