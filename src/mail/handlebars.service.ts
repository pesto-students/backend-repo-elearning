import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HandlebarsService {
    private templatesPath: string;

    constructor() {
      // Adjust path based on your build setup
      this.templatesPath = path.join(__dirname, '..','..', 'src/mail', 'templates');
    }

  async renderTemplate(templateName: string, context: any): Promise<string> {
    const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    return template(context);
  }
}
