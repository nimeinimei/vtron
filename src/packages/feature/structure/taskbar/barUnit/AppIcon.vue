<template>
  <div class="appicon" @contextmenu.prevent="handleRightClick" @click="handleClick">
    <div class="appicon-img">
      <FileIcon :icon="windowNode.windowInfo.icon" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UnwrapNestedRefs } from 'vue';
import { emitEvent } from '@feature/event';
import { BrowserWindow } from '@feature/window/BrowserWindow';
import FileIcon from '@feature/builtin/FileIcon.vue';
import { i18n } from '@feature/i18n';

const props = defineProps<{
  windowNode: UnwrapNestedRefs<BrowserWindow>;
}>();
function handleRightClick(e: MouseEvent) {
  emitEvent('contextMenu.show', {
    x: 0,
    y: 0,
    mouse: e,
    menuList: [
      {
        name: i18n('close'),
        click: () => {
          props.windowNode.close();
        },
      },
      {
        name: i18n('maximize'),
        click: () => {
          props.windowNode.maximize();
        },
      },
      {
        name: i18n('minimize'),
        click: () => {
          props.windowNode.minimize();
        },
      },
    ],
  });
}
function handleClick() {
  props.windowNode.moveTop();
  if (props.windowNode.windowInfo.state === 'minimize') {
    props.windowNode.restore();
  } else {
    props.windowNode.minimize();
  }
}
</script>
<style lang="scss" scoped>
.appicon {
  width: var(--task-bar-height);
  height: var(--task-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;

  .appicon-img {
    user-select: none;
    width: 60%;
    height: 60%;
  }
}

.appicon:hover {
  background-color: var(--color-gray-hover);
}
</style>
