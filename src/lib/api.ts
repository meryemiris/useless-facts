import Language from "@/components/Language";
import { Fact } from "@/pages";
import axios from "axios";

type FetchFactParams = {
  factType: "random" | "today";
  language: "en" | "de";
};

const instance = axios.create({
  baseURL: "https://uselessfacts.jsph.pl/api/v2/facts/",
  timeout: 1000,
  headers: { Accept: "application/json" },
});

export async function fetchFact(params: FetchFactParams) {
  const url = `${params.factType}?language=${params.language}`;

  const response = await instance.get(url);

  return response.data;
}