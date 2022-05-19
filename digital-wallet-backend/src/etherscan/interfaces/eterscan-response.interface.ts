export interface EtherscanResponse<ResultType> {
  status: string;
  message: string;
  result: ResultType;
}
