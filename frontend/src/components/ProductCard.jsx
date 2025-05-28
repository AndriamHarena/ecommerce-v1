function ProductCard({ product }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>{product.price} €</strong></p>
        </div>
    );
}

export default ProductCard;
