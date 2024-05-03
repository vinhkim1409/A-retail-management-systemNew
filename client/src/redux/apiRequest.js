import axios from "axios";
import { api } from "../constant/constant";
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

    navigate(`/${user.tenantURL}/business`);
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
    navigate(`/${user.tenantURL}/customer`);
  } catch (error) {
    dispatch(loginCustomerFailed());
  }
};
class ShippingAPI {
  getProvinces = () => {
    return axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: { token : "fee29a3e-08ed-11ef-a6e6-e60958111f48"}
    })
  }
  getDistricts = (provinceId) => {
    return axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      params: {province_id: provinceId},
      headers: { token : "fee29a3e-08ed-11ef-a6e6-e60958111f48"}
    })
  }
  getWards = (districtId) => {
    return axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
      params: {district_id: districtId},
      headers: { token : "fee29a3e-08ed-11ef-a6e6-e60958111f48"}
    })
  }
  countShippingFee = (
    from_district,
    from_ward,
    to_district,
    to_ward,
  ) => {
    return axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
      params: {
        "from_district_id": Number(from_district),
        "from_ward_code": String(from_ward),
        "service_id":53320,
        "service_type_id":null,
        "to_district_id": Number(to_district),
        "to_ward_code": String(to_ward),
        "height":10,
        "length":10,
        "weight":200,
        "width":10,
        "insurance_value":10000,
        "cod_failed_amount":2000,
        "coupon": null,
      },
      headers: { token : "fee29a3e-08ed-11ef-a6e6-e60958111f48"}
    })
  }
}
export const shippingAPI = new ShippingAPI();
