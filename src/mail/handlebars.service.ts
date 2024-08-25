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
    console.log("Template Path: ", this.templatesPath);
    const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);
    console.log("TemplatePath: ", templatePath);
    
    // if (!fs.existsSync(templatePath)) {
    //   throw new Error(`Template file ${templatePath} does not exist`);
    // }

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    return template(context);
  }
}
