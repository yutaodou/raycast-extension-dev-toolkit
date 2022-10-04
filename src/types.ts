export type ActionResult = {
  value?: string;
  error?: Error;
};
export type ActionRun = (input: string) => ActionResult;
