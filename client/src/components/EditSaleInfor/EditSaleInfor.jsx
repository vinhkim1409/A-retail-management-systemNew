import React, { useEffect, useState } from "react";
import "./EditSaleInfor.scss";
import { useParams } from "react-router";
import { Grid, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { api } from "../../constant/constant";

function EditSaleInfor({ setTypeSale, setSaleInfor }) {
  const { id } = useParams();
  const [numClass1, setNumClass1] = useState(0);
  const [numClass2, setNumClass2] = useState(0);
  const [class1s, setClass1] = useState([]);
  const [class2s, setClass2] = useState([]);
  const [saleInfo, setSaleInfo] = useState({
    class1: { id: 0, name: "" },
    class2: { id: 0, name: "" },
    buy: "",
    sell: "",
    quantity: "",
  });
  const [classSale, setClassSale] = useState([
    {
      class1: { id: 0, name: "" },
      class2: { id: 0, name: "" },
      buy: "",
      sell: "",
      quantity: "",
    },
  ]);
  const AddSingleInfo = (value, index) => {
    const newArray = saleInfo;
    if (index === 0) {
      newArray.buy = value;
    }
    if (index === 1) {
      newArray.sell = value;
    }
    if (index === 1) {
      newArray.quantity = value;
    }
    setSaleInfo(newArray);
  };
  const AddClass1 = (event, index) => {
    const newClassSale = classSale.map((item) => {
      if (item.class1.id === index) {
        return { ...item, class1: { id: index, name: event.target.value } };
      }
      return item;
    });
    setClassSale(newClassSale);

    const newArray = [...class1s];
    newArray[index] = event.target.value;
    setClass1(newArray);
  };
  const AddClass2 = (event, index) => {
    const newClassSale = classSale.map((item) => {
      if (item.class2.id === index) {
        return { ...item, class2: { id: index, name: event.target.value } };
      }
      return item;
    });
    setClassSale(newClassSale);

    const newArray = [...class2s];
    newArray[index] = event.target.value;
    setClass2(newArray);
  };
  const AddBuyPrice = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.class1.id === index1 && item.class2.id === index2) {
        return { ...item, buy: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };
  const AddSellPrice = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.class1.id === index1 && item.class2.id === index2) {
        return { ...item, sell: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };
  const AddQuantity = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.class1.id === index1 && item.class2.id === index2) {
        return { ...item, quantity: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };
  const checkInSale = (array, id1, id2) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].class1.id === id1 && array[i].class2.id === id2) {
        return true;
      }
    }
    return false;
  };
  // doi qua su dung cai add number
  const AddNumClass1 = () => {
    setNumClass1(numClass1 + 1);
    console.log(numClass1);
    let arrayClass = classSale;
    let row = numClass1 > 0 ? numClass1 + 1 : 1;
    let col = numClass2 > 0 ? numClass2 : 1;
    if (numClass1 > 0 || numClass2 > 0) {
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          const element = {
            class1: { id: i, name: "" },
            class2: { id: j, name: class2s[j] },
            buy: "",
            sell: "",
            quantity: "",
          };

          console.log(checkInSale(arrayClass, i, j));
          if (!checkInSale(arrayClass, i, j)) {
            arrayClass.push(element);
          }
        }
      }
    }
    setClassSale(arrayClass);
  };
  const AddNumClass2 = () => {
    setNumClass2(numClass2 + 1);
    let arrayClass = classSale;
    let row = numClass1 > 0 ? numClass1 : 1;
    let col = numClass2 > 0 ? numClass2 + 1 : 1;
    if (numClass1 > 0 || numClass2 > 0) {
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          const element = {
            class1: { id: i, name: class1s[i] },
            class2: { id: j, name: "" },
            buy: "",
            sell: "",
            quantity: "",
          };
          if (!checkInSale(arrayClass, i, j)) {
            arrayClass.push(element);
          }
        }
      }
    }
    setClassSale(arrayClass);
  };
  const DeleteClass1 = (index) => {
    if (numClass1 === 1 && index === 0) {
      const newSaleInfo = classSale.map((sale) => {
        if (sale.class1.id === index)
          return {
            ...sale,
            class1: { ...sale.class1, name: "" },
            buyPrice:"",
            sellPrice:"",
            quantity: "",

          };
        return sale;
      });
      setNumClass1(0);
      setClassSale(newSaleInfo);
      setClass1([]);
    } else {
      const newArray = classSale.filter((sale) => sale.class1.id != index);
      const newSaleInfo = newArray.map((sale) => {
        if (sale.class1.id > index)
          return {
            ...sale,
            class1: { ...sale.class1, id: sale.class1.id - 1 },
          };
        return sale;
      });

      setClassSale(newSaleInfo);
      const newClass1s = newSaleInfo.map((item) => {
        return item.class1.name;
      });
      setClass1([...new Set(newClass1s)]);
      setNumClass1(numClass1 - 1);
    }
  };

  const DeleteClass2 = (index) => {
    if (numClass2 === 1 && index === 0) {
      const newSaleInfo = classSale.map((sale) => {
        if (sale.class2.id === index)
          return {
            ...sale,
            class2: { ...sale.class2, name: "" },
            buyPrice:"",
            sellPrice:"",
            quantity: "",
          };
        return sale;
      });
      setNumClass2(0);
      setClassSale(newSaleInfo);
      setClass2([]);
    } else {
      const newArray = classSale.filter((sale) => sale.class2.id != index);
      const newSaleInfo = newArray.map((sale) => {
        if (sale.class2.id > index)
          return {
            ...sale,
            class2: { ...sale.class2, id: sale.class2.id - 1 },
          };
        return sale;
      });

      setClassSale(newSaleInfo);
      const newClass2s = newSaleInfo.map((item) => {
        return item.class2.name;
      });
      setClass2([...new Set(newClass2s)]);
      setNumClass2(numClass2 - 1);
    }
  };

  const getSaleInfo = async () => {
    const product = await axios.get(`${api}product/${id}`);
    const Infor = product.data.saleInfo;
    const newNumclass1 = Infor[Infor.length - 1].class1.id + 1;
    setNumClass1(newNumclass1);
    const newNumclass2 = Infor[Infor.length - 1].class2.id + 1;
    setNumClass2(newNumclass2);
    const newClass1s = Infor.map((item) => {
      return item.class1.name;
    });
    setClass1([...new Set(newClass1s)]);
    const newClass2s = Infor.map((item) => {
      return item.class2.name;
    });
    setClass2([...new Set(newClass2s)]);
    setClassSale(product.data.saleInfo);
  };
  useEffect(() => {
    getSaleInfo();
  }, []);

  useEffect(() => {
    if (numClass1 > 0 || numClass2 > 0) {
      setSaleInfor(classSale);
      setTypeSale(1);
    } else {
      setSaleInfor(saleInfo);
    }
  }, [classSale, saleInfo]);

  return (
    <div className="EditClassInfor-container">
      <Paper
        style={{ marginTop: "3%", padding: "3% 3% 3% 2%", marginBottom: "4%" }}
      >
        <div className="title"> Sale Information</div>
        <div className="content">
          <div className="class">
            <InputLabel item htmlFor="title" className="title-small">
              Product categorization
            </InputLabel>
            <div className="add-product1">
              {numClass1 === 0 ? (
                <>
                  <button
                    onClick={() => {
                      AddNumClass1();
                      setClass1([...class1s, ""]);
                      AddSingleInfo("", 0);
                      AddSingleInfo("", 1);
                      AddSingleInfo("", 2);
                    }}
                    className="btn add"
                  >
                    Add Category Group 1
                  </button>
                </>
              ) : (
                <>
                  <div className="class1">
                    <div className="title-small"> Color</div>

                    <div className="class-box">
                      {class1s.map((class1, index) => (
                        <div className="info-box" key={index}>
                          <OutlinedInput
                            placeholder="Add color"
                            size="small"
                            style={{
                              width: "70%",
                              height: "auto",
                              marginRight: "8%",
                            }}
                            sx={{ boxShadow: 3 }}
                            value={
                              classSale.filter(
                                (item) => item.class1.id === index
                              )[0]
                                ? classSale.filter(
                                    (item) => item.class1.id === index
                                  )[0].class1.name
                                : ""
                            }
                            onChange={(event) => AddClass1(event, index)}
                          />
                          <button
                            className="btn"
                            onClick={() => DeleteClass1(index)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          AddNumClass1();
                          setClass1([...class1s, ""]);
                        }}
                        className="btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="add-product1">
              {numClass2 === 0 ? (
                <>
                  <button
                    onClick={() => {
                      AddNumClass2();
                      setClass2([...class2s, ""]);
                      AddSingleInfo("", 0);
                      AddSingleInfo("", 1);
                      AddSingleInfo("", 2);
                    }}
                    className="btn add"
                  >
                    Add Category Group 2
                  </button>
                </>
              ) : (
                <>
                  <div className="class1">
                    <div className="title-small"> Size</div>
                    <div className="class-box">
                      {class2s.map((class2, index) => (
                        <div className="info-box" key={index}>
                          <OutlinedInput
                            placeholder="Add Size"
                            size="small"
                            style={{
                              width: "70%",
                              height: "auto",
                              marginRight: "8%",
                            }}
                            sx={{ boxShadow: 3 }}
                            value={
                              classSale.filter(
                                (item) => item.class2.id === index
                              )[0]
                                ? classSale.filter(
                                    (item) => item.class2.id === index
                                  )[0].class2.name
                                : ""
                            }
                            onChange={(event) => AddClass2(event, index)}
                          />
                          <button className="btn" onClick={()=>{DeleteClass2(index)}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          AddNumClass2();
                          setClass2([...class2s, ""]);
                        }}
                        className="btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="sale">
            {numClass1 === 0 && numClass2 === 0 ? (
              <>
                <div className="single">
                  <Grid container spacing={2} direction={"column"}>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Buy Price
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 0);
                          }}
                        />
                      </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Sell Price
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 1);
                          }}
                        />
                      </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Quantity
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 2);
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              </>
            ) : (
              <>
                <div className="list-class">
                  <div className="title-small">List of product categories</div>
                  <div className="lable">
                    {numClass1 !== 0 ? (
                      <>
                        <div className="lable-mini border-start">Color</div>
                      </>
                    ) : (
                      <></>
                    )}
                    {numClass2 !== 0 ? (
                      <>
                        <div className="lable-mini">Size</div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="lable-mini">Buy</div>
                    <div className="lable-mini">Sell</div>
                    <div className="lable-mini border-end">Quantity</div>
                  </div>
                  {numClass1 > 0 ? (
                    <>
                      {numClass2 > 0 ? (
                        <>
                          {/* ca hai */}
                          {class1s.map((class1, index1) => (
                            <>
                              <div className="option-1">
                                <div className="color-box1">
                                  <div className="">{class1}</div>
                                </div>
                                <div className="price-contaner1">
                                  {class2s.map((class2, index2) => (
                                    <>
                                      <div className="price-box1" key={index2}>
                                        <div className="size-box1">
                                          {class2}
                                        </div>
                                        <OutlinedInput
                                          size="small"
                                          className="buy-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.class1.id === index1 &&
                                                item.class2.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.class1.id === index1 &&
                                                    item.class2.id === index2
                                                )[0].buyPrice
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddBuyPrice(event, index1, index2);
                                          }}
                                        />
                                        <OutlinedInput
                                          size="small"
                                          className="sell-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.class1.id === index1 &&
                                                item.class2.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.class1.id === index1 &&
                                                    item.class2.id === index2
                                                )[0].sellPrice
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddSellPrice(event, index1, index2);
                                          }}
                                        />
                                        <OutlinedInput
                                          size="small"
                                          className="quantity-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.class1.id === index1 &&
                                                item.class2.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.class1.id === index1 &&
                                                    item.class2.id === index2
                                                )[0].quantity
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddQuantity(event, index1, index2);
                                          }}
                                        />
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Chi 1*/}
                          {class1s.map((class1, index1) => (
                            <>
                              <div className="option-2" key={index1}>
                                <div className="attribute-box">
                                  <div className="">{class1}</div>
                                </div>

                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.class1.id === index1 &&
                                        item.class2.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.class1.id === index1 &&
                                            item.class2.id === 0
                                        )[0].buyPrice
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddBuyPrice(event, index1, 0);
                                  }}
                                />

                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.class1.id === index1 &&
                                        item.class2.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.class1.id === index1 &&
                                            item.class2.id === 0
                                        )[0].sellPrice
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddSellPrice(event, index1, 0);
                                  }}
                                />
                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.class1.id === index1 &&
                                        item.class2.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.class1.id === index1 &&
                                            item.class2.id === 0
                                        )[0].quantity
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddQuantity(event, index1, 0);
                                  }}
                                />
                              </div>
                            </>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Chi 2*/}
                      {class2s.map((class2, index2) => (
                        <>
                          <div className="option-2" key={index2}>
                            <div className="attribute-box">
                              <div className="">{class2}</div>
                            </div>

                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.class1.id === 0 &&
                                    item.class2.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.class1.id === 0 &&
                                        item.class2.id === index2
                                    )[0].buyPrice
                                  : ""
                              }
                              onChange={(event) => {
                                AddBuyPrice(event, 0, index2);
                              }}
                            />

                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.class1.id === 0 &&
                                    item.class2.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.class1.id === 0 &&
                                        item.class2.id === index2
                                    )[0].sellPrice
                                  : ""
                              }
                              onChange={(event) => {
                                AddSellPrice(event, 0, index2);
                              }}
                            />
                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.class1.id === 0 &&
                                    item.class2.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.class1.id === 0 &&
                                        item.class2.id === index2
                                    )[0].quantity
                                  : ""
                              }
                              onChange={(event) => {
                                AddQuantity(event, 0, index2);
                              }}
                            />
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Paper>
      <button
        onClick={() => {
          console.log(classSale);
          //AddSaleInfo();
        }}
      >
        +
      </button>
    </div>
  );
}

export default EditSaleInfor;
