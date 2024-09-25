// components/ProductGrid.tsx
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../../../constants/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <Grid container spacing={4}>
      {products.map((product: any) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
