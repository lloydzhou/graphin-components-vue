// @ts-nocheck
import { GraphinContext } from 'antv-graphin-vue';
import { defineComponent, onMounted } from 'vue';

const { useContext, contextSymbol } = GraphinContext

const defaultComboCfg = {
  members: [],
  type: 'rect',
  style: {
    fill: 'lightblue',
    stroke: 'blue',
    opacity: 0.2,
  },
  padding: 10,
};

/**
 * deep merge Combo config
 * @param defaultCfg
 * @param cfg
 */
const deepMergeCfg = (defaultCfg: typeof defaultComboCfg, cfg: ComboCfg) => {
  const { style: DefaultCfg = {}, ...defaultOtherCfg } = defaultCfg;
  const { style = {}, ...others } = cfg;
  return {
    ...defaultOtherCfg,
    ...others,
    style: {
      ...DefaultCfg,
      ...style,
    },
  };
};

export interface ComboCfgStyle {
  /**
   * @description 填充颜色
   * @default 'lightblue'
   */
  fill: string;
  /**
   * @description 描边颜色
   * @default 'blue'
   */
  stroke: string;
  /**
   *
   * @description 透明度
   * @default 0.2
   */
  opacity: number;
}
export interface ComboCfg {
  /**
   * @description 在combo内部的节点实例或节点 Id 数组
   * @default []
   *
   */
  members: string[];
  /**
   * combo的 id
   */
  id?: string;
  /**
   * @description combo的类型
   * rect: 矩形
   * circle: 圆
   * @default rect
   */
  type?: 'rect' | 'circle';
  /** combo的样式属性 */
  style?: Partial<ComboCfgStyle>;
  /**
   * @description 边缘和内部成员的间距
   * @default 10
   */
  padding?: number;
}

export interface IComboProps {
  /**
   * @description 配置
   */
  options: ComboCfg[];
}

const Combo = defineComponent({
  name: 'Combo',
  props: {
    options: {
      type: Array as IComboProps['options'],
      default: () => []
    }
  },
  inject: [contextSymbol],
  setup(props) {
    const { graph } = useContext();
    onMounted(() => {
      const { options } = props;

      options.map(item => {
        return graph.createCombo(
          // @ts-ignore
          deepMergeCfg(defaultComboCfg, {
            id: `${Math.random()}`,
            ...item,
          }),
          item.members,
        );
      });
    })
    return () => null
  }
})

export default Combo;

