<template>
  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Add New Topic</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="submit" id="newTopic">
            <div class="form-group">
              <label for="">Title</label>
              <input type="text" v-model="title" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">Description</label>
              <input type="text" v-model="description" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">Full Text</label>
              <textarea class="form-control" v-model="fullText"></textarea>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Close
          </button>
          <button type="submit" form="newTopic" class="btn btn-success">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  emits: ['add-topic'],
  data() {
    return {
      title: '',
      description: '',
      fullText: '',
    };
  },
  methods: {
    validate() {
      if (this.title && this.description && this.fullText) {
        return true;
      }
      return false;
    },
    submit() {
      if (this.validate()) {
        this.saveToFirebase();
        this.$emit('add-topic', this.title, this.description, this.fullText);
        this.title = '';
        this.description = '';
        this.fullText = '';
        $('#myModal').modal('hide')
      } else {
        alert('please fill all fields');
      }
    },
    saveToFirebase(){
      return fetch('https://vue-inject-provide-69-default-rtdb.firebaseio.com/topics.json', {
        method: 'post',
        headers: {
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
          title: this.title, 
          description: this.description, 
          fullText: this.fullText
        })
      }).then(response => {
        if(!response.ok){
            throw new Error('Topic could not be saved.')
        }
      }).catch(err => {
        alert(err.message)
      })
    }
  },
};
</script>