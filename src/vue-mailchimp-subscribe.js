import jsonp from 'jsonp'
import queryString from 'query-string'

export default {
  props: {
    url: {
      required: true,
      type: String,
    },

    userId: {
      required: true,
      type: String,
    },

    listId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      fields: {},
      success: false,
      error: null,
      loading: false,
    }
  },
  computed: {
    data() {
      return queryString.stringify({
        u: this.userId,
        id: this.listId,
        ...this.fields,
      })
    },
  },
  methods: {
    // deprecated in favour of `setField('EMAIL', value)`
    setEmail(value = '') {
      this.fields['EMAIL'] = value.trim()
    },

    setField(fieldKey, fieldValue) {
      this.fields[fieldKey] = fieldValue
    },

    subscribe() {
      if (!this.fields['EMAIL'] || this.loading) {
        return
      }

      this.success = false
      this.error = null
      this.loading = true

      const url = `${this.url}?${this.data}`

      jsonp(url, { param: 'c' }, this.onResponse)
    },

    onResponse(error, data) {
      this.loading = false

      if (error) {
        this.error = error
      }

      if (data && data.result === 'error') {
        this.error = this.formatErrorMessage(data.msg)
      }

      if (this.error) {
        this.$emit('error', this.error)
      } else {
        this.success = true
        this.fields = {}
        this.$emit('success')
      }
    },

    formatErrorMessage(message) {
      return message.replace('0 - ', '')
    },
  },
  render() {
    return this.$scopedSlots.default({
      subscribe: this.subscribe,
      setEmail: this.setEmail,
      setField: this.setField,
      error: this.error,
      success: this.success,
      loading: this.loading,
    })
  },
}
