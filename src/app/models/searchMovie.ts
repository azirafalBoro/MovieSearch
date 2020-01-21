/* tslint:disable */
import {Movie} from "./movie";

export interface SearchMovie {
  Search: Movie[];
  totalResults: number;
  Response: boolean;
}
