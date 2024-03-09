import { Fact } from "@/pages";
import axios from "axios";

type FetchFactParams = {
  factType: "random" | "today";
  language: "en" | "de";
};

export async function fetchFact({
  factType = "random",
  language = "en",
}: FetchFactParams) {
  const response = await axios.get<Fact>(
    `https://uselessfacts.jsph.pl/${factType}.json?language=${language}`,
  );

  return response.data;
}
