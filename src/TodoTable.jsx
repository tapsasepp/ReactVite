import React from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

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
                <td>{item.priority}</td>
                <td>{dayjs(item.date).locale('en-gb').format('DD.MM.YYYY')}</td>
                <td><button onClick={() => props.deleteLine(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default TodoTable;