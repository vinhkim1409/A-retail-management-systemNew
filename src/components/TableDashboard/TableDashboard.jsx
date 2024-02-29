import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Customer Name", minWidth: 150 },
  { id: "company", label: "Company", minWidth: 100 },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 150,
    align: "center",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 80,
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
    align: "center",
  },
];

function createData(name, company, phone, email, country, status) {
  return { name, company, phone, email, country, status };
}

const rows = [
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
  createData(
    "Jane Cooper",
    "Sea food",
    "(028) xxx-xxx",
    "jane@food.com",
    "Thu Duc",
    "Accept"
  ),
];

export default function TableDashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height:340 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    color: "gray",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          // style={{ borderBottom: "none" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={5}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
