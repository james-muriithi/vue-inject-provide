<template>
  <div class="col-md-6 my-1">
    <li class="w-100">
      <h3>{{ topicName }}</h3>
      <p>{{ description }}</p>
      <button @click="selectTopic(id)">Learn More</button>
    </li>
  </div>
</template>

<script>
export default {
  inject: ['selectTopic'],
  props: ['id', 'topicName', 'description'],
};
</script>