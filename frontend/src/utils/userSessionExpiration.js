import { removeCookies, setCookies } from "./cookies";

export const setSessionExpirationDate = () => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 30);
  const formattedFutureDate = futureDate.toISOString();
  setCookies('userExpiresIn', formattedFutureDate);
};

export const clearSessionCookies = () => {
  removeCookies('userExpiresIn');
}