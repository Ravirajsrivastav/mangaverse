//test file to see the generated image locally
import * as fs from 'fs';
import * as path from 'path';

export function saveBase64AsImage(base64String: string, outputPath: string): void {
  const directory = path.dirname(outputPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  
  const buffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Image saved to ${outputPath}`);
}