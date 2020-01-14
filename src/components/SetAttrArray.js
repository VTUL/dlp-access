export const SetAttrArray = (keyArr, itemObj) => {
  const keyArray = keyArr;

  var attributeArray = [];
  for (let key of Object.keys(itemObj)) {
    if (itemObj.hasOwnProperty(key) && keyArray.includes(key)) {
      var item_values = itemObj[key];
      var key_name = (key.charAt(0).toUpperCase() + key.slice(1)).replace(
        "_",
        " "
      );
      if (item_values) {
        if (key_name === "Start date") {
          key_name = "Date";
          let circa_date = itemObj["circa"] ? itemObj["circa"] : "";
          let end_date = itemObj["end_date"] ? " - " + itemObj["end_date"] : "";
          item_values = circa_date + itemObj["start_date"] + end_date;
        } else if (key_name === "Custom key") {
          key_name = "NOID";
        }
        attributeArray.push({
          name: key_name,
          values: item_values
        });
      }
    }
  }
  return attributeArray;
};
