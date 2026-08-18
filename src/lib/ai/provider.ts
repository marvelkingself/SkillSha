export interface AIProvider {
  /**
   * Generates standard text content based on a prompt.
   * @param prompt The user-facing prompt.
   * @param systemInstruction Optional system instruction to guide behavior.
   */
  generateText(prompt: string, systemInstruction?: string): Promise<string>;

  /**
   * Generates structured data (like JSON) matching a specific schema format.
   * @param prompt The prompt requesting structured JSON.
   * @param schema The JSON Schema definition or description of structure.
   * @param systemInstruction Optional system instruction.
   */
  generateStructuredData<T>(prompt: string, schema: any, systemInstruction?: string): Promise<T>;
}
