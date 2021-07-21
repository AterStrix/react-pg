import React, { Component, ReactElement } from "react"

interface T {
    [key: string]: any,
}

class Renderer extends React.Component {
    render() {
        const { item } = this.props as any;
        return <item.test />
    }
};

export class Compose extends React.Component {
    render() {
        const { items } = this.props as any;

        return (
            <Renderer item={{ test: items['Test1'] }} />
        )
    }
}