import ItemListContainer from '../Items/ItemListContainer/ItemListContainer';
// import styles from './ProductoDestacado.module.css';

function ProductoDestacado ({mensaje}){
return(
    <>
      
        <ItemListContainer mensaje={mensaje} destacado={true} />

    </>
)

}
export default ProductoDestacado;
