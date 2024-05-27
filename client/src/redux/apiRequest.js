import axios from "axios";
import { api } from "../constant/constant";
import { getPriceExpr } from "../utils/getPriceRepr";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
} from "./authBusinessSlice";
import {
  loginCustomerStart,
  loginCustomerFailed,
  loginCustomerSuccess,
  logoutCustomerSuccess,
  logoutCustomerStart,
  logoutCustomerFalied,
} from "./authCustomerSilde";
export const loginBusiness = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${api}business/login`, user);
    console.log(res);
    dispatch(loginSuccess({ user: res.data, tenantURL: user.tenantURL }));

    navigate(`/${user.tenantURL}/business`, { state: { loginState: true } });
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const registerBusiness = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      `${api}business/signup
        `,
      user
    );
    console.log(res);
  } catch (error) {}
};

export const loginCustomer = async (user, dispatch, navigate) => {
  dispatch(loginCustomerStart());
  try {
    const res = await axios.post(`${api}customer/login`, user);
    console.log(res);
    dispatch(
      loginCustomerSuccess({ user: res.data.data, tenantURL: user.tenantURL })
    );
    return true;
  } catch (error) {
    dispatch(loginCustomerFailed());
  }
};
class ShippingAPI {
  getProvinces = () => {
    return axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: { token: "fee29a3e-08ed-11ef-a6e6-e60958111f48" },
      }
    );
  };
  getDistricts = (provinceId) => {
    return axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        params: { province_id: provinceId },
        headers: { token: "fee29a3e-08ed-11ef-a6e6-e60958111f48" },
      }
    );
  };
  getWards = (districtId) => {
    return axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      {
        params: { district_id: districtId },
        headers: { token: "fee29a3e-08ed-11ef-a6e6-e60958111f48" },
      }
    );
  };
  countShippingFee = (order, address) => {
    let maxHeight = 0;
    let maxWidth = 0;
    let maxLength = 0;
    order?.forEach((product) => {
      if (
        product.product &&
        product.product.height &&
        product.product.height > maxHeight
      ) {
        maxHeight = product.product.height;
      }
      if (
        product.product &&
        product.product.width &&
        product.product.width > maxWidth
      ) {
        maxWidth = product.product.width;
      }
      if (
        product.product &&
        product.product.length &&
        product.product.length > maxLength
      ) {
        maxWidth = product.product.length;
      }
    });

    const weight = order?.reduce((total, product) => {
      return total + product.product.weight * product.quantity;
    }, 0);

    return axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        params: {
          from_district_id: 3695,
          from_ward_code: "90744",
          service_id: 53320,
          service_type_id: null,
          to_district_id: Number(address.district.split("//")[1]),
          to_ward_code: String(address.ward.split("//")[1]),
          height: maxHeight,
          length: maxLength,
          weight: weight,
          width: maxWidth,
          insurance_value: 10000,
          cod_failed_amount: 2000,
          coupon: null,
        },
        headers: { token: "fee29a3e-08ed-11ef-a6e6-e60958111f48" },
      }
    );
  };
}
export const shippingAPI = new ShippingAPI();
