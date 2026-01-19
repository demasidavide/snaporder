import "./ProductList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function ProductList() {
  return (
    <>
      <ToggleButtonGroup value={""}  exclusive aria-label="Platform">
        <ToggleButton className="type" value="Cibo">Cibo
        </ToggleButton>
        <ToggleButton className="type-selected" value="Bevande">Bevande
        </ToggleButton>
      <Fab className="add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </ToggleButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descr.</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Prezzo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acqua naturale</TableCell>
              <TableCell>mezzo litro</TableCell>
              <TableCell>bevanda</TableCell>
              <TableCell>2.50$</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ProductList;
