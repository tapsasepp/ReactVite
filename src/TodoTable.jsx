import React from "react";

function TodoTable(props) {
    return (
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Date</th>
            </tr>
            {props.todos.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default TodoTable;