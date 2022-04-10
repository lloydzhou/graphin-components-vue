// @ts-nocheck
import G6 from '@antv/g6'
import { GraphinContext } from 'antv-graphin-vue';
import { defineComponent, onMounted } from 'vue';

const { useContext, contextSymbol } = GraphinContext

const EdgeBundling = defineComponent({
  name: 'EdgeBundling',
  inject: [contextSymbol],
  setup(props) {
    const { graph } = useContext();
    onMounted(() => {
      const edgeBundling = new G6.Bundling({
        bundleThreshold: 0.6,
        K: 100,
      })
      const data = graph.save() as any;
      graph.addPlugin(edgeBundling);
      edgeBundling.bundling(data);
      graph.data(data);
      graph.render();
    })
    return () => null
  }
})

export default EdgeBundling;

