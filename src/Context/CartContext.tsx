//cartContext

import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Product } from "../constants/types";
import api, { Basket, GetAllcategory } from "../constants/END_POINTS";

import { CatImages, TestImages } from "../constants/ImgArray";
import CartItem from "../modules/CartModule/Components/CartItem/CartItem";

interface CartItem extends Product {
  quantity: number;
  book: string;
}

interface CartContextType {
  cartItems: CartItem[]; // Array to hold items in the cart
  addToCart: (product: Product) => void; // Function to add an item to the cart
  removeFromCart: (productId: string) => void; // Function to remove an item by its ID
  updateCartItemQuantity: (productId: string, newQuantity: number) => void; // Function to update item quantity
  categories: any[]; // Array to hold product categories
  books: any[];
  cartId: any;
  total: any;
  loading: boolean;
  getMyBasket: () => void;
  confirmDelete: any;
  setConfirmDelete: any;
  setLoading: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider(props: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State to hold cart items
  const [categories, setCategories] = useState<any[]>([]); // State to hold categories
  const [books, setBooks] = useState([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    productId: string;
    productName: string;
  } | null>(null);
  // ==============================================================================
  // add To cart
  const addToCart = async (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.info(`${product.name} is already in your cart.`);
      return;
    }

    try {
      const payload = {
        book: product.id,
        quantity: 1,
      };

      const response = await api.post(`${Basket}/item`, payload);
      if (response.status === 200) {
        await getMyBasket();
        toast.success(`${product.name} has been added to the cart!`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  // ========================================================
  const removeFromCart = async (productId: string) => {
    try {
      // فلترة المنتجات لإزالة المنتج المطلوب حذفه
      const updatedCartItems = cartItems.filter(
        (item) => item.book !== productId
      );

      // تجهيز الـ payload مع كافة المنتجات المتبقية
      const payload = {
        items: updatedCartItems.map((item) => ({
          book: item.book, // book ID
          quantity: item.quantity.toString(), // تحويل الكمية إلى string
        })),
      };
      console.log(`cart id : ${cartId}`);
      // إرسال الطلب إلى الـ API لتحديث السلة
      const response = await api.put(`${Basket}/${cartId}`, payload);

      if (response.status === 200 && response.data.status === "SUCCESS") {
        // تحديث حالة السلة في الـ context
        setCartItems(updatedCartItems);
        toast.success("Product removed from the cart!");
      } else {
        throw new Error("Failed to remove product from the cart");
      }
    } catch (error: any) {
      console.error("Error removing product from the cart:", error.message);
      toast.error(
        error.message || "An error occurred while removing the product."
      );
    }
  };
  // ===============================================================
  // // Function to update the quantity of a product in the cart
  const updateCartItemQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    setLoading(true);
    try {
      // التحقق من أن الكمية الجديدة أكبر من 0
      if (newQuantity <= 0) {
        toast.error("Quantity must be at least 1.");
        return;
      }

      // تعديل الكمية للمنتج المطلوب
      const updatedCartItems = cartItems.map((item) => {
        if (item.book === productId) {
          return { ...item, quantity: newQuantity }; // تعديل الكمية
        }
        return item;
      });

      // تجهيز الـ payload مع كافة المنتجات المحدثة
      const payload = {
        items: updatedCartItems.map((item) => ({
          book: item.book,
          quantity: item.quantity.toString(), // تحويل الكمية إلى string
        })),
      };

      // إرسال الطلب إلى الـ API لتحديث السلة
      const response = await api.put(`${Basket}/${cartId}`, payload);

      if (response.status === 200 && response.data.status === "SUCCESS") {
        // تحديث حالة السلة في الـ context
        setCartItems(updatedCartItems);
        setLoading(false);
        toast.success("Quantity updated ! ");
      } else {
        throw new Error("Failed to update cart.");
      }
    } catch (error: any) {
      console.error("Error updating cart:", error);
      toast.error(
        error.message || "An error occurred while updating the cart."
      );
    }
  };

  // =================================================================
  // دالة لجلب السلة من الـ API
  const getMyBasket = async () => {
    setLoading(true);
    try {
      // إرسال الطلب لجلب السلة من الـ API
      const response = await api.get(`${Basket}`);

      const items = response.data.items || [];
      const cartId = response.data._id;
      const total = response.data.total;
      // console.log(items);

      if (items.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      setCartItems(items);
      setCartId(cartId); // افتراض أن لديك دالة `setCartId` لتخزين `cartId`
      setTotal(total);

      // toast.success("Basket loaded successfully!");
    } catch (error: any) {
      console.error("Error fetching basket from API:", error);
      toast.error("Failed to fetch basket.");
    } finally {
      setLoading(false);
    }
  };

  // ===================================================================
  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${GetAllcategory}`); // Fetch categories from the API
      const categoriesWithBooks = response.data.filter(
        (category: any) => category.books.length > 0 // Filter categories that have books
      );

      const allBooks =
        categoriesWithBooks.flatMap((category: any) =>
          category.books.map((book: any, index: number) => ({
            id: book._id,
            name: book.name,
            author: book.author || book.auther,
            price: book.price,
            image: TestImages[index % TestImages.length],
            categoryId: category._id,
          }))
        ) || [];
      setBooks(allBooks);
    } catch (error: any) {
      console.error("Error fetching books", error);
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // useEffect(() => {
  //   console.log("Cart items after update:", cartItems);
  // }, [cartItems]);
  // useEffect(() => {
  //   console.log("Books after update:", books);
  // }, [books]);
  // ================================================================================
  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await api.get(`${GetAllcategory}`); // Fetch categories from the API
      const categoriesWithBooks = response.data.filter(
        (category: any) => category.books.length > 0 // Filter categories that have books
      );

      // Merge category data with images from the CatImages array
      const meregeData = categoriesWithBooks.map(
        (cate: any, index: number) => ({
          ...cate,
          image: CatImages[index % CatImages.length], // Assign an image to each category
        })
      );

      setCategories(meregeData); // Update categories state with fetched data
    } catch (error: any) {
      console.error("Error fetching categories", error); // Log any errors
      toast.error(error.response.data.message); // Show a toast notification on error
    }
  };

  // Fetch categories when the component is mounted
  useEffect(() => {
    fetchCategories();
    fetchBooks();
    getMyBasket();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        categories,
        books,
        cartId,
        total,
        loading,
        getMyBasket,
        confirmDelete,
        setConfirmDelete,
        setLoading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
