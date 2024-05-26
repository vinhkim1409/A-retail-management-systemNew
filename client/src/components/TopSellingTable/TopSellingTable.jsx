import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faLessThan,
  faGreaterThan,
  faTrashCan,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./TopSellingTable.scss";
import { Paragraph } from "../Typography.jsx";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const TopSellingTable = ({ productsList }) => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const {tenantURL}=useParams()
  return (
    <Card
      elevation={3}
      sx={{ pt: "20px", mb: 3, mt: 3 }}
      className="topSelling-container"
    >
      <CardHeader>
        <Title>top selling products</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow sx={{
                    backgroundColor: "#F5F5F5",
                  }}>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Revenue
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Total Sold
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Stock Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productsList?.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{ px: 0, textTransform: "none",maxWidth: 150 }}
                  className="name"
                >
                  <Box display="flex" alignItems="center" className="name">
                    <Avatar src={product.product.avatar.picture_url} className="avatar" />
                    <Paragraph
                      sx={{ m: 0, ml: 4,maxWidth: 280 }}
                      className="name"
                    >
                      {product.product.name}
                    </Paragraph>
                  </Box>
                </TableCell>

                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{ px: 0, textTransform: "capitalize",maxWidth:40,minWidth:40}}
                  className="name"
                >
                  {product.product.price}đ
                </TableCell>
                <TableCell
                  align="left"
                  colSpan={1}
                  sx={{ px: 0, textTransform: "capitalize",maxWidth:30,minWidth:30}}
                  className="name"
                >
                 100
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.product.stock_quantity ? (
                    product.product.stock_quantity < 20 ? (
                      <Small bgcolor={bgSecondary}>
                        {product.product.stock_quantity} available
                      </Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <Link to={`/${tenantURL}/business`}>
                    <button className="btn">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

// const productList = [
//   {
//     imgUrl: "/assets/images/products/headphone-2.jpg",
//     name: "earphone",
//     price: 100,
//     available: 15,
//   },
//   {
//     imgUrl: "/assets/images/products/headphone-3.jpg",
//     name: "earphone",
//     price: 1500,
//     available: 30,
//   },
//   {
//     imgUrl: "/assets/images/products/iphone-2.jpg",
//     name: "iPhone x",
//     price: 1900,
//     available: 35,
//   },
//   {
//     imgUrl: "/assets/images/products/iphone-1.jpg",
//     name: "iPhone x",
//     price: 100,
//     available: 0,
//   },
//   {
//     imgUrl: "/assets/images/products/headphone-3.jpg",
//     name: "Head phone",
//     price: 1190,
//     available: 5,
//   },
// ];

export default TopSellingTable;
