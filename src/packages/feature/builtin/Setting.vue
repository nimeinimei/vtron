<template>
  <div class="outer">
    <div class="uper_tab">
      <div class="tab">
        {{ i18n('windows.setting') }}
      </div>
    </div>
    <div class="outer_main">
      <div class="main_uper">
        <div
          class="set_item"
          v-for="item in setList"
          :key="item.title"
          @click="openSet(item.content, item.title)"
        >
          <div class="set_item-img">
            <img class="set_item-img-img" :src="item.icon" />
          </div>
          <div class="set_item-right">
            <div class="set_item-title">{{ item.title }}</div>
            <div class="set_item-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, defineComponent } from 'vue';
import SetUpdate from '@feature/builtin/SetWindow/SetUpdate.vue';
import SetCustom from '@feature/builtin/SetWindow/SetCustom.vue';
import SetSystem from '@feature/builtin/SetWindow/SetSystem.vue';
import e7f8 from '../../../assets/icon/e7f8.png'; //系统设置
// import e774 from '../../../assets/icon/e774.png'; //网络
import e771 from '../../../assets/icon/e771.png'; //个性化
import e895 from '../../../assets/icon/e895.png'; //更新
import { BrowserWindow } from '@feature/window/BrowserWindow';
import { i18n } from '@feature/i18n';
import { useSystem } from '@feature/system';

const browserWindow = inject<BrowserWindow>('browserWindow');
const sys = useSystem();
const setMap: {
  [key: string]: BrowserWindow;
} = {};
// let windowInfo = system.getWindow(id)?.windowInfo
function openSet(content: ReturnType<typeof defineComponent>, title: string) {
  if (browserWindow) {
    if (setMap[title]) {
      setMap[title].show();
      setMap[title].setPosition(browserWindow.windowInfo.x, browserWindow.windowInfo.y);
      setMap[title].setSize(browserWindow.windowInfo.width, browserWindow.windowInfo.height);
    } else {
      setMap[title] = new BrowserWindow({
        content: content,
        title: i18n('system'),
        x: browserWindow.windowInfo.x,
        y: browserWindow.windowInfo.y,
        height: browserWindow.windowInfo.height,
        width: browserWindow.windowInfo.width,
      });
      setMap[title].show();
    }
  }
}
const setList = [
  {
    title: i18n('system'),
    // desc: '显示，声音，通知，电源',
    desc: i18n('language'),
    icon: e7f8,
    content: SetSystem,
  },
  // {
  //     title: '网络和Internet',
  //     desc: 'WLAN，飞行模式，VPN',
  //     icon: e774
  // },
  {
    title: i18n('personalization'),
    desc: i18n('background.lockscreen.color'),
    icon: e771,
    content: SetCustom,
  },
  //  {
  //     title: '软件商店',
  //     desc: '获取网络上的应用',
  //     icon: e771,
  //     content:appstore
  // },
  {
    // title: '更新和安全',
    title: i18n('update.security'),
    // desc: 'Windows 更新，恢复，备份',
    desc: i18n('windows.update.recover.backup'),
    icon: e895,
    content: SetUpdate,
  },
  ...(sys._rootState.system.settings ? sys._rootState.system.settings : []),
];
</script>

<style lang="scss" scoped>
@import '@packages/main.css';

.outer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  /* background-color: #f0f0f0; */
  user-select: none;
  /* background-color: rgb(241, 241, 241); */
}

.outer_main {
  height: 100%;
  /* width: 100%; */
  background-color: white;
  /* border: 1px solid #d9d9d9; */
  margin: 0px 10px 00px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_uper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  height: 50px;
  width: 90%;

  /* border-bottom: 1px solid #999999; */
}

.set_item {
  margin: 10px 20px;
  padding: 2px 8px 10px 2px;
  width: 200px;
  display: flex;
  align-items: center;
  border: 1px solid #99999900;
  transition: all 0.1s;

  .set_item-img {
    width: 30px;
    margin: 10px 16px;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  .set_item-right {
    flex: 1;
  }

  .set_item-title {
    padding: 4px 0px;
  }

  .set_item-desc {
    font-size: 10px;
    color: #999999;
  }
}

.set_item:hover {
  border: 1px solid #9999998a;
}

.uper_tab {
  /* width: 90%; */
  margin: 10px 10px -1px 10px;
  font-size: 12px;

  z-index: 1;
  display: flex;
}

.tab {
  text-align: center;
  width: 100%;
  height: 40px;
  background-color: #fff;
  font-size: 20px;
  font-weight: 200;
  /* border: 1px solid #d9d9d9; */
  border-bottom: none;
}

.tab_unactive {
  text-align: center;
  width: 40px;
  background-color: rgb(241, 241, 241);

  border: 1px solid #d9d9d9;
  /* border-bottom:none; */
}

.bottom {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-shrink: 0;
  width: 90%;
  margin: 6px auto;
  // background-color: #f0f0f0;
}

.bottom_button {
  width: 80px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 13px;
  background-color: #e1e1e1;
  border: 1px solid #999999;
  transition: all 0.2s;
  box-sizing: border-box;
  margin: 0 0 0 10px;
}

.bottom_button:first-child {
  border: 1px solid #0078d7;
  box-shadow: 0 0 0px 1px #0078d7 inset;
}

.bottom_button:hover {
  border: 1px solid #0078d7;
  background-color: #e5f1fb;
  box-shadow: 0 0 0 0px #0078d7 inset;
}
</style>
