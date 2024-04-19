const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://webserver.com"
    : "http://localhost:3001";

const Config = async () => {
  return <></>;
};
export default Config;
export { BASE_URL };
