import React, { Component, ReactElement } from "react"

class Renderer extends React.Component {
  props: any;

  render() {
      const { wrapper, content } = this.props;
      return (
        <wrapper.item>
          <content.item />
        </wrapper.item>
      )
  }
};
class Renderer2 extends React.Component {
  props: any;

  render() {
      const { items } = this.props;
      return <wrapper.item />
  }
};

const Renderer3 = (props) => (console.log(props),

  <props.children.item>{props.children.children && <Renderer3>{props.children.children}</Renderer3>}</props.children.item>
)

export class Compose extends React.Component {
  props: any;

  render() {
      const { items } = this.props as any;
      const makeItem = (item, children) => item.children = { item: children };
      const makeTree = (items) => items.reduce((acc, item) => makeItem(acc.children || { item: acc }, item));

      console.log(makeTree(items));

      return (<Renderer3>{makeTree(items)}</Renderer3>)
  }
}
