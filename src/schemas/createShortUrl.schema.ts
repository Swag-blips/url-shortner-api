import { object, string } from "yup";

export default object({
  destination: string()
    .url("A valid url is required")
    .required("Destination is required"),
});
