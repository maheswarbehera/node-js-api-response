import fs from 'fs';
import path from 'path';
import ErrorDefinitions from '../utils/constants/error.constants';

const outputFilePath = path.resolve(__dirname, '../error/HttpErrorSubClass.ts');

const HEADER = `// ⚠️ AUTO-GENERATED FILE — DO NOT MODIFY MANUALLY
import { BaseErrorClass } from '../error/BaseError';
import ErrorDefinitions from '../utils/constants/error.constants';

/**
 * Custom error classes generated from ErrorDefinitions.
 * Each class extends a BaseError with corresponding metadata.
 */
`;

const generateClassCode = (key: string) => {
  const className = key
    .toLowerCase()
    .replace(/(?:^|_)(\w)/g, (_, c) => c.toUpperCase()) + 'Error';

  return `export class ${className} extends BaseErrorClass(ErrorDefinitions.${key}.errorCode) {}\n`;
};

function generateErrorClasses() {
  const keys = Object.keys(ErrorDefinitions);

  const body = keys.map(generateClassCode).join('\n');
  const content = HEADER + '\n' + body;

  fs.writeFileSync(outputFilePath, content);
  console.log(`✅ Generated ${keys.length} error classes at ${outputFilePath}`);
}

generateErrorClasses();

