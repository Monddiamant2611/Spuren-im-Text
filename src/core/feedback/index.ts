export type { FeedbackEngine } from "../interactions/contracts";

export class GenericFeedbackEngine {
  constructor(private readonly messages: Readonly<Record<string, string>>) {}
  getMessage(key: string) { return this.messages[key]; }
}
