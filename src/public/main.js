Vue.component("convert", {
  data() {
    return {
      message: "",
      timeStamp: "",
      error: ""
    };
  },
  methods: {
    getTimestamp: function() {
      fetch(`/time-stamp?message=${this.message}`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(({ timeFormated }) => {
          this.timeStamp = timeFormated;
          this.error = "";
        })
        .catch(e => {
          this.error = e;
          this.timeStamp = "";
        });
    }
  },
  template: `
  <div id="main">
    <h1>Enter Message ID</h1>
    <p>Find out when a Discord message has been sent from it's message ID.</p>
    <br />
    <div>
      <input type="text" id="input" v-model="message" placeholder="Message ID"></input>
      <button @click="getTimestamp">Submit</button>
    </div>
    <br />
    <div v-if="timeStamp">
      <p>Message sent on: {{ timeStamp }}.</p>
    </div>
    <div v-if="error">
      <p>Not a valid request.</p>
      <p>{{ error }}</p>
    </div>
  </div>
  `
});

let vm = new Vue({
  el: "#app",
  template: `<convert />`
});
