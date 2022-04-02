// @ts-nocheck
import { GraphinContext } from 'antv-graphin-vue';
import { defineComponent } from 'vue';

const { useContext, contextSymbol } = GraphinContext

import './index.less';

export interface MenuProps {
  /**
   * @description 绑定元素，必选
   * @default node
   */
  bindType: string;
  /**
   * @description Menu的配置选项
   */
  options?: Item[];
  /**
   * @description Menu回调函数
   */
  onChange?: (item: Item, data: any) => void;
  /**
   * @description Children
   * @type JSX.Element |  JSX.Element[]
   */
  // children?: JSX.Element | JSX.Element[];
}

export interface Item {
  name: string;
  key?: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Item = defineComponent({
  name: 'Item',
  props: {
    onClick: {
      type: Function
    }
  },
  inject: [contextSymbol],
  setup(props, { slots }) {
    const { onClick } = props;
    const { contextmenu={} } = useContext();
    const handleClose = () => {
      onClick && onClick();
      // 临时方案
      if (contextmenu.node) {
        contextmenu.node.handleClose();
      }
      if (contextmenu.edge) {
        contextmenu.edge.handleClose();
      }
      if (contextmenu.canvas) {
        contextmenu.canvas.handleClose();
      }
    };
    return () => {
      return (
        <li onClick={handleClose}>{slots.default ? slots.default() : null}</li>
      )
    }
  }
})


const Menu = defineComponent({
  name: 'Menu',
  props: {
    bindType: {
      type: String as MenuProps['bindType'],
    },
    options: {
      type: Object as MenuProps['options'],
    },
    onChange: {
      type: Function as MenuProps['onChange'],
    }
  },
  inject: [contextSymbol],
  setup(props, { slots }) {
    const { bindType = 'node', options, onChange } = props;
    const { contextmenu={} } = useContext();
    const handleClick = e => {
      try {
        let item = null;
        if (bindType === 'node') {
          item = contextmenu.node.item.getModel();
        }
        if (bindType === 'edge') {
          item = contextmenu.edge.item.getModel();
        }
        if (bindType === 'canvas') {
          item = null;
        }
        if (onChange) {
          console.log('onChange', e, item)
          onChange(e, item);
          contextmenu[bindType].handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      if (options) {
        return (
          <ul className="graphin-components-contextmenu-content">
            {options.map(c => {
              const { key, icon, name } = c;
              return (
                <Item
                  key={key || name}
                  onClick={() => {
                    handleClick(c);
                  }}
                >
                  {icon} {name}
                </Item>
              );
            })}
          </ul>
        );
      }
      return <ul className="graphin-components-contextmenu-content">{slots.default ? slots.default() : null}</ul>;
    }
  }
})

Menu.Item = Item;

export default Menu;

