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
          <h1 class="setting-title">{{ i18n('background') }}</h1>
        </div>
        <div class="setting-item">
          <label> {{ i18n('set.background') }} </label>
          <WinSelect
            v-model="imgtype"
            :options="[
              {
                label: i18n('from.network'),
                value: 0,
              },
              {
                label: i18n('from.string'),
                value: 1,
              },
            ]"
            :placeholder="i18n('please.select')"
          >
          </WinSelect>
        </div>
        <div class="setting-item">
          <label></label>
          <WinInput placeholder="" v-model="imgurl"></WinInput>
        </div>

        <div class="setting-item">
          <label></label>
          <WinButton @click="submit">{{ i18n('confirm') }} </WinButton>
        </div>
      </div>
      <div v-if="1 === activeIndex">
        <div class="setting-item">
          <h1 class="setting-title">
            {{ i18n('style') }}
          </h1>
        </div>

        <div class="setting-item">
          <label></label>
          <textarea placeholder="" v-model="rootstyle"></textarea>
        </div>

        <div class="setting-item">
          <label></label>
          <WinButton @click="submitStyle">{{ i18n('confirm') }} </WinButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WinButton from '@packages/components/WinButton.vue';
import WinSelect from '@packages/components/WinSelect.vue';
import WinInput from '@packages/components/WinInput.vue';

import { ref } from 'vue';
import { useSystem } from '@feature/system';
import { Dialog } from '@feature/dialog/Dialog';
import { useRootState } from '../../state/Root';
import { i18n } from '@feature/i18n';

const rootstate = useRootState();
const system = useSystem();
const items = [
  i18n('background'),
  i18n('style'),
  // '版本',
];

const activeIndex = ref(0);

const imgtype = ref(0);
const imgurl = ref('');
const rootstyle = ref(JSON.stringify(rootstate.system.options.rootStyle));
const selectItem = (index: number) => {
  activeIndex.value = index;
};
async function submitStyle() {
  const config = await system?.fs.readFile(`${system._options.systemLocation}Vtron/config.json`);
  const configObj = JSON.parse(config || '{}');
  configObj.rootStyle = JSON.parse(rootstyle.value);
  await system?.fs.writeFile(`${system._options.systemLocation}Vtron/config.json`, {
    content: JSON.stringify(configObj),
  });

  Dialog.showMessageBox({
    message: i18n('save.success'),
    title: i18n('style'),
    type: 'info',
  });
}
async function submit() {
  rootstate.system.options.background = imgurl.value;
  await system?.fs.writeFile(`${system._options.systemLocation}Vtron/background.txt`, {
    content: imgurl.value,
  });
  Dialog.showMessageBox({
    message: i18n('save.success'),
    title: i18n('wallpaper'),
    type: 'info',
  });
}
</script>

<style scoped>
@import './setStyle.css';
</style>
