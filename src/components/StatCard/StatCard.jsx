import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Fab,
  Grid,
  Icon,
  lighten,
  styled,
  useTheme,
} from "@mui/material";
import { faAngleUp,faChartLine,faStar,faWarehouse } from "@fortawesome/free-solid-svg-icons";

const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important",
}));

const H3 = styled("h3")(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: "500",
  marginLeft: "12px",
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled("span")(({ textcolor }) => ({
  fontSize: "13px",
  color: textcolor,
  marginLeft: "4px",
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" },
}));

const StatCards2 = (props) => {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <ContentBox>
            <FabIcon
              size="medium"
              sx={{ background: "rgba(9, 182, 109, 0.15)" }}
            >
              <FontAwesomeIcon icon={faChartLine} />
            </FabIcon>
            <H3 textcolor={"#08ad6c"}>Customer</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{props.value1}</H1>
            <IconBox sx={{ background: "rgba(9, 182, 109, 0.15)" }}>
              <FontAwesomeIcon icon={faAngleUp} />
            </IconBox>
            <Span textcolor={"#08ad6c"}>(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <ContentBox>
            <FabIcon
              size="medium"
              sx={{ background: bgError, overflow: "hidden" }}
            >
             <FontAwesomeIcon icon={faStar} />
            </FabIcon>
            <H3 textcolor={textError}>Transactions</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{props.value2}</H1>
            <IconBox sx={{ background: bgError }}>
              <FontAwesomeIcon icon={faAngleUp} />
            </IconBox>
            <Span textcolor={textError}>(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <ContentBox>
            <FabIcon
              size="medium"
              sx={{ background: "#0d6efd", overflow: "hidden" }}
            >
            <FontAwesomeIcon icon={faWarehouse} style={{color:"white"}}/>
            </FabIcon>
            <H3 textcolor="#0d6efd">Inventory</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{props.value3}</H1>
            <IconBox sx={{ background: "#0d6efd" }}>
              <FontAwesomeIcon icon={faAngleUp} />
            </IconBox>
            <Span textcolor={textError}>(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
