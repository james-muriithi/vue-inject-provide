import { createApp } from 'vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue';
import ActiveElement from './components/ActiveElement.vue';
import KnowledgeBase from './components/KnowledgeBase.vue';
import KnowledgeElement from './components/KnowledgeElement.vue';
import KnowledgeGrid from './components/KnowledgeGrid.vue';
import NewTopicModal from './components/NewTopicModal.vue';

const app = createApp(App);

app.component('active-element', ActiveElement);
app.component('knowledge-base', KnowledgeBase);
app.component('knowledge-element', KnowledgeElement);
app.component('knowledge-grid', KnowledgeGrid);
app.component('new-topic-modal', NewTopicModal);

app.mount('#app');
