<template>

  <f7-list
    id="sortable"
    media-list
    sortable
    @sortable:sort="onSort"
    @sortable:open="onOpen"
    @sortable:close="onClose"
  >  
    <f7-list-item
      media-item
      swipeout
      v-for="(item, index) in items"
      :key="index"
      :media="item.media"
      :title="item.title"
      :subtitle="item.subtitle"
      :text="item.text"
      :after="item.after"
      @swipeout:delete="onSwipeoutDelete"
      @swipeout:deleted="onSwipeoutDeleted"
    >
      <f7-swipeout-actions>
        <f7-swipeout-button delete>삭제</f7-swipeout-button>
      </f7-swipeout-actions>
    </f7-list-item>
    <slot name="label"></slot>
  </f7-list>
    
  </div>
</template>
  
<script>
import Vue from 'vue'

export default {
  data: _ => ({
  }),
  props: {
    items: Array,
  },
  methods: {
    onSwipeoutDelete() {

    },
    onSwipeoutDeleted() {
      
    },
    onOpen: function () {
      this.sorting = !this.sorting;
    },
    onClose: function () {
      this.sorting = !this.sorting;
    },
    onSort: function (event, indexes) {
        console.log('sort', indexes);
    },
  },
  components: {
    
  }
} 
</script>