import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Charger le panier depuis localStorage au démarrage ou quand l'utilisateur change
  useEffect(() => {
    const loadCart = () => {
      try {
        // Si l'utilisateur est connecté, on charge son panier spécifique
        const cartKey = user ? `cart_${user.id || user._id || user.email}` : 'cart_guest';
        const savedCart = localStorage.getItem(cartKey);
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } else {
          // Réinitialiser le panier si aucun n'est trouvé pour cet utilisateur
          setCart([]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        setCart([]);
      }
    };

    loadCart();
  }, [user]);

  // Mettre à jour localStorage et calculer les totaux quand le panier change
  useEffect(() => {
    const saveCart = () => {
      try {
        const cartKey = user ? `cart_${user.id || user._id || user.email}` : 'cart_guest';
        localStorage.setItem(cartKey, JSON.stringify(cart));
        
        // Calculer le total et le nombre d'articles
        const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
        
        const newItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(newItemCount);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
      }
    };

    saveCart();
  }, [cart, user]);

  const addToCart = (product) => {
    if (!product) return;
    
    setCart(prevCart => {
      const productId = product.id || product._id;
      const existingItem = prevCart.find(item => (item.id === productId || item._id === productId));
      
      if (existingItem) {
        return prevCart.map(item => 
          (item.id === productId || item._id === productId)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity: 1,
          // Garantir que nous avons un ID cohérent
          id: productId
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => 
      item.id !== productId && item._id !== productId
    ));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        (item.id === productId || item._id === productId)
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
