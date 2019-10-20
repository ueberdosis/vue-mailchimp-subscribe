# vue-mailchimp-subscribe
renderless vue.js  component for mailchimp list subscriptions

## Usage

```vue
<template>
  <mailchimp-subscribe login="XXX" data-center="XXX" user-id="XXX" list-id="XXX">
    <template v-slot="{ subscribe, setEmail, error, success, loading }">
      <form @submit.prevent="subscribe">
        <input type="email" @input="setEmail($event.target.value)" />
        <button type="submit">Submit</button>
        <div v-if="error">{{ error }}</div>
        <div v-if="success">Yay!</div>
        <div v-if="loading">Loading…</div>
      </form>
    </template>
  </mailchimp-subscribe>
</template>

<script>
import MailchimpSubscribe from 'vue-mailchimp-subscribe'

export default {
  components: {
    MailchimpSubscribe,
  },
}
</script>
```