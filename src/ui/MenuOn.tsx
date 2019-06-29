import * as React from "react";
import {
  Checkbox,
  Typography,
  FormControlLabel,
  Menu,
  MenuItem
} from "@material-ui/core";
import { MenuItemProps } from "@material-ui/core/MenuItem";

export interface MuiMenuItem {
  label?: string;
  render?: (props: MenuItemProps & { key: string | number }) => React.ReactNode;
  onClick?: () => void;
  isChecked?: boolean;
  onChange?: (e: any) => void;
}

type MenuOpenEventHandler = any;
interface MenuOnState {
  menuAnchorElement?: HTMLElement;
}
export interface MenuOnProps {
  renderOn: (onOpen: MenuOpenEventHandler) => React.ReactNode;
  variant?: "withCheckbox";
  items?: MuiMenuItem[];
}

export class MenuOn extends React.Component<MenuOnProps, MenuOnState> {
  constructor(props: MenuOnProps) {
    super(props);
    this.state = {
      menuAnchorElement: undefined
    };
  }

  get isMenuOpen() {
    return this.state.menuAnchorElement !== undefined;
  }

  private onOpen = (event: React.SyntheticEvent<any>) => {
    if (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      this.setState({ menuAnchorElement: event.currentTarget });
    }
  };

  private close = (event: React.SyntheticEvent<any>) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.setState({ menuAnchorElement: undefined });
  };

  renderDefaultItems = () => {
    const { items } = this.props;
    return (
      items &&
      items.map((item, index) => {
        const { onClick, render, ...rest } = item;

        const props = {
          onClick,
          key: index,
          children: <Typography>{item.label}</Typography>,
          ...rest
        };
        if (render) {
          return render({ onClick, key: index, ...rest });
        }

        // Re-use (clone) original element or use props to create a new MenuItem element
        return React.isValidElement(item)
          ? React.cloneElement(item, props)
          : React.createElement(MenuItem, props);
      })
    );
  };
  renderCheckboxItems = () => {
    const { items } = this.props;
    return (
      items &&
      items.map((item, index) => {
        const { onClick, onChange, ...rest } = item;

        const children = (
          <FormControlLabel
            label={item.label}
            control={
              <Checkbox
                color="primary"
                name={item.label}
                checked={item.isChecked}
                onChange={item.onChange}
              />
            }
          />
        );
        const props = {
          children,
          key: index,
          ...rest
        };

        // Re-use (clone) original element or use props to create a new MenuItem element
        return React.isValidElement(item)
          ? React.cloneElement(item, props)
          : React.createElement(MenuItem, props);
      })
    );
  };

  renderItems() {
    if (this.props.variant === "withCheckbox") {
      return this.renderCheckboxItems();
    }
    return this.renderDefaultItems();
  }

  render() {
    const { renderOn, items, children, variant, ...rest } = this.props;
    const { menuAnchorElement } = this.state;

    return (
      <React.Fragment>
        {renderOn(this.onOpen)}
        <Menu
          onClick={variant !== "withCheckbox" ? this.close : undefined}
          anchorEl={menuAnchorElement}
          open={this.isMenuOpen}
          onClose={this.close}
          {...rest}
        >
          {this.renderItems()}
        </Menu>
      </React.Fragment>
    );
  }
}
