import React from "react";
import "../css/Table.css";
import ReactHtmlParser from "react-html-parser";

const Row = ({ name, values }) => {
  const ListValue = ({ values }) => (
    <ul>
      {values.map((value, i) => (
        <li key={i}>
          {value.includes("<a href=") ? ReactHtmlParser(value) : value}
        </li>
      ))}
    </ul>
  );
  return (
    <tr>
      <th>{name}</th>
      <td>{Array.isArray(values) ? <ListValue values={values} /> : values}</td>
    </tr>
  );
};

export const Table = ({ rows }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <Row key={i} name={row.name} values={row.values} />
        ))}
      </tbody>
    </table>
  );
};
