export type Success = {
  value: string;
};

export type Failure = {
  error: Error;
};

export type ActionResult = Success | Failure;
export type ActionRun = (input: string) => ActionResult;
