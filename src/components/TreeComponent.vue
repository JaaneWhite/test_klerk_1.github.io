<template>
  <div class="tree-block">

    <div class="allow-empty-row">
      <input type="checkbox" id="allowEmpty" name="allowEmpty" v-model="tree.state.allowEmpty" @change="tree.dispatch('getTree')" />
      <label for="allowEmpty" class="allow-empty-label">Отображать пустые рубрики</label>
    </div>
    <div class="count-row">Сумма count всех отмеченных элементов: {{tree.getters.sumCheckedCounts}}</div>
    <div class="tree-row">
      <tree-branch  v-for="branch in tree.state.rubricsTree" :key="branch.id" :branch="branch" :level=1 />
    </div>


  </div>
</template>

<script setup>
import TreeBranch from "@/components/TreeBranch.vue";
import {store} from "@/stores/store.js";

store.dispatch('getTree')

const tree = store

</script>

<style scoped>
.tree-block {
  margin-top: 30px;
}
.allow-empty-row {
  width: 100%;
  margin-bottom: 15px;
}
.count-row {
  margin-bottom: 15px;
}
.allow-empty-label {
  margin-left: 5px;
}
.tree-row {
  width: 100%;
}
</style>