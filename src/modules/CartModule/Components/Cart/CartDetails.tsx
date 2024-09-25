// components/Cart.tsx

import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"; // استيراد Dialog

import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import TopSection from "../../../ListingPageModel/Components/TopSection/TopSection";
import { Product } from "../../../../constants/types";

import Payment from "../Payment/Payment";

export default function CartDetails() {
  const cartContext = useContext(CartContext);

  // let navigate = useNavigate();
  if (!cartContext) {
    return <Typography>Cart is empty</Typography>;
  }

  const {
    loading,
    cartItems,
    books,
    removeFromCart,
    updateCartItemQuantity,
    confirmDelete,
    setConfirmDelete,
  } = cartContext;

  // فتح الـ Modal للحذف
  const handleOpenDeleteConfirm = (productId: string, productName: string) => {
    setConfirmDelete({ productId, productName });
  };
  const handleConfirmDelete = () => {
    if (confirmDelete) {
      removeFromCart(confirmDelete.productId);
      setConfirmDelete(null); // إغلاق الـ Modal بعد الحذف
    }
  };

  const handleClose = () => {
    setConfirmDelete(null); // إغلاق الـ Modal بدون حذف
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item: any) => {
      const bookDetails = books.find((book) => book.id === item.book);
      if (!bookDetails) {
        // console.error(`Book not found for ID ${item.book}`);
        return total; // إذا لم يتم العثور على الكتاب، تجاهل هذا العنصر
      }
      return total + bookDetails.price * item.quantity;
    }, 0);
  };
  if (loading) {
    return (
      <Box py={10} textAlign={"center"}>
        <i
          style={{ color: "#393280" }}
          className="fas fa-spinner fa-pulse fa-9x "
        ></i>
        <Typography
          color="var(--blue-color)"
          variant="h2"
          py={6}
          sx={{ mt: 2 }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TopSection pageTitle="Shopping Cart" currentPath="Home" />
      <Box sx={{ padding: 8, paddingTop: 2 }}>
        <Grid container mt={4}>
          {/* قائمة المنتجات */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                borderColor: "#ddd", // لون الحدود المخفف
                display: "flex",
                border: 1,
                padding: 3, // زيادة التباعد الداخلي لتحسين المظهر
                mx: 2, // تقليل الهوامش الجانبية
                px: 6, // تقليل التباعد الداخلي داخل المحتوى
                mb: 4,
                borderRadius: 2, // زيادة تدوير الحواف لإضفاء مظهر عصري
                bgcolor: "#FF6F61", // لون الخلفية الحديث
                color: "#fff", // لون النص الأبيض ليتناسب مع الخلفية
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // إضافة ظل خفيف لإبراز الجزء
              }}
            >
              <Typography
                width="50%"
                variant="h5"
                sx={{
                  fontWeight: "bold", // Bold for the book title
                  fontSize: "1.2rem", // Slightly larger font size
                }}
              >
                Book
              </Typography>
              <Box
                display="flex"
                justifyContent="space-evenly"
                flexGrow={1}
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center", // Center-align the text
                  }}
                >
                  Quantity
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center", // Center-align the text
                  }}
                >
                  Price
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center", // Center-align the text
                    color: "#F5F5F5", // Lighter text for Delete
                  }}
                >
                  Delete
                </Typography>
              </Box>
            </Box>
            <Grid
              rowSpacing={2}
              sx={{
                paddingX: 3,
                pt: 3,
                pb: 1,
                m: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9",
              }}
            >
              {cartItems.length === 0 ? (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  textAlign="center"
                >
                  Your cart is empty
                </Typography>
              ) : (
                cartItems.map((item: any, index) => {
                  const bookDetails = books.find(
                    (book: Product) => book.id === (item as any).book
                  );
                  if (!bookDetails) {
                    return (
                      <Typography key={index} color="error">
                        Error: Book not found for ID {item.book}
                      </Typography>
                    );
                  }
                  const itemSubtotal = bookDetails.price * item.quantity;
                  return (
                    <Card
                      key={bookDetails.id || index}
                      sx={{
                        display: "flex",
                        mb: 2,
                        mr: 3,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Added a soft shadow
                        bgcolor: "#fff", // Changed background to white
                        borderRadius: "8px", // Rounded the edges
                        overflow: "hidden", // Ensure image fits within the card
                        border: "1px solid #e0e0e0", // Border for better structure
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={bookDetails.image}
                        alt={item.name}
                        sx={{
                          width: 120,
                          height: 160, // Fixed height to ensure consistency in the layout
                          objectFit: "cover", // Ensures the image scales well
                          borderRight: "1px solid #e0e0e0", // Border between image and content
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between", // Ensure even spacing between items
                          alignItems: "center",
                          flexGrow: 1,
                          px: 3, // Added horizontal padding for better spacing
                        }}
                      >
                        {/* Book Information Section */}
                        <Box sx={{ flex: "1", mr: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {bookDetails.name || "Book name"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#757575" }}>
                            By {bookDetails.author || "Unknown Author"}
                          </Typography>
                        </Box>
                        {/* Quantity Controls Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", // Center align elements
                            gap: 1, // Uniform gap between elements
                            minWidth: "200px", // Ensure the controls section has a defined width
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              updateCartItemQuantity(
                                item.book,
                                item.quantity - 1
                              )
                            }
                            sx={{
                              bgcolor: "#fa8072",
                              color: "#fff",
                              borderRadius: 1,
                              ":hover": {
                                bgcolor: "#E53935",
                              },
                              width: 36, // Uniform button size
                              height: 36,
                              mx: 1, // Ensure spacing between the button and input
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity >= 1) {
                                updateCartItemQuantity(item.book, newQuantity);
                              }
                            }}
                            sx={{
                              width: 60,
                              mx: 1,
                              textAlign: "center",
                            }}
                            inputProps={{
                              style: { textAlign: "center" },
                              min: 1,
                            }}
                          />
                          <IconButton
                            sx={{
                              bgcolor: "#fa8072",
                              color: "#fff",
                              borderRadius: 1,
                              ":hover": {
                                bgcolor: "#394280",
                              },
                              width: 36, // Uniform button size
                              height: 36,
                            }}
                            onClick={() =>
                              updateCartItemQuantity(
                                item.book,
                                item.quantity + 1
                              )
                            }
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        {/* Price Section */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minWidth: "150px", // Ensure the price section has a defined width
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", mb: 0.5 }}
                          >
                            Cost: $ {bookDetails.price}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#757575" }}>
                            Subtotal: ${itemSubtotal}
                          </Typography>
                        </Box>
                        {/* Delete Button */}
                        <Button
                          color="error"
                          onClick={() =>
                            handleOpenDeleteConfirm(
                              item.book,
                              bookDetails?.name || "Product"
                            )
                          }
                          sx={{
                            ml: 2,
                            ":hover": { bgcolor: "transparent" }, // Prevent background on hover
                          }}
                        >
                          <DeleteOutline
                            fontSize="large"
                            sx={{
                              color: "#cf4d4d",
                              transition: "0.3s ease-in-out",
                              ":hover": { color: "#D32F2F" }, // A little darker on hover
                            }}
                          />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </Grid>
            `
          </Grid>

          {/* المجموع الكلي */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                padding: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9", // Light background for a clean look
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                  mb: 2,
                }}
              >
                Shopping Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Subtotal
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${calculateTotalPrice()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Shipping
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $10.00 {/* Example shipping fee */}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Taxes (VAT 5%)
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${(calculateTotalPrice() * 0.05).toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: "#333" }}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#E53935" }}
                >
                  $
                  {(
                    calculateTotalPrice() +
                    10 +
                    calculateTotalPrice() * 0.05
                  ).toFixed(2)}
                </Typography>
              </Box>
            </Card>
            <Payment />
          </Grid>
        </Grid>
      </Box>

      {/* Dialog للتأكيد على الحذف */}
      <Dialog open={!!confirmDelete} onClose={handleClose}>
        <DialogTitle>{"Remove book ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete {confirmDelete?.productName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
