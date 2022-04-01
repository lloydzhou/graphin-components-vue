<template>
  <Graphin :data="data" :layout="layout">
    <DragCanvas />
    <ZoomCanvas />
    <DragNode />
    <Hoverable />
    <ActivateRelations />
    <FontPaint />
    <MiniMap />
  </Graphin>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component';
import MiniMap from './MiniMap';
import Graphin, { Utils, Behaviors } from 'antv-graphin-vue'
import 'antv-graphin-vue/dist/index.css'

const { DragCanvas, ZoomCanvas, DragNode, Hoverable, ActivateRelations, FontPaint } = Behaviors

@Options({
  components: {
    Graphin,
    MiniMap,
    DragCanvas, ZoomCanvas, DragNode, Hoverable, ActivateRelations, FontPaint,
  },
})
export default class App extends Vue {
  data = {nodes: [], edges: []}
  layout: { type: 'graphin-force' }
  created() {
    this.data = Utils.mock(5).circle().graphin()
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
