// import { getToken } from "../util/auth";

// export async function fetchQuotesTotals(projectId: string) {
//   const token = getToken();
//   const queryParams = new URLSearchParams({
//     categoryFilter: "",
//     type: "QUOTATION",
//     resource: "undefined",
//   }).toString();

//   const url = `https://app.mysitebook.io/api/projects/${projectId}/quotes/fetch-totals?${queryParams}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch quotes totals");
//   }

//   const data = await response.json();
//   return data;
// }
