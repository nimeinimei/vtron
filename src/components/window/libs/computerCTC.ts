/*
 * @Author: zhangweiyuan-Royal
 * @LastEditTime: 2021-08-25 15:04:07
 * @Description: 
 * @FilePath: /myindex/src/components/window/libs/computerCTC.ts
 */
import { reactive } from "vue";
import { appList,appconfig,appInfo,plug_option } from "../../appconfig";

interface statsCtrl{
    screen:"common"|"blue"|"close",
}

class computerCTC {
    private static instance: computerCTC;
    stats: statsCtrl;
    private constructor() {
        this.stats = reactive({
            screen:"close",
        });
    }
    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new computerCTC()
        }
        return this.instance
    }
    closePower(){
        this.stats.screen='blue'
        setTimeout(()=>{
            this.stats.screen='close'
        },1000)
    }
    openPower(){
        if(appconfig.start_time==0){
            this.stats.screen='common'
        }else{
            this.stats.screen='close'
        }

        setTimeout(()=>{
            this.stats.screen='blue'
        },appconfig.start_time/2)
        setTimeout(()=>{
            this.stats.screen='common'
        },appconfig.start_time)
    }
    restartPower(){
        // this.stats.screen='blue'
        setTimeout(()=>{
            this.stats.screen='blue'
        },2000)

        setTimeout(()=>{
            this.stats.screen='close'
        },5000)

        setTimeout(()=>{
            window.location.reload()
        },6000)
    }
}
export {
    computerCTC
}