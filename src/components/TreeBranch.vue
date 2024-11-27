<template>
<div class="tree-branch" :class="`level-${level}`">
  <div class="tree-branch-title">
    <div class="collapse-btn-block">
      <button
          v-if="branch.canCollapse"
          class="collapse-btn"
          :class="{collapsed: branch.collapsed}"
          @click="branch.collapsed = !branch.collapsed"
      >
        <span v-if="branch.collapsed">+</span>
        <span v-else>-</span>
      </button>
    </div>

    <input
        type="checkbox"
        v-model="branch.checked"
        :id="`checkbox-${branch.id}`"

    />
    <div class="branch-title-text">
      <a
          :href="`https://www.klerk.ru${branch.url}`"
          target="_blank"
      >{{branch.title}} ({{branch.count}} / {{branch.totalCount}})</a>

    </div>

  </div>
  <template v-if="branch.children && branch.children.length > 0">
    <div class="branch-children-collapse" v-show="!branch.collapsed">
      <tree-branch v-for="child in branch.children" :key="child.id" :branch="child" :level="level + 1"/>
    </div>

  </template>

</div>
</template>

<script setup>
defineProps({
  branch: {
    type: Object
  },
  level: {
    type: Number
  }
})

let checkboxes = new Set([])

function checkboxChange(event, checkBoxId) {
  console.log(event)
}


//        @change="checkboxChange($event, `checkbox-${branch.id}`)"
</script>

<style scoped>
  .tree-branch {
    margin-left: 30px;
    width: 100%;
  }
  .tree-branch-title {
    display: flex;
    flex-direction: row;
  }
  .branch-title-text {
    margin-left: 10px;
  }
  .branch-children-collapse {
    padding: 5px 15px;
  }
  .collapse-btn-block {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .collapse-btn {

    border: none;
    background-color: transparent;
    font-size: 20px;
    color: white;
    cursor: pointer;
  }
</style>