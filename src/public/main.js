Vue.component("convert", {
  data() {
    return {
      message: "",
      timeStamp: ""
    };
  },
  methods: {
    getTimestamp: function() {
      fetch(`/timeStamp?message=${this.message}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then(({time}) => {
        this.timeStamp = time;
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
  </div>
  `
});

let vm = new Vue({
  el: "#app",
  template: `<convert />`
});
