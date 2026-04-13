"use client";

import React, { Component } from "react";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  async getItems() {
    try {
      await this.props.loadData();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getItems();

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  async handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.setState({ loading: true });

      await this.getItems();

      this.setState({ loading: false });
    }
    this.setState({ prevY: y });
  }

  render() {
    // Additional css
    const loadingCSS = {
      height: "10px",
      margin: "5px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div style={{ minHeight: "5px" }}>
          {this.props.children}
        </div>
        <div
          className="house"
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS} className="text-gray-500">Loading more...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;