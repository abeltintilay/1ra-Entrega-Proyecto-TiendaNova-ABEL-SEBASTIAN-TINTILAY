import { Item } from "../Item/Item";

import styles from "./ItemList.module.css";


function ItemList({ productos }) {
  return (
    <div className={styles.grid}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
}
export default ItemList;
