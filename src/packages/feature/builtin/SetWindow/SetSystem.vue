<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(index)"
          :class="{ active: index === activeIndex }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="setting">
      <div v-if="0 === activeIndex">
        <div class="setting-item">
          <h1 class="setting-title">{{ i18n('language') }}</h1>
        </div>
        <div class="setting-item">
          <label> {{ i18n('language') }} </label>
          <WinSelect
            v-model="modelvalue"
            :options="[
              {
                label: 'zh-CN',
                value: 0,
              },
              {
                label: 'en-US',
                value: 1,
              },
            ]"
            :placeholder="i18n('please.select')"
          >
          </WinSelect>
        </div>

        <div class="setting-item">
          <label></label>
          <WinButton @click="submit">{{ i18n('confirm') }} </WinButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WinButton from '@packages/components/WinButton.vue';
import WinSelect from '@packages/components/WinSelect.vue';

import { ref } from 'vue';
import { useSystem } from '@feature/system';
import { Dialog } from '@feature/dialog/Dialog';
import { useRootState } from '../../state/Root';
import { i18n } from '@feature/i18n';

const rootstate = useRootState();
const system = useSystem();

const items = [i18n('language')];

const activeIndex = ref(0);

const modelvalue = ref(rootstate.system.options.lang === 'zh-CN' ? 0 : 1);

const selectItem = (index: number) => {
  activeIndex.value = index;
};

async function submit() {
  const config = await system?.fs.readFile(`${system._options.systemLocation}Vtron/config.json`);
  const configObj = JSON.parse(config || '{}');
  configObj.lang = modelvalue.value === 0 ? 'zh-CN' : 'en-US';
  await system?.fs.writeFile(`${system._options.systemLocation}Vtron/config.json`, {
    content: JSON.stringify(configObj),
  });
  Dialog.showMessageBox({
    message: i18n('save.success'),
    title: i18n('language'),
    type: 'info',
  }).then(() => {
    system?.reboot();
  });
}
</script>
<style scoped>
@import './setStyle.css';
</style>
