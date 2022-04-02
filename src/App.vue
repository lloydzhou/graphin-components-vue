<template>
  <Graphin :data="data" :layout="layout">
    <DragCombo />
    <DragCanvas />
    <ZoomCanvas />
    <DragNode />
    <Hoverable />
    <ActivateRelations />
    <FontPaint />
    <Combo :options="comboOptions" />
    <ContextMenu bindType="canvas">
      <Menu bindType="canvas">
        <MenuItem :onClick="handleShowFishEye">鱼眼</MenuItem>
        <MenuItem :onClick="handleClear">清除画布</MenuItem>
        <MenuItem :onClick="handleStopLayout">停止布局</MenuItem>
        <MenuItem :onClick="handleDownload">下载画布</MenuItem>
      </Menu>
    </ContextMenu>
    <ContextMenu>
      <Menu :options="contextMenu" :onChange="onContextMenuChange">
      </Menu>
    </ContextMenu>
    <ContextMenu bindType="edge">
      <Menu>
        <MenuItem :onClick="handleEdge">清除</MenuItem>
        <MenuItem :onClick="handleEdge">编辑</MenuItem>
      </Menu>
    </ContextMenu>
    <MiniMap />
    <FishEye v-if="showFishEye" :handleEscListener="handleHideFishEye" />
  </Graphin>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component';
import Graphin, { Utils, Behaviors } from 'antv-graphin-vue'
import 'antv-graphin-vue/dist/index.css'
import {
  Combo,
  ContextMenu,
  MiniMap,
  FishEye,
} from './index'

const { Menu } = ContextMenu
const MenuItem = Menu.Item
const { DragCombo, DragCanvas, ZoomCanvas, DragNode, Hoverable, ActivateRelations, FontPaint } = Behaviors

@Options({
  components: {
    Graphin,
    DragCombo, DragCanvas, ZoomCanvas, DragNode, Hoverable, ActivateRelations, FontPaint,
    Combo,
    ContextMenu, Menu, MenuItem,
    MiniMap,
    FishEye,
  },
})
export default class App extends Vue {
  data = {nodes: [], edges: []}
  layout = { type: 'graphin-force' }
  comboOptions = [
    {
      members: ['node-1', 'node-2', 'node-9']
    },
    {
      members: ['node-3', 'node-4'],
      type: 'circle',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    }
  ]
  contextMenu = [
    {
      key: 'tag',
      name: '打标'
    },
    {
      key: 'delete',
      name: '删除'
    },
    {
      key: 'expand',
      name: '扩散'
    },
  ]

  showFishEye = false

  created() {
    this.data = Utils.mock(10).circle().graphin()
    // this.layout = { type: 'graphin-force' }
    this.layout = {
      type: 'graphin-force',
      preset: {
        type: 'grid',
      }
    }
  }
  onContextMenuChange(e, item) {
    console.log('onContextMenuChange', e, item)
  }
  handleClear(e) {
    console.log('handleClear', e)
  }
  handleStopLayout(e) {
    console.log('handleStopLayout', e)
  }
  handleDownload(e) {
    console.log('handleDownload', e)
  }
  handleEdge(e, item) {
    console.log('handleEdge', e, item)
  }
  handleShowFishEye(e) {
    console.log('handleShowFishEye', e)
    this.showFishEye = true
  }
  handleHideFishEye(e) {
    console.log('handleHideFishEye', e)
    this.showFishEye = false
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 98vw;
  height: 98vh;
}
</style>
