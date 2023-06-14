<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/mainstore';

export default{
name: 'Modal',
methods:{
...mapActions(useMainStore,['toggleModal']),
clickClose()
{
    this.$router.go(-1);
    this.toggleModal();
}
},
props:['title'],
computed:
{

},
created()
{

},
}
</script>

<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>{{title}}</h3>
          </div>  

          <div class="modal-body">
        <RouterView></RouterView>
          </div>

        <div class="modal-footer">
            <button class="btn btn-sm btn-outline-light" @click="clickClose()">Close</button>
        </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50rem;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #2d2727;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}


.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>