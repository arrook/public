<template>
  <div class="device-control-panel">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="继电器控制">
          <a-form layout="vertical">
            <a-form-item label="继电器状态">
              <a-switch
                v-model:checked="relayStatus"
                checked-children="开启"
                un-checked-children="关闭"
                @change="handleRelayControl"
              />
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      
      <a-col :span="12">
        <a-card title="RGB LED控制">
          <a-form layout="vertical">
            <a-form-item label="红色">
              <a-slider v-model:value="rgbColor.red" :min="0" :max="255" />
            </a-form-item>
            <a-form-item label="绿色">
              <a-slider v-model:value="rgbColor.green" :min="0" :max="255" />
            </a-form-item>
            <a-form-item label="蓝色">
              <a-slider v-model:value="rgbColor.blue" :min="0" :max="255" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleRgbControl">应用颜色</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="24">
        <a-card title="语音控制">
          <a-form layout="vertical">
            <a-form-item label="语音内容">
              <a-textarea
                v-model:value="voiceText"
                placeholder="请输入要播放的语音内容"
                :rows="3"
              />
            </a-form-item>
            <a-form-item label="背景音乐">
              <a-select v-model:value="voiceMusic" style="width: 200px">
                <a-select-option value="1">音乐1</a-select-option>
                <a-select-option value="2">音乐2</a-select-option>
                <a-select-option value="3">音乐3</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleVoiceControl">播放语音</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import type { DeviceInfo } from '@/types/device'
import { useControlStore } from '@/stores/control'

const controlStore = useControlStore()

interface Props {
  device: DeviceInfo
}

const props = defineProps<Props>()

const relayStatus = ref(false)
const rgbColor = ref({
  red: 255,
  green: 255,
  blue: 255
})
const voiceText = ref('')
const voiceMusic = ref('1')

const handleRelayControl = async (checked: boolean) => {
  try {
    // 调用控制API
    await controlStore.sendCommand(props.device.device_name, {
      device_name: props.device.device_name,
      command: {
        relay: { status: checked }
      }
    })
    message.success(`继电器已${checked ? '开启' : '关闭'}`)
  } catch (error) {
    message.error('控制失败')
    relayStatus.value = !checked // 回滚状态
  }
}

const handleRgbControl = async () => {
  try {
    // 调用控制API
    await controlStore.sendCommand(props.device.device_name, {
      device_name: props.device.device_name,
      command: {
        rgb_led: rgbColor.value
      }
    })
    message.success('RGB颜色已应用')
  } catch (error) {
    message.error('控制失败')
  }
}

const handleVoiceControl = async () => {
  if (!voiceText.value.trim()) {
    message.warning('请输入语音内容')
    return
  }
  
  try {
    // 调用控制API
    await controlStore.sendCommand(props.device.device_name, {
      device_name: props.device.device_name,
      command: {
        syn6288: {
          voice_text: voiceText.value,
          voice_music: parseInt(voiceMusic.value)
        }
      }
    })
    message.success('语音播放命令已发送')
  } catch (error) {
    message.error('控制失败')
  }
}
</script>

<style scoped>
.device-control-panel {
  padding: 16px;
}
</style>