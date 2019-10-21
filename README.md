# vue-mailchimp-subscribe
Renderless Vue.js component for Mailchimp list subscriptions.

## Props

To use this component you have to pass `login`, `dataCenter`, `userId` and `listId`. This structure of a regular API call may help you to identify these values:

```
https://{login}.{dataCenter}.list-manage.com/subscribe/post?u={userId}&id={listId}
```

## Usage

```vue
<template>
  <mailchimp-subscribe login="XXX" data-center="XXX" user-id="XXX" list-id="XXX" @error="onError" @success="onSuccess">
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
