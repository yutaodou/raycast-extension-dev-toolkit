export type Success = {
  value: string;
  type: ResultType;
};

export type Failure = {
  error: Error;
};

export type ResultType = "string" | "code";

export type ActionResult = Success | Failure;
export type ActionRun = (input: string) => ActionResult;
