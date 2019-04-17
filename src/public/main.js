Vue.component("convert", {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    getTimestamp: function() {
      let a = {
        id: this.message
      };

      console.log(this.message);
      fetch("/stamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(a)
      })
      .then(res => console.log(res));
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
  </div>
  `
});

let vm = new Vue({
  el: "#app",
  template: `<convert />`
});