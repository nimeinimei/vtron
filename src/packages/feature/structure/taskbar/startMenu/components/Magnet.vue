<template>
  <div class="magnet-group scroll-bar">
    <div
      @click.stop="handle(item)"
      class="magnet-item"
      :style="{
        animationDelay: `${Math.floor(index / 4) * 0.02}s`,
        animationDuration: `${Math.floor(index / 4) * 0.04 + 0.1}s`,
      }"
      v-for="(item, index) in appList"
      :key="basename(item.path)"
    >
      <FileIcon class="magnet-item_img" :file="item" />
      <span class="magnet-item_title">{{ basename(item.path) }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppOpen } from '@packages/hook/useAppOpen';
import { emitEvent } from '@feature/event';
import { basename } from '@feature/core/Path';
import FileIcon from '@feature/builtin/FileIcon.vue';
import { VtronFile } from '@feature/core/fileSystem';

const { openapp, appList } = useAppOpen('magnet');
function handle(item: VtronFile) {
  emitEvent('magnet.item.click', item);
  openapp(item);
}
</script>
<style lang="scss" scoped>
@import '@packages/assets/main.scss';

.magnet-group {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  height: 100%;
  width: var(--magnet-width);
  user-select: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;
  padding-left: 10px;
  gap: 4px;

  .magnet-item {
    width: var(--magnet-item-size);
    height: var(--magnet-item-size);
    font-size: var(--ui-font-size);
    background-color: var(--color-magnet-item);
    border: 1px solid;
    border-color: var(--color-gray-hover);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    will-change: transform;
    transition: all 0.2s;
    animation: transin both;
    .magnet-item_img {
      width: 40%;
      height: 40%;
      margin: 4px auto;
    }

    .magnet-item_title {
      display: block;
      text-align: center;
    }
  }
  @keyframes transin {
    from {
      transform: translateY(40px);
    }
    to {
      transform: translateY(0px);
    }
  }
  .magnet-item:hover {
    background-color: var(--color-gray-hover);
    border-color: var(--color-gray-active);
  }
}
</style>
