// @ts-nocheck
import { defineComponent, provide, inject } from 'vue';
import './index.less';

export const menuContextSymbol =  String(Symbol('menuContextSymbol'))
export const createMenuContext = (context) => {
  provide(menuContextSymbol, context)
}
export const useMenuContext = () => {
  const context = inject(menuContextSymbol)
  if (!context) {
    throw new Error('context must be used after useProvide')
  }
  return context
}


export interface MenuProps {
  /**
   * @description 绑定元素，必选
   * @default node
   */
  // bindType: string;
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
    },
  },
  inject: [menuContextSymbol],
  setup(props, { slots }) {
    const { onClick } = props;
    const { item, handleClose: close } = useMenuContext();
    const handleClose = (e) => {
      onClick && onClick(e, item ? item.getModel() : undefined)
      close && close()
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
    options: {
      type: Object as MenuProps['options'],
    },
    onChange: {
      type: Function as MenuProps['onChange'],
    }
  },
  inject: [menuContextSymbol],
  setup(props, { slots }) {
    const { options, onChange } = props;
    const { item, handleClose: close } = useMenuContext();
    const handleClick = e => {
      onChange && onChange(e, item ? item.getModel() : undefined)
      close && close()
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

