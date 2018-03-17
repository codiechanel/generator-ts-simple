import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css'

class App extends React.Component<any, any> {
    render() {
        return "hello"
    }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
