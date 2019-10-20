import React from "react";
import ColumnListItem from "./ColumnListItem";
//columnlist.text
const Column = ({ columnTitle, columnList }) => {
  let columnlist = columnList.map(columnListItem => {
    return <ColumnListItem text={columnListItem.text} />;
  });
  return (
    <div>
      <div>{columnTitle}</div>
      <div>
        <ul>{columnlist}</ul>
      </div>
    </div>
  );
};

export default Column;