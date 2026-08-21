import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {employeeType} from "./employeeType";
import {projectType} from "./projectType";
import {prospectScanType} from "./prospectScanType";
import {ctaLinkType} from './objects/ctaLinkType'
import {heroType} from './blocks/heroType'
import {f1StoryType} from './blocks/f1StoryType'
import {audienceType} from './blocks/audienceType'
import {checklistType} from './blocks/checklistType'
import {processType} from './blocks/processType'
import {pricingType} from './blocks/pricingType'
import {faqsType} from './blocks/faqsType'
import {ctaType} from './blocks/ctaType'
import {contactFormType} from './blocks/contactFormType'
import {richTextType} from './blocks/richTextType'
import {pageBuilderType} from './pageBuilderType'
import {landingPageType} from './landingPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    employeeType,
    projectType,
    prospectScanType,
    ctaLinkType,
    heroType,
    f1StoryType,
    audienceType,
    checklistType,
    processType,
    pricingType,
    faqsType,
    ctaType,
    contactFormType,
    richTextType,
    pageBuilderType,
    landingPageType,
  ],
}
