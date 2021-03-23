<template>
  <div>
    <active-element
      :topic-title="activeTopic && activeTopic.title"
      :text="activeTopic && activeTopic.fullText"
    ></active-element>
    <active-element v-if="isLoading" topic-title="Loading..."></active-element>
    <knowledge-base
      v-else
      :topics="topics"
      @select-topic="activateTopic"
    ></knowledge-base>
  </div>
  <new-topic-modal @add-topic="addTopic"></new-topic-modal>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      activeTopic: null,
      isLoading: false,
    };
  },
  provide() {
    return {
      topics: this.topics,
      selectTopic: this.activateTopic,
    };
  },
  methods: {
    activateTopic(topicId) {
      this.activeTopic = this.topics.find((topic) => topic.id === topicId);
    },
    addTopic(title, description, fullText) {
      const newTopic = {
        id: new Date().toISOString(),
        title,
        description,
        fullText,
      };
      this.topics.unshift(newTopic)
    },
    fetchTopics() {
      this.isLoading = true;
      fetch(
        'https://vue-inject-provide-69-default-rtdb.firebaseio.com/topics.json'
      )
        .then((response) => response.json())
        .then((data) => {
          this.isLoading = false;
          let myTopics = []
          for (const id in data) {
            myTopics.push({
              id,
              title: data[id].title,
              description: data[id].description,
              fullText: data[id].fullText,
            });
          }

          this.topics.splice(0, this.topics.length,...myTopics);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.fetchTopics();
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
section {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

li {
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 1rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  margin: 0.75rem 0;
  text-align: center;
}

button:not(.close) {
  font: inherit;
  border: 1px solid #c70053;
  background-color: #c70053;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  cursor: pointer;
}

button:hover:not(.close),
button:focus:not(.close),
button:active:not(.close) {
  background-color: #e24d8b;
  border-color: #e24d8b;
  outline: none;
}
</style>