import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";

interface Category {
  books: [];
  image: string;
  title: string;
  _id: string;
}

interface SidebarFiltersProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: (value: number | undefined) => void;
  setMaxPrice: (value: number | undefined) => void;
  clearFilter: () => void;
  onCategoryChange: (categoryId: string, checked: boolean) => void;
}

export default function SidebarFilters({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  clearFilter,
  onCategoryChange,
}: SidebarFiltersProps) {
  const cartContext = useContext(CartContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  // On phones and tablets the filters start collapsed so the books are visible first
  const isCompact = useMediaQuery("(max-width:900px)", { noSsr: true });

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 2,
        ...(isMobile && { padding: 1 }),
      }}
    >
      {/* Filtering Accords */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isCompact ? 1 : 0,
        }}
      >
        <Accordion
          disableGutters
          defaultExpanded={!isCompact}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: "#393280",
                }}
              />
            }
            sx={{ paddingX: 2 }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#393280" }}
            >
              Price
            </Typography>
          </AccordionSummary>

          <Divider sx={{ mx: 2, mb: 2, bgcolor: "#E0E0E0" }} />
          <AccordionDetails>
            {/* Price Filter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <TextField
                id="min-price"
                size="small"
                variant="outlined"
                label="Min $"
                type="number"
                value={minPrice || ""}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
                sx={{
                  flex: 1,
                  mr: 1,
                  color: "#393280",
                }}
              />
              <Typography variant="body2" color="textSecondary">
                to
              </Typography>
              <TextField
                id="max-price"
                size="small"
                label="Max $"
                type="number"
                variant="outlined"
                sx={{ flex: 1, ml: 1 }}
                value={maxPrice || ""}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Category Accordion */}
        <Accordion
          disableGutters
          defaultExpanded={!isCompact}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: "#393280",
                }}
              />
            }
            sx={{ paddingX: 2 }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#393280" }}
            >
              Category
            </Typography>
          </AccordionSummary>
          <Divider sx={{ mx: 2, mb: 2, bgcolor: "#E0E0E0" }} />
          <AccordionDetails>
            {cartContext?.categories && cartContext.categories.length > 0 ? (
              cartContext.categories.map((category: Category) => (
                <FormControlLabel
                  sx={{
                    display: "flex",
                    color: "#393280 !important",
                  }}
                  key={category._id}
                  control={
                    <Checkbox
                      onChange={(event) =>
                        onCategoryChange(category._id, event.target.checked)
                      }
                    />
                  }
                  label={category.title}
                />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No categories available
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--orange-color)",
          color: "#fff",
          width: "100%",
          textTransform: "capitalize",
          borderRadius: "0",
          fontWeight: "400",
          fontSize: "16px",
          mt: isCompact ? 2 : 6,
          ":hover": {
            backgroundColor: "var(--blue-color-hover)",
            color: "#393280",
            border: "1px solid #393280",
          },
        }}
        onClick={clearFilter}
      >
        Clear Filter
      </Button>
    </Box>
  );
}
